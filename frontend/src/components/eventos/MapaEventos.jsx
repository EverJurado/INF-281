// src/components/eventos/MapaEventos.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Corregir íconos para que se muestren correctamente
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapaEventos = ({ eventos }) => {
  return (
    <div className="mapa-eventos">
      <MapContainer center={[-17.39, -66.16]} zoom={6} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {eventos.map(evento => (
          evento.lat && evento.lng && (
            <Marker
              key={evento.id_evento}
              position={[evento.lat, evento.lng]}
              icon={customIcon}
            >
              <Popup>
                <strong>{evento.titulo}</strong><br />
                {evento.ubicacion}
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default MapaEventos;
