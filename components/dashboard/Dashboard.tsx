"use client";

import React, { Component, ChangeEvent } from "react";

/* ---------- Tipos ---------- */
type ClaseTipo = "n" | "t" | "f" | "s";
type Pestana = "columnas" | "datos";

export interface Columna {
  nombre: string;
  tipo: string;
  clase: ClaseTipo;
  desc: string;
  ejemplo: string;
  icono: string;
  aceptaVacios?: boolean;
}

export interface Usuario {
  nombre: string;
  correo: string;
}

export type Fila = string[];

export interface DashboardProps {
  usuario: Usuario;
  bases: string[];
  baseActiva: string;
  totalFilas: number;
  fechaSubida: string;
  columnas: Columna[];
  filas: Fila[];
  onLogout: () => void | Promise<void>;
  onPreguntarIA: () => void;
  onWhatsApp: () => void;
}

interface DashboardState {
  pestana: Pestana;
  busqueda: string;
  cerrando: boolean;
}

interface ConteoTipo {
  clase: ClaseTipo;
  icono: string;
  total: number;
}

interface ItemMenu {
  etiqueta: string;
  icono: string;
  href: string;
}

/* ---------- Colores por tipo de dato ---------- */
const ESTILO_TIPO: Record<ClaseTipo, { chip: string; icono: string }> = {
  n: {
    chip: "border-emerald-300 bg-emerald-50 text-emerald-700",
    icono: "bg-emerald-100",
  },
  t: { chip: "border-sky-300 bg-sky-50 text-sky-700", icono: "bg-sky-100" },
  f: {
    chip: "border-violet-300 bg-violet-50 text-violet-700",
    icono: "bg-violet-100",
  },
  s: {
    chip: "border-amber-300 bg-amber-50 text-amber-700",
    icono: "bg-amber-100",
  },
};

/* ---------- Datos de ejemplo ---------- */
const COLUMNAS: Columna[] = [
  {
    nombre: "ID Producto",
    tipo: "Número",
    clase: "n",
    desc: "Cantidades o precios",
    ejemplo: "1001",
    icono: "🔢",
  },
  {
    nombre: "Nombre",
    tipo: "Texto",
    clase: "t",
    desc: "Palabras o frases",
    ejemplo: 'Laptop HP 15"',
    icono: "💬",
  },
  {
    nombre: "Categoría",
    tipo: "Texto",
    clase: "t",
    desc: "Palabras o frases",
    ejemplo: "Electrónica",
    icono: "💬",
  },
  {
    nombre: "Stock",
    tipo: "Número",
    clase: "n",
    desc: "Cantidades o precios",
    ejemplo: "34",
    icono: "🔢",
  },
  {
    nombre: "Precio Unitario",
    tipo: "Número",
    clase: "n",
    desc: "Cantidades o precios",
    ejemplo: "12500.00",
    icono: "🔢",
  },
  {
    nombre: "Proveedor",
    tipo: "Texto",
    clase: "t",
    desc: "Palabras o frases",
    ejemplo: "TechSupply SA",
    icono: "💬",
    aceptaVacios: true,
  },
  {
    nombre: "Fecha Ingreso",
    tipo: "Fecha",
    clase: "f",
    desc: "Días, meses o años",
    ejemplo: "2026-01-10",
    icono: "📅",
  },
  {
    nombre: "Activo",
    tipo: "Sí/No",
    clase: "s",
    desc: "Verdadero o falso",
    ejemplo: "Sí",
    icono: "✅",
  },
];

const FILAS: Fila[] = [
  [
    "1001",
    'Laptop HP 15"',
    "Electrónica",
    "34",
    "12500.00",
    "TechSupply SA",
    "2026-01-10",
    "Sí",
  ],
  [
    "1002",
    "Mouse Logitech MX3",
    "Periféricos",
    "120",
    "890.00",
    "PeriféricosMX",
    "2026-01-12",
    "Sí",
  ],
  [
    "1003",
    'Monitor Dell 24"',
    "Electrónica",
    "18",
    "5200.00",
    "TechSupply SA",
    "2026-01-15",
    "Sí",
  ],
  [
    "1004",
    "Teclado Mecánico K3",
    "Periféricos",
    "0",
    "1450.00",
    "—",
    "2025-12-01",
    "No",
  ],
  [
    "1005",
    "Silla Ergonómica",
    "Mobiliario",
    "7",
    "8900.00",
    "OficinaPlus",
    "2026-02-03",
    "Sí",
  ],
];

const MENU: ItemMenu[] = [
  { etiqueta: "Inicio", icono: "▦", href: "/" },
  { etiqueta: "Subir Excel", icono: "⇪", href: "/subir" },
  { etiqueta: "Chat IA", icono: "◌", href: "/chat" },
  { etiqueta: "WhatsApp", icono: "◯", href: "/whatsapp" },
];

