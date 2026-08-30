import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface MapMarker {
  id: string;
  title: string;
  lat: number;
  lng: number;
  category?: string;
  description?: string;
}

interface MapViewProps {
  markers?: MapMarker[];
  center?: [number, number];
  zoom?: number;
  className?: string;
  onMarkerClick?: (markerId: string) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  markers = [],
  center = [23.6850, 90.3563], // Center of Bangladesh
  zoom = 7,
  className = 'h-80 w-full rounded-2xl overflow-hidden',
  onMarkerClick
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        scrollWheelZoom: false,
      }).setView(center, zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView(center, zoom);
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Custom Teal SVG Pin
    const customIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `
        <div style="background-color: #0f766e; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 2px solid white;">
          <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 28],
      popupAnchor: [0, -28]
    });

    markers.forEach(marker => {
      if (marker.lat && marker.lng) {
        const leafMarker = L.marker([marker.lat, marker.lng], { icon: customIcon }).addTo(map);
        
        leafMarker.bindPopup(`
          <div style="padding: 4px; font-family: sans-serif;">
            <p style="font-weight: 700; font-size: 14px; margin: 0 0 4px 0; color: #0f766e;">${marker.title}</p>
            ${marker.category ? `<span style="background: #ccfbf1; color: #0f766e; font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 4px;">${marker.category}</span>` : ''}
            ${marker.description ? `<p style="font-size: 12px; margin: 6px 0 0 0; color: #475569;">${marker.description.slice(0, 80)}...</p>` : ''}
          </div>
        `);

        if (onMarkerClick) {
          leafMarker.on('click', () => {
            onMarkerClick(marker.id);
          });
        }
      }
    });

    return () => {
      // Cleanup on unmount handled gracefully
    };
  }, [markers, center, zoom, onMarkerClick]);

  return (
    <div className={`relative border border-slate-200 shadow-sm ${className}`}>
      <div ref={mapContainerRef} className="w-full h-full z-10" />
      <div className="absolute bottom-2 left-2 z-20 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-md text-[10px] font-semibold text-slate-600 border border-slate-200">
        📍 Interactive Map of Bangladesh
      </div>
    </div>
  );
};
