import { useState } from "react";

export default function EventTickets() {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      name: "Entrada VIP",
      price: 120,
      stock: 5,
      description: "Acceso completo + asiento reservado + regalo exclusivo.",
    },
    {
      id: 2,
      name: "General Pass",
      price: 60,
      stock: 20,
      description: "Acceso estándar a conferencias, zona expo y actividades.",
    },
    {
      id: 3,
      name: "Early Bird",
      price: 40,
      stock: 10,
      description: "Precio especial por compra anticipada.",
    },
  ]);

  const buyTicket = (id) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id && t.stock > 0
          ? { ...t, stock: t.stock - 1 }
          : t
      )
    );
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="border border-(--color-border-accent)
                     rounded-lg p-6 bg-black/50 backdrop-blur"
        >
          <h3 className="text-xl font-semibold text-(--color-accent)">
            {ticket.name}
          </h3>

          <p className="text-(--color-text-muted) mt-2 text-sm">
            {ticket.description}
          </p>

          <p className="text-(--color-accent-soft) mt-4 font-bold">
            {ticket.price} €
          </p>

          <p className="text-xs text-(--color-text-muted) mt-1">
            Stock disponible: {ticket.stock}
          </p>

          <button
            className={`mt-4 w-full px-4 py-2 rounded-md font-semibold transition
              ${
                ticket.stock > 0
                  ? "bg-(--color-accent) text-white hover:bg-(--color-accent-soft)"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed opacity-50"
              }
            `}
            disabled={ticket.stock === 0}
            onClick={() => buyTicket(ticket.id)}
          >
            {ticket.stock > 0 ? "Comprar" : "Agotado"}
          </button>
        </div>
      ))}
    </div>
  );
}
