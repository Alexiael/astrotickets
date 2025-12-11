import { useEffect, useState } from "react";

export default function MerchStore() {
    // Estado: productos y carrito
    const [products] = useState([
        {
            id: 1,
            name: "Camiseta Galactic Force",
            price: 25,
            image: "https://www.merchoid.com/media/catalog/product/cache/bfcb5e98c93238c53d4013e78676b669/1/1/1129334_swc02591tsb_star_wars_glow_in_the_dark_lightsaber_t-shirt.jpg",
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
            image: "https://www.koekoe.es/7174-tm_thickbox_default/taza-3d-stormtrooper-star-wars.jpg",
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
    }, [cart]);

    // 3. Añadir al carrito
    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((p) => p.id === product.id);
            if (existing) {
                // Incrementa cantidad
                return prev.map((p) =>
                    p.id === product.id ? { ...p, qty: p.qty + 1 } : p
                );
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };

    // 4. Calcular total
    const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    return (
        <div className="grid md:grid-cols-3 gap-6">

            {/* Lista de productos */}
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="border border-yellow-400/40 rounded-lg p-4 bg-black/40">
                        <div className="w-full h-40 md:h-48 flex items-center justify-center overflow-hidden rounded mb-3 bg-black/20">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <h3 className="text-yellow-300 text-lg font-semibold">{product.name}</h3>
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

            {/* Carrito */}
            <div className="border border-yellow-400/40 rounded-lg p-4 bg-black/40 h-fit sticky top-20">
                <h2 className="text-xl font-semibold text-yellow-300 mb-4">Carrito</h2>

                {cart.length === 0 ? (
                    <p className="text-slate-400">Tu carrito está vacío.</p>
                ) : (
                    <ul className="space-y-3">
                        {cart.map((item) => (
                            <li key={item.id} className="flex justify-between text-sm text-slate-200">
                                <span>
                                    {item.name} x{item.qty}
                                </span>
                                <span>{item.price * item.qty} €</span>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Total */}
                <p className="mt-4 text-yellow-300 font-bold">
                    Total: {total} €
                </p>
            </div>

        </div>
    );
}
