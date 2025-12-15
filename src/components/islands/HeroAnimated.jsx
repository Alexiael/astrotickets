import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroAnimated() {
  const heroRef = useRef(null);

  // Animaciones GSAP al cargar la página
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
      });

      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
      });

      gsap.from(".hero-cta", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero-container relative overflow-hidden py-16 md:py-24"
    >
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">

        {/* CONTENIDO DE TEXTO */}
        <div>
          <p
            className="text-xs uppercase tracking-[0.3em] mb-4
                       text-(--color-accent-soft)"
          >
            Bienvenida a la galaxia de los eventos
          </p>

          <h1
            className="hero-title text-4xl md:text-5xl font-extrabold tracking-tight
                       text-(--color-accent)"
          >
            AstroTickets
            <span
              className="block text-(--color-text-primary)
                         text-2xl md:text-3xl mt-2"
            >
              Galactic Force Fest 2025
            </span>
          </h1>

          <p
            className="hero-subtitle mt-6 text-sm md:text-base max-w-lg
                       text-(--color-text-muted)"
          >
            Consigue tus entradas para el evento definitivo de la saga.
            Conferencias, proyecciones, cosplay, talleres y merchandising oficial
            de otra galaxia.
          </p>

          <div className="hero-cta mt-8 flex flex-wrap gap-4">
            <a
              href="/events"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md
                         text-sm font-semibold tracking-wide transition
                         bg-(--color-accent) text-white
                         hover:bg-(--color-accent-soft)"
            >
              Comprar entradas
            </a>

            <a
              href="/merch"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md
                         text-sm font-semibold tracking-wide transition
                         border border-(--color-border-accent)
                         text-(--color-accent-soft)
                         hover:bg-(--color-accent-muted)/20"
            >
              Ver merchandising
            </a>
          </div>
        </div>

        {/* CÍRCULO DECORATIVO */}
        <div className="relative h-64 md:h-80">
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-60
                       border border-(--color-border-accent)"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="h-40 w-40 md:h-52 md:w-52 rounded-full border-4
                         border-(--color-accent-soft)
                         flex items-center justify-center text-center
                         text-xs uppercase tracking-[0.3em]
                         text-(--color-text-primary)"
            >
              <span>
                May the Code
                <br />
                be with you
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