const FOCO =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500";

/* ---------- Componente ---------- */
class Dashboard extends Component<DashboardProps, DashboardState> {
  static defaultProps: DashboardProps = {
    usuario: { nombre: "Ana Torres", correo: "ana@distribuidora.mx" },
    bases: ["Inventario Productos", "Ventas 2026"],
    baseActiva: "Inventario Productos",
    totalFilas: 148,
    fechaSubida: "2026-08-15",
    columnas: COLUMNAS,
    filas: FILAS,
    onLogout: () => {},
    onPreguntarIA: () => {},
    onWhatsApp: () => {},
  };

  state: DashboardState = {
    pestana: "columnas",
    busqueda: "",
    cerrando: false,
  };

  cambiarPestana = (pestana: Pestana): void => {
    this.setState({ pestana });
  };

  handleLogout = async (): Promise<void> => {
    if (this.state.cerrando) return;
    this.setState({ cerrando: true });
    try {
      await this.props.onLogout();
    } finally {
      this.setState({ cerrando: false });
    }
  };

  cambiarBusqueda = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ busqueda: e.target.value });
  };

  filasFiltradas(): Fila[] {
    const q = this.state.busqueda.trim().toLowerCase();
    if (!q) return this.props.filas;
    return this.props.filas.filter((f: Fila) =>
      f.join(" ").toLowerCase().includes(q),
    );
  }

  conteoPorTipo(): [string, ConteoTipo][] {
    const conteo: Record<string, ConteoTipo> = {};
    this.props.columnas.forEach((c: Columna) => {
      if (!conteo[c.tipo]) {
        conteo[c.tipo] = { clase: c.clase, icono: c.icono, total: 0 };
      }
      conteo[c.tipo].total += 1;
    });
    return Object.entries(conteo);
  }

  renderSidebar() {
    const { usuario, bases, baseActiva } = this.props;
    const { cerrando } = this.state;
    return (
      <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-brand-200 bg-white md:flex">
        <div className="flex items-center gap-2.5 border-b border-brand-200 px-4 py-[18px] text-lg font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm text-white">
            ≡
          </span>
          <span>
            Data<span className="text-brand-600">Base</span>IA
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {MENU.map((m: ItemMenu) => (
            <a
              key={m.etiqueta}
              href={m.href}
              className={`nav-link mb-1 flex items-center gap-3 rounded-xl px-3 py-2 ${FOCO}`}
            >
              <span>{m.icono}</span> {m.etiqueta}
            </a>
          ))}

          <p className="mx-3 mb-2 mt-6 text-xs font-semibold tracking-wider text-brand-900/50">
            MIS BASES DE DATOS
          </p>
          {bases.map((b: string) => (
            <a
              key={b}
              href="#"
              className={`mb-1 flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm ${FOCO} ${
                b === baseActiva
                  ? "border-brand-200 bg-brand-100 font-semibold"
                  : "border-transparent text-brand-900/80 hover:bg-brand-50"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              {b}
            </a>
          ))}
        </nav>

        <div className="border-t border-brand-200 p-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-300 font-semibold text-brand-900">
              {usuario.nombre.charAt(0).toUpperCase()}
            </span>
            <span className="min-w-0 text-sm font-semibold leading-tight">
              <span className="block truncate">{usuario.nombre}</span>
              <small className="block truncate text-xs font-normal text-brand-900/60">
                {usuario.correo}
              </small>
            </span>
          </div>

          <button
            id="dashboard-logout"
            type="button"
            aria-label="Cerrar sesión"
            onClick={() => void this.handleLogout()}
            disabled={cerrando}
            className={`mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-brand-200 bg-white px-3 py-2 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-100 disabled:opacity-60 ${FOCO}`}
          >
            {/* Si tienes tu componente Icon, cambia este svg por <Icon name="logout" /> */}
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <path d="M16 17l5-5-5-5" />
              <path d="M21 12H9" />
            </svg>
            <span>{cerrando ? "Cerrando sesión..." : "Cerrar sesión"}</span>
          </button>
        </div>
      </aside>
    );
  }

  renderColumnas() {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {this.props.columnas.map((c: Columna) => (
          <article className="card !p-4" key={c.nombre}>
            <div className="flex items-center gap-2.5">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-[15px] ${ESTILO_TIPO[c.clase].icono}`}
              >
                {c.icono}
              </span>
              <h3 className="flex-1 font-semibold">{c.nombre}</h3>
              <span
                className={`rounded-full border px-3 py-0.5 text-xs font-medium ${ESTILO_TIPO[c.clase].chip}`}
              >
                {c.tipo}
              </span>
            </div>
            <p className="my-2.5 text-sm text-brand-900/60">{c.desc}</p>
            <div className="flex items-center justify-between rounded-lg bg-brand-50 px-3.5 py-3 text-xs text-brand-900/60">
              <span>EJEMPLO</span>
              <b className="text-[15px] font-medium text-brand-900">
                {c.ejemplo}
              </b>
            </div>
            {!c.aceptaVacios && (
              <small className="mt-2.5 block text-xs text-brand-600">
                ✓ Siempre tiene valor
              </small>
            )}
          </article>
        ))}
      </div>
    );
  }

  renderDatos() {
    const { columnas, totalFilas } = this.props;
    const filas = this.filasFiltradas();
    return (
      <>
        <label className="mb-5 flex w-full max-w-[260px] items-center gap-2 rounded-xl border border-brand-200 bg-white px-3 focus-within:outline-2 focus-within:outline-brand-500">
          🔍
          <input
            type="search"
            placeholder="Buscar un dato…"
            aria-label="Buscar un dato"
            value={this.state.busqueda}
            onChange={this.cambiarBusqueda}
            className="w-full bg-transparent py-2.5 outline-none placeholder:text-brand-900/40"
          />
        </label>

        <div className="overflow-x-auto rounded-2xl border border-brand-200 bg-white">
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr className="border-b border-brand-200">
                {columnas.map((c: Columna) => (
                  <th
                    key={c.nombre}
                    className="px-4 py-3 text-left text-sm font-semibold"
                  >
                    {c.nombre}
                    <small className="block text-[11px] font-normal text-brand-900/60">
                      {c.tipo}
                    </small>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filas.length === 0 && (
                <tr>
                  <td colSpan={columnas.length} className="px-4 py-3.5">
                    No hay resultados para esa búsqueda.
                  </td>
                </tr>
              )}
              {filas.map((f: Fila) => (
                <tr key={f[0]} className="even:bg-brand-50">
                  {f.map((v: string, i: number) => (
                    <td key={i} className="px-4 py-3.5 text-sm">
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3.5 text-sm text-brand-900/60">
          Mostrando {filas.length} de {totalFilas} filas.
        </p>
      </>
    );
  }

  renderTab(id: Pestana, etiqueta: string) {
    const activa = this.state.pestana === id;
    return (
      <button
        type="button"
        role="tab"
        aria-selected={activa}
        onClick={() => this.cambiarPestana(id)}
        className={`rounded-t-xl border border-b-0 px-[18px] py-2.5 ${FOCO} ${
          activa
            ? "border-brand-200 bg-brand-50 font-semibold"
            : "border-transparent font-medium text-brand-900/60 hover:text-brand-900"
        }`}
      >
        {etiqueta}
      </button>
    );
  }

  render() {
    const {
      baseActiva,
      totalFilas,
      columnas,
      fechaSubida,
      onPreguntarIA,
      onWhatsApp,
    } = this.props;
    const { pestana } = this.state;

    return (
      <div className="flex min-h-screen">
        {this.renderSidebar()}

        <main className="flex min-w-0 flex-1 flex-col">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-200 bg-white px-4 py-4 md:px-6">
            <div>
              <h1 className="text-xl font-semibold">{baseActiva}</h1>
              <small className="text-brand-900/60">
                {totalFilas} filas · {columnas.length} columnas · subido el{" "}
                {fechaSubida}
              </small>
            </div>
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={onPreguntarIA}
                className={`btn btn-soft px-4 py-2 ${FOCO}`}
              >
                💬 Preguntar con IA
              </button>
              <button
                type="button"
                onClick={onWhatsApp}
                className={`btn btn-soft px-4 py-2 ${FOCO}`}
              >
                📱 WhatsApp
              </button>
            </div>
          </header>

          <div className="flex flex-wrap items-center gap-2.5 border-b border-brand-200 bg-white px-4 py-3 text-sm text-brand-900/60 md:px-6">
            Tipo de datos:
            {this.conteoPorTipo().map(([tipo, d]) => (
              <span
                key={tipo}
                className={`rounded-full border px-3 py-0.5 text-[13px] ${ESTILO_TIPO[d.clase].chip}`}
              >
                {d.icono} {tipo} ({d.total})
              </span>
            ))}
          </div>

          <div
            className="flex gap-2.5 border-b border-brand-200 bg-white px-4 pt-2.5 md:px-6"
            role="tablist"
          >
            {this.renderTab("datos", "📋 Ver datos")}
            {this.renderTab("columnas", "📁 Columnas")}
          </div>

          <section role="tabpanel" className="flex-1 p-4 md:p-6">
            {pestana === "columnas"
              ? this.renderColumnas()
              : this.renderDatos()}
          </section>
        </main>
      </div>
    );
  }
}

export default Dashboard;
