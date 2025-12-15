import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const metrics = [
    {
        id: "tickets-today",
        label: "Entradas vendidas hoy",
        value: "1.245",
        sub: "+27% vs ayer",
    },
    {
        id: "revenue",
        label: "Ingresos totales (créditos)",
        value: "34.000",
        sub: "Evento actual",
    },
    {
        id: "active-users",
        label: "Usuarios activos en la holored",
        value: "820",
        sub: "Últimas 24h",
    },
];

const horizontalData = [
    { label: "Entrada VIP", value: 80 },
    { label: "Entrada General", value: 55 },
    { label: "Entrada Padawan", value: 30 },
];

const verticalData = [
    { label: "Lun", value: 40 },
    { label: "Mar", value: 65 },
    { label: "Mié", value: 50 },
    { label: "Jue", value: 75 },
    { label: "Vie", value: 90 },
];


const lineData = [30, 45, 35, 60, 55, 70, 65]; // datos simulados

export default function ImperialDashboard() {

    const cardRefs = useRef([]);
    const horizRefs = useRef([]);
    const circleRef = useRef(null);

    useEffect(() => {
        // Animar tarjetas de métricas
        if (cardRefs.current.length) {
            gsap.from(cardRefs.current, {
                opacity: 0,
                y: 20,
                duration: 0.4,
                stagger: 0.1,
                ease: "power2.out",
            });
        }

        // Animar barras horizontales
        if (horizRefs.current.length) {
            gsap.from(horizRefs.current, {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
            });
        }

        // Animar HUD circular
        if (circleRef.current) {
            const length = circleRef.current.getTotalLength();
            circleRef.current.style.strokeDasharray = length;
            circleRef.current.style.strokeDashoffset = length;
            gsap.to(circleRef.current, {
                strokeDashoffset: 0,
                duration: 1.2,
                ease: "power2.out",
                delay: 0.2,
            });
        }
    }, []);

    // Calcular path para el gráfico de línea (en una cuadrícula 0–100)
    const linePoints = lineData
        .map((v, i) => {
            const x = (i / (lineData.length - 1)) * 100;
            const y = 100 - v;
            return `${x},${y}`;
        })
        .join(" ");

    return (
        <div className="space-y-10">
            {/* MÉTRICAS SUPERIORES */}
            <section>
                <h2 className="text-sm uppercase tracking-[0.3em] text-red-500 mb-4">
                    Panel de mando imperial
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {metrics.map((m, idx) => (
                        <div
                            key={m.id}
                            ref={(el) => (cardRefs.current[idx] = el)}
                            className="border border-red-600/60 bg-black/70 rounded-lg px-4 py-5 shadow-lg shadow-red-900/30"
                        >
                            <p className="text-[0.7rem] uppercase tracking-[0.25em] text-red-400 mb-2">
                                {m.label}
                            </p>
                            <p className="text-3xl font-semibold text-red-400 mb-1">
                                {m.value}
                            </p>
                            <p className="text-xs text-slate-400">{m.sub}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* GRÁFICOS BARRAS HORIZONTALES + VERTICALES */}
            <section className="grid md:grid-cols-2 gap-8">
                {/* Barras horizontales */}
                <div className="border border-red-600/40 rounded-lg p-4 bg-black/60">
                    <h3 className="text-sm uppercase tracking-[0.25em] text-red-400 mb-4">
                        Ventas por tipo de entrada
                    </h3>
                    <div className="space-y-3">
                        {horizontalData.map((item, idx) => (
                            <div key={item.label}>
                                <div className="flex justify-between text-xs text-slate-300 mb-1">
                                    <span>{item.label}</span>
                                    <span>{item.value}%</span>
                                </div>
                                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        ref={(el) => (horizRefs.current[idx] = el)}
                                        className="h-full bg-red-600"
                                        style={{ width: `${item.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Barras verticales */}
                <div className="border border-red-600/40 rounded-lg p-4 bg-black/60">
                    <h3 className="text-sm uppercase tracking-[0.25em] text-red-400 mb-4">
                        Flujo diario de visitantes
                    </h3>

                    <div style={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: "20px",
                        height: "250px",
                        padding: "10px",
                        background: "rgba(0,0,0,0.2)",
                    }}>
                        {verticalData.map((item) => (
                            <div
                                key={item.label}
                                style={{
                                    width: "40px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        height: `${(item.value * 250) / 100}px`,
                                        background: "#dc2626",
                                        borderRadius: "4px 4px 0 0",
                                    }}
                                ></div>
                                <span style={{
                                    marginTop: "6px",
                                    fontSize: "10px",
                                    color: "white",
                                    textTransform: "uppercase",
                                    letterSpacing: "2px",
                                }}>
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>


                </div>


            </section>

            {/* GRÁFICO DE LÍNEA + HUD CIRCULAR / TABLA */}
            <section className="grid md:grid-cols-2 gap-8">
                {/* Línea (evolución ingresos) */}
                {/* GRÁFICO DE LÍNEA MEJORADO */}
                <div className="border border-red-600/40 rounded-lg p-4 bg-black/60">
                    <h3 className="text-sm uppercase tracking-[0.25em] text-red-400 mb-4">
                        Evolución de ingresos (últimos 7 ciclos)
                    </h3>

                    <div className="w-full h-40 bg-slate-900/60 rounded-md border border-red-900/50 flex items-center justify-center">
                        <svg
                            ref={(el) => {
                                if (!el) return;

                                const line = el.querySelector("#income-line");
                                const points = el.querySelectorAll(".income-point");

                                if (line) {
                                    const length = line.getTotalLength();
                                    line.style.strokeDasharray = length;
                                    line.style.strokeDashoffset = length;

                                    gsap.to(line, {
                                        strokeDashoffset: 0,
                                        duration: 1.5,
                                        ease: "power2.out",
                                    });
                                }

                                if (points.length) {
                                    gsap.fromTo(
                                        points,
                                        { scale: 0, opacity: 0 },
                                        {
                                            scale: 1,
                                            opacity: 1,
                                            duration: 0.3,
                                            ease: "back.out(2)",
                                            stagger: 0.1,
                                            delay: 0.4,
                                            transformOrigin: "center",
                                        }
                                    );
                                }
                            }}
                            viewBox="0 0 100 100"
                            className="w-full h-48 md:h-56"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            <defs>
                                <filter id="red-glow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            <g stroke="#1f2933" strokeWidth="0.5">
                                {[20, 40, 60, 80].map((y) => (
                                    <line key={y} x1="0" y1={y} x2="100" y2={y} />
                                ))}
                            </g>

                            <polyline
                                id="income-line"
                                points={linePoints}
                                fill="none"
                                stroke="#f44336"
                                strokeWidth="2"
                                filter="url(#red-glow)"
                            />

                            {lineData.map((v, i) => {
                                const x = (i / (lineData.length - 1)) * 100;
                                const y = 100 - v;
                                return (
                                    <circle
                                        key={i}
                                        className="income-point"
                                        cx={x}
                                        cy={y}
                                        r="3"
                                        fill="#ff9999"
                                        stroke="#ffcccc"
                                        strokeWidth="0.5"
                                        vectorEffect="non-scaling-stroke"
                                    />
                                );
                            })}
                        </svg>

                    </div>
                </div>


                {/* HUD circular + pequeña tabla */}
                <div className="grid gap-4">
                    {/* HUD circular */}
                    <div className="border border-red-600/40 rounded-lg p-4 bg-black/60">
                        <h3 className="text-sm uppercase tracking-[0.25em] text-red-400 mb-4">
                            Ocupación del recinto
                        </h3>
                        <div className="flex items-center gap-4">
                            <svg viewBox="0 0 100 100" className="w-24 h-24">
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="38"
                                    stroke="#1f2933"
                                    strokeWidth="6"
                                    fill="none"
                                />
                                <circle
                                    ref={circleRef}
                                    cx="50"
                                    cy="50"
                                    r="38"
                                    stroke="#f97373"
                                    strokeWidth="6"
                                    fill="none"
                                    strokeLinecap="round"
                                    transform="rotate(-90 50 50)"
                                />
                            </svg>
                            <div>
                                <p className="text-3xl font-semibold text-red-400">86%</p>
                                <p className="text-xs text-slate-400">
                                    Capacidad actual del Galactic Force Fest.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tabla galáctica simple */}
                    <div className="border border-red-600/40 rounded-lg p-4 bg-black/60">
                        <h3 className="text-sm uppercase tracking-[0.25em] text-red-400 mb-3">
                            Últimos eventos registrados
                        </h3>
                        <div className="text-xs text-slate-300 space-y-1">
                            <div className="flex justify-between border-b border-red-900/40 pb-1">
                                <span>Panel Maestros Jedi</span>
                                <span>420 asistentes</span>
                            </div>
                            <div className="flex justify-between border-b border-red-900/40 pb-1">
                                <span>Concurso de Cosplay Sith</span>
                                <span>310 asistentes</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Maratón Trilogía Original</span>
                                <span>580 asistentes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
