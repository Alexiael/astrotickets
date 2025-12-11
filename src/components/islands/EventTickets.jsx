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
          className="border border-yellow-400/40 rounded-lg p-6 bg-black/40 backdrop-blur"
        >
          <h3 className="text-xl font-semibold text-yellow-300">
            {ticket.name}
          </h3>
          <p className="text-slate-400 mt-2 text-sm">{ticket.description}</p>

          <p className="text-yellow-200 mt-4 font-bold">
            {ticket.price} €
          </p>

          <p className="text-xs text-slate-500 mt-1">
            Stock disponible: {ticket.stock}
          </p>

          <button
            className={`mt-4 w-full px-4 py-2 rounded-md font-semibold transition
              ${
                ticket.stock > 0
                  ? "bg-yellow-400 text-black hover:bg-yellow-300"
                  : "bg-gray-600 text-gray-300 cursor-not-allowed opacity-50"
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
