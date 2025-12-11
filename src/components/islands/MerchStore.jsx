import { useEffect, useState } from "react";
import { gsap } from "gsap";

export default function MerchStore() {
    // Estado: productos y carrito
    const [products] = useState([
        {
            id: 1,
            name: "Camiseta Galactic Force",
            price: 25,
            image:
                "https://www.merchoid.com/media/catalog/product/cache/bfcb5e98c93238c53d4013e78676b669/1/1/1129334_swc02591tsb_star_wars_glow_in_the_dark_lightsaber_t-shirt.jpg",
        },
        {
            id: 2,
            name: "Póster Edición Especial",
            price: 15,
            image: "https://static.posters.cz/image/1300/83520.jpg",
        },
        {
            id: 3,
            name: "Taza del Lado Oscuro",
            price: 12,
            image:
                "https://www.koekoe.es/7174-tm_thickbox_default/taza-3d-stormtrooper-star-wars.jpg",
        },
    ]);

    const [cart, setCart] = useState([]);

    // 1. Cargar carrito desde localStorage al iniciar
    useEffect(() => {
        const saved = localStorage.getItem("merch-cart");
        if (saved) {
            setCart(JSON.parse(saved));
        }
    }, []);

    // 2. Guardar carrito en localStorage cuando cambie
    useEffect(() => {
        localStorage.setItem("merch-cart", JSON.stringify(cart));

        // Animar total cuando cambie el carrito
        gsap.fromTo(
            "#cart-total",
            { scale: 1.2 },
            { scale: 1, duration: 0.2, ease: "power1.out" }
        );
    }, [cart]);

    // 3. Añadir al carrito
    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((p) => p.id === product.id);
            if (existing) {
                return prev.map((p) =>
                    p.id === product.id ? { ...p, qty: p.qty + 1 } : p
                );
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };

    // 4. Modificar cantidad (+ / –)
    const updateQty = (id, delta) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? { ...item, qty: Math.max(1, item.qty + delta) }
                        : item
                )
                .filter((item) => item.qty > 0)
        );
    };

    // 5. Eliminar producto
    const removeItem = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    // 6. Calcular total
    const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    return (
        <div className="grid md:grid-cols-3 gap-6">

            {/* LISTA DE PRODUCTOS */}
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="product-card border border-yellow-400/40 rounded-lg p-4 bg-black/40"
                    >
                        <div className="w-full h-40 md:h-48 flex items-center justify-center overflow-hidden rounded mb-3 bg-black/20">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <h3 className="text-yellow-300 text-lg font-semibold">
                            {product.name}
                        </h3>
                        <p className="text-slate-300 mt-1 text-sm">{product.price} €</p>

                        <button
                            onClick={() => addToCart(product)}
                            className="mt-4 w-full bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 font-semibold"
                        >
                            Añadir al carrito
                        </button>
                    </div>
                ))}
            </div>

            {/* CARRITO */}
            <div className="border border-yellow-400/40 rounded-lg p-4 bg-black/40 h-fit sticky top-20">
                <h2 className="text-xl font-semibold text-yellow-300 mb-4">Carrito</h2>

                {cart.length === 0 ? (
                    <p className="text-slate-400">Tu carrito está vacío.</p>
                ) : (
                    <ul className="space-y-4">
                        {cart.map((item) => (
                            <li key={item.id} className="flex justify-between items-center text-sm text-slate-200">
                                <div>
                                    <p className="font-semibold">{item.name}</p>

                                    {/* Controles de cantidad */}
                                    <div className="flex items-center gap-2 mt-1">
                                        <button
                                            onClick={() => updateQty(item.id, -1)}
                                            className="px-2 bg-slate-700 hover:bg-slate-600 rounded text-xs"
                                        >
                                            -
                                        </button>

                                        <span className="text-yellow-300 font-bold">
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
                                    {/* Precio */}
                                    <p>{item.price * item.qty} €</p>

                                    {/* Botón eliminar */}
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-400 hover:text-red-300 text-xs mt-1"
                                    >
                                        Quitar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {/* TOTAL */}
                <p
                    id="cart-total"
                    className="mt-4 text-yellow-300 font-bold text-lg text-right"
                >
                    Total: {total} €
                </p>
            </div>
        </div>
    );
}
