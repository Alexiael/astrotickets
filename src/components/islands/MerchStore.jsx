import { useEffect, useState } from "react";
import { gsap } from "gsap";

export default function MerchStore() {
  // -----------------------------
  // 1. PRODUCTOS CON STOCK
  // -----------------------------
  const initialProducts = [
    {
      id: 1,
      name: "Camiseta Galactic Force",
      price: 25,
      stock: 5,
      image:
        "https://www.merchoid.com/media/catalog/product/cache/bfcb5e98c93238c53d4013e78676b669/1/1/1129334_swc02591tsb_star_wars_glow_in_the_dark_lightsaber_t-shirt.jpg",
    },
    {
      id: 2,
      name: "Póster Edición Especial",
      price: 15,
      stock: 3,
      image: "https://static.posters.cz/image/1300/83520.jpg",
    },
    {
      id: 3,
      name: "Taza del Lado Oscuro",
      price: 12,
      stock: 4,
      image:
        "https://www.koekoe.es/7174-tm_thickbox_default/taza-3d-stormtrooper-star-wars.jpg",
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);

  // -----------------------------
  // 2. CARGAR DESDE localStorage
  // -----------------------------
  useEffect(() => {
    const savedCart = localStorage.getItem("merch-cart");
    const savedProducts = localStorage.getItem("merch-products");

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedProducts) setProducts(JSON.parse(savedProducts));
  }, []);

  // -----------------------------
  // 3. GUARDAR + animación total
  // -----------------------------
  useEffect(() => {
    localStorage.setItem("merch-cart", JSON.stringify(cart));
    localStorage.setItem("merch-products", JSON.stringify(products));

    gsap.fromTo("#cart-total", { scale: 1.2 }, { scale: 1, duration: 0.2 });
  }, [cart, products]);

  // -----------------------------
  // 4. AÑADIR AL CARRITO
  // -----------------------------
  const addToCart = (product) => {
    if (product.stock <= 0) return;

    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, stock: p.stock - 1 } : p
      )
    );

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // -----------------------------
  // 5. ACTUALIZAR CANTIDAD
  // -----------------------------
  const updateQty = (id, delta) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    if (delta === +1) {
      const stock = products.find((p) => p.id === id)?.stock;
      if (stock <= 0) return;
    }

    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    );

    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stock: p.stock - delta } : p
      )
    );
  };

  // -----------------------------
  // 6. ELIMINAR ITEM
  // -----------------------------
  const removeItem = (id) => {
    const removed = cart.find((item) => item.id === id);
    if (!removed) return;

    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stock: p.stock + removed.qty } : p
      )
    );

    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // -----------------------------
  // 7. TOTAL
  // -----------------------------
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // -----------------------------
  // 8. RENDER
  // -----------------------------
  return (
    <div className="grid md:grid-cols-3 gap-6">

      {/* PRODUCTOS */}
      <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-(--color-border-accent)
                       rounded-lg p-4 bg-black/50"
          >
            <div className="w-full h-40 md:h-48 overflow-hidden rounded mb-3 bg-black/30">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-(--color-accent) text-lg font-semibold">
              {product.name}
            </h3>

            <p className="text-slate-300 mt-1 text-sm">
              {product.price} €
            </p>

            <p className="text-slate-500 text-xs">
              Stock: {product.stock}
            </p>

            <button
              onClick={() => addToCart(product)}
              disabled={product.stock <= 0}
              className={`mt-4 w-full px-4 py-2 rounded font-semibold transition
                ${
                  product.stock > 0
                    ? "bg-(--color-accent) text-black hover:bg-(--color-accent-soft)"
                    : "bg-slate-700 text-slate-500 cursor-not-allowed"
                }`}
            >
              {product.stock > 0 ? "Añadir al carrito" : "Agotado"}
            </button>
          </div>
        ))}
      </div>

      {/* CARRITO */}
      <div className="border border-(--color-border-accent)
                      rounded-lg p-4 bg-black/50 h-fit sticky top-20">

        <h2 className="text-xl font-semibold text-(--color-accent) mb-4">
          Carrito
        </h2>

        {cart.length === 0 ? (
          <p className="text-slate-500">Tu carrito está vacío.</p>
        ) : (
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center text-sm text-slate-200"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>

                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="px-2 bg-slate-700 hover:bg-slate-600 rounded text-xs"
                    >
                      -
                    </button>

                    <span className="text-(--color-accent) font-bold">
                      {item.qty}
                    </span>

                    <button
                      onClick={() => updateQty(item.id, +1)}
                      className="px-2 bg-slate-700 hover:bg-slate-600 rounded text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p>{item.price * item.qty} €</p>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-400 text-xs mt-1"
                  >
                    Quitar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <p
          id="cart-total"
          className="mt-4 text-(--color-accent) font-bold text-lg text-right"
        >
          Total: {total} €
        </p>
      </div>
    </div>
  );
}
