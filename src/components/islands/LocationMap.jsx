import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const EVENT_LAT = 41.6563;
const EVENT_LNG = -0.8766;

export default function LocationMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView([EVENT_LAT, EVENT_LNG], 14);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      { maxZoom: 19 }
    ).addTo(map);

    const imperialIcon = L.divIcon({
      html: `
        <div class="imperial-marker">
          <img
            src="https://lumiere-a.akamaihd.net/v1/images/era5_67cf4464.png?region=0,0,1000,1000&width=320"
            alt="Imperial marker"
          />
        </div>
      `,
      className: "",
      iconSize: [46, 46],
      iconAnchor: [23, 46],
    });

    L.marker([EVENT_LAT, EVENT_LNG], { icon: imperialIcon })
      .addTo(map)
      .bindPopup(`
        <div style="
          color: #e5e7eb;
          font-size: 0.85rem;
        ">
          <strong style="color: #ef4444;">
            Galactic Force Fest
          </strong>
          <br />
          Ubicación del evento
        </div>
      `);

    return () => map.remove();
  }, []);

  return (
    <div
      className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden border"
      style={{ borderColor: "var(--color-border-accent)" }}
    >
      <div
        ref={mapRef}
        className="absolute inset-0 imperial-map-container"
      />
    </div>
  );
}
