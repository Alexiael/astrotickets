import { useState } from "react";

export default function EventTickets() {
  const initialTickets = [
    {
      id: 1,
      name: "Entrada VIP",
      description: "Acceso prioritario, zona exclusiva, foto oficial y pase completo.",
      price: 120,
      stock: 10,
    },
    {
      id: 2,
      name: "Entrada General",
      description: "Acceso estándar al evento durante todo el día.",
      price: 60,
      stock: 25,
    },
    {
      id: 3,
      name: "Early Bird",
      description: "Entrada con descuento para los primeros compradores.",
      price: 40,
      stock: 8,
    },
  ];

  const [tickets, setTickets] = useState(initialTickets);

  const handleBuy = (id) => {
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
      {tickets.map((t) => (
        <div
          key={t.id}
          className="border border-yellow-400/30 rounded-lg p-5 bg-black/60 shadow-lg shadow-yellow-500/10"
        >
          <h3 className="text-xl text-yellow-300 font-semibold">{t.name}</h3>
          <p className="text-slate-300 text-sm mt-2">{t.description}</p>

          <p className="mt-4 text-yellow-400 font-bold text-lg">{t.price}€</p>

          <p className="mt-1 text-sm text-slate-400">
            Stock:{" "}
            <span className={t.stock === 0 ? "text-red-400" : "text-green-400"}>
              {t.stock}
            </span>
          </p>

          <button
            onClick={() => handleBuy(t.id)}
            disabled={t.stock === 0}
            className={`mt-5 w-full px-4 py-2 rounded-md text-black font-semibold
              ${
                t.stock === 0
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-yellow-400 hover:bg-yellow-300"
              }`}
          >
            {t.stock === 0 ? "Agotado" : "Comprar"}
          </button>
        </div>
      ))}
    </div>
  );
}
