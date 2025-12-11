import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fijamos coordenadas (ejemplo: Zaragoza)
const EVENT_LAT = 41.6563;
const EVENT_LNG = -0.8766;

export default function LocationMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Crear mapa
    const map = L.map(mapRef.current).setView([EVENT_LAT, EVENT_LNG], 14);

    // Capa base (OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    }).addTo(map);

    // Icono personalizado
    const markerIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    // Marcador del evento
    L.marker([EVENT_LAT, EVENT_LNG], { icon: markerIcon })
      .addTo(map)
      .bindPopup("<b>Galactic Force Fest</b><br>Ubicación del evento.");

    return () => map.remove();
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-80 md:h-96 rounded-lg border border-yellow-400/40 overflow-hidden"
    />
  );
}
