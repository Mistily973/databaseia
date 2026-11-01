import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function form(mode, values, failure) {
  const calls = [];
  const states = [];
  let index = 0;
  const jsx = (type, props) => ({ type, props });
  const firebase = new Proxy({}, { get: (_, key) => {
    if (key === 'browserLocalPersistence' || key === 'browserSessionPersistence') return key;
    if (key === 'GoogleAuthProvider') return class {};
    return async (...args) => {
      calls.push([key, ...args]);
      if (key === failure) throw { code: 'auth/invalid-credential' };
      return { user: { uid: 'test-user' } };
    };
  } });
  const source = fs.readFileSync(`components/auth/${mode}Form.tsx`, 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const context = { exports: {}, require: (name) => {
    if (name === 'react') return { useState: (initial) => {
      const i = index++;
      states[i] = i in values ? values[i] : initial;
      return [states[i], (value) => { states[i] = value; }];
    } };
    if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx };
    if (name === 'next/link') return { default: 'a' };
    if (name === 'next/navigation') return { useRouter: () => ({ replace: (url) => calls.push(['redirect', url]) }) };
    if (name === 'firebase/auth') return firebase;
    if (name === '@/lib/firebase') return { getFirebaseAuth: () => 'auth', authErrorMessage: () => 'Error de autenticación' };
    throw Error(name);
  } };
  vm.runInNewContext(code, context);
  const tree = context.exports.default();
  function find(node, predicate) {
    if (!node || typeof node !== 'object') return;
    if (predicate(node)) return node;
    for (const child of [node.props?.children].flat(Infinity)) {
      const match = find(child, predicate);
      if (match) return match;
    }
  }
  return { calls, states, find: (predicate) => find(tree, predicate), submit: () => find(tree, n => n.type === 'form').props.onSubmit({ preventDefault() {} }) };
}

test('registro bloquea contraseñas diferentes antes de llamar Firebase', async () => {
  const f = form('Register', ['Ana', 'ana@example.com', 'password1', 'password2']);
  await f.submit();
  assert.equal(f.calls.length, 0);
  assert.ok(f.states.includes('Las contraseñas no coinciden.'));
});
test('registro crea la cuenta, guarda el nombre y redirige después', async () => {
  const f = form('Register', [' Ana ', ' ana@example.com ', 'password1', 'password1']);
  await f.submit();
  assert.deepEqual(f.calls.map(c => c[0]), ['setPersistence', 'createUserWithEmailAndPassword', 'updateProfile', 'redirect']);
  assert.equal(f.calls[1][2], 'ana@example.com');
  assert.equal(f.calls[2][2].displayName, 'Ana');
});
test('login fallido no anuncia éxito ni redirige', async () => {
  const f = form('Login', ['ana@example.com', 'wrong'], 'signInWithEmailAndPassword');
  await f.submit();
  assert.ok(!f.calls.some(c => c[0] === 'redirect'));
  assert.ok(f.states.includes('Error de autenticación'));
});
test('Recordarme controla la persistencia de Firebase', async () => {
  for (const remember of [true, false]) {
    const f = form('Login', ['ana@example.com', 'password1', remember]);
    await f.submit();
    assert.equal(f.calls[0][2], remember ? 'browserLocalPersistence' : 'browserSessionPersistence');
    assert.equal(f.calls.at(-1)[0], 'redirect');
  }
});
test('Google usa Firebase en ambos formularios y maneja el rechazo', async () => {
  for (const mode of ['Login', 'Register']) {
    const f = form(mode, [], 'signInWithPopup');
    await f.find(n => n.type === 'button' && n.props.onClick).props.onClick();
    assert.ok(f.calls.some(c => c[0] === 'signInWithPopup'));
    assert.ok(!f.calls.some(c => c[0] === 'redirect'));
  }
});
test('recuperación envía una solicitud real al SDK', async () => {
  const f = form('Login', { 8: true, 9: 'ana@example.com' });
  const reset = f.find(n => n.type === 'form' && n.props.className === 'space-y-4');
  await reset.props.onSubmit({ preventDefault() {} });
  assert.equal(f.calls[0][0], 'sendPasswordResetEmail');
  assert.equal(f.calls[0][2], 'ana@example.com');
});
