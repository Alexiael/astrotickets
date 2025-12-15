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

const lineData = [30, 45, 35, 60, 55, 70, 65];

export default function ImperialDashboard() {
  const cardRefs = useRef([]);
  const horizRefs = useRef([]);
  const circleRef = useRef(null);

  useEffect(() => {
    if (cardRefs.current.length) {
      gsap.from(cardRefs.current, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out",
      });
    }

    if (horizRefs.current.length) {
      gsap.from(horizRefs.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    }

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

  const linePoints = lineData
    .map((v, i) => {
      const x = (i / (lineData.length - 1)) * 100;
      const y = 100 - v;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="space-y-10">

      {/* MÉTRICAS */}
      <section>
        <h2 className="text-sm uppercase tracking-[0.3em] mb-4 text-(--color-accent)">
          Panel de mando imperial
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {metrics.map((m, idx) => (
            <div
              key={m.id}
              ref={(el) => (cardRefs.current[idx] = el)}
              className="border border-(--color-border-accent)
                         rounded-lg px-4 py-5 bg-black/70 shadow-lg"
            >
              <p className="text-[0.7rem] uppercase tracking-[0.25em] mb-2
                            text-(--color-accent-soft)">
                {m.label}
              </p>

              <p className="text-3xl font-semibold mb-1 text-(--color-accent)">
                {m.value}
              </p>

              <p className="text-xs text-(--color-text-muted)">
                {m.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BARRAS */}
      <section className="grid md:grid-cols-2 gap-8">

        {/* Horizontales */}
        <div className="border border-(--color-border-accent)
                        rounded-lg p-4 bg-black/60">
          <h3 className="text-sm uppercase tracking-[0.25em] mb-4
                         text-(--color-accent-soft)">
            Ventas por tipo de entrada
          </h3>

          <div className="space-y-3">
            {horizontalData.map((item, idx) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1
                                text-(--color-text-primary)">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>

                <div className="w-full h-3 rounded-full overflow-hidden bg-black/40">
                  <div
                    ref={(el) => (horizRefs.current[idx] = el)}
                    className="h-full bg-(--color-accent)"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verticales */}
        <div className="border border-(--color-border-accent)
                        rounded-lg p-4 bg-black/60">
          <h3 className="text-sm uppercase tracking-[0.25em] mb-4
                         text-(--color-accent-soft)">
            Flujo diario de visitantes
          </h3>

          <div className="flex items-end gap-5 h-[250px] p-3 bg-black/30">
            {verticalData.map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <div
                  className="w-8 rounded-t-md bg-(--color-accent)"
                  style={{ height: `${item.value * 2.5}px` }}
                />
                <span className="mt-2 text-[0.65rem] uppercase tracking-[0.2em]
                                 text-(--color-text-muted)">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LÍNEA + HUD */}
      <section className="grid md:grid-cols-2 gap-8">

        {/* Línea */}
        <div className="border border-(--color-border-accent)
                        rounded-lg p-4 bg-black/60">
          <h3 className="text-sm uppercase tracking-[0.25em] mb-4
                         text-(--color-accent-soft)">
            Evolución de ingresos (últimos 7 ciclos)
          </h3>

          <svg viewBox="0 0 100 100" className="w-full h-56">
            <polyline
              id="income-line"
              points={linePoints}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2"
            />

            {lineData.map((v, i) => {
              const x = (i / (lineData.length - 1)) * 100;
              const y = 100 - v;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="var(--color-accent-soft)"
                />
              );
            })}
          </svg>
        </div>

        {/* HUD */}
        <div className="border border-(--color-border-accent)
                        rounded-lg p-4 bg-black/60">
          <h3 className="text-sm uppercase tracking-[0.25em] mb-4
                         text-(--color-accent-soft)">
            Ocupación del recinto
          </h3>

          <div className="flex items-center gap-4">
            <svg viewBox="0 0 100 100" className="w-24 h-24">
              <circle
                cx="50"
                cy="50"
                r="38"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="6"
                fill="none"
              />
              <circle
                ref={circleRef}
                cx="50"
                cy="50"
                r="38"
                stroke="var(--color-accent)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>

            <div>
              <p className="text-3xl font-semibold text-(--color-accent)">
                86%
              </p>
              <p className="text-xs text-(--color-text-muted)">
                Capacidad actual del Galactic Force Fest.
              </p>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
