import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function firebaseModule(env = {}, apps = []) {
  const calls = [];
  const auth = {};
  const context = { exports: {}, process: { env }, require(name) {
    if (name === 'firebase/app') return {
      getApps: () => apps,
      initializeApp(config) { calls.push(config); const app = { name: '[DEFAULT]' }; apps.push(app); return app; },
    };
    if (name === 'firebase/auth') return { getAuth: () => auth };
    throw Error(name);
  } };
  const source = fs.readFileSync('lib/firebase.ts', 'utf8');
  vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, context);
  return { ...context.exports, calls, auth };
}
const config = {
  NEXT_PUBLIC_FIREBASE_API_KEY: 'test-key',
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'example.firebaseapp.com',
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'example',
  NEXT_PUBLIC_FIREBASE_APP_ID: 'test-app',
};
test('configuración ausente falla antes de inicializar Firebase', () => {
  const f = firebaseModule();
  assert.throws(() => f.getFirebaseAuth(), { code: 'auth/configuration-missing' });
  assert.equal(f.calls.length, 0);
});
test('variables privadas antiguas no se consideran configuración del navegador', () => {
  const f = firebaseModule({ AUTH_FIREBASE_API_KEY: 'private-only' });
  assert.throws(() => f.getFirebaseAuth(), { code: 'auth/configuration-missing' });
});
test('configuración pública inicializa una sola instancia y configura español', () => {
  const f = firebaseModule(config);
  assert.equal(f.getFirebaseAuth(), f.getFirebaseAuth());
  assert.equal(f.calls.length, 1);
  assert.equal(f.calls[0].apiKey, 'test-key');
  assert.equal(f.auth.languageCode, 'es');
});
test('otra app nombrada no impide crear la app predeterminada', () => {
  const f = firebaseModule(config, [{ name: 'other-app' }]);
  f.getFirebaseAuth();
  assert.equal(f.calls.length, 1);
});
test('errores desconocidos no exponen detalles internos', () => {
  const f = firebaseModule();
  assert.equal(f.authErrorMessage(new Error('sensitive-details')), 'No pudimos completar la solicitud. Inténtalo de nuevo.');
  assert.ok(f.authErrorMessage({ code: 'auth/invalid-api-key' }).includes('configuración'));
});
