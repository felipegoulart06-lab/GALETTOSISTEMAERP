"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Icon } from "@/components/ui-icon";

interface CompanyLocationMapProps {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  markerTitle?: string;
  addressSnippet?: string;
}

export function CompanyLocationMap({
  latitude,
  longitude,
  zoom = 15,
  markerTitle = "Empresa",
  addressSnippet = ""
}: CompanyLocationMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [tokenMissing, setTokenMissing] = useState(false);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      setTokenMissing(true);
      return;
    }
    
    if (map.current || !mapContainer.current || !latitude || !longitude) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [longitude, latitude],
      zoom: zoom,
      interactive: true
    });

    map.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

    const el = document.createElement('div');
    el.className = 'cph-map-marker';
    el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>';
    el.style.color = '#4579f6';
    el.style.cursor = 'pointer';

    new mapboxgl.Marker(el)
      .setLngLat([longitude, latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div style="font-family: system-ui; padding: 4px;">
              <strong style="display: block; font-size: 14px; margin-bottom: 4px; color: #081226;">${markerTitle}</strong>
              <span style="font-size: 12px; color: #627089;">${addressSnippet}</span>
            </div>
          `)
      )
      .addTo(map.current);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [latitude, longitude, zoom, markerTitle, addressSnippet]);

  if (!latitude || !longitude) {
    return (
      <div className="cph-map-empty">
        <Icon name="map" />
        <span>Localização não cadastrada</span>
      </div>
    );
  }

  if (tokenMissing) {
    return (
      <div className="cph-map-empty">
        <Icon name="alert-triangle" />
        <span>Token do Mapbox ausente.</span>
        <small>Configure NEXT_PUBLIC_MAPBOX_TOKEN nas variáveis de ambiente.</small>
      </div>
    );
  }

  return (
    <div className="cph-map-wrapper">
      <div ref={mapContainer} className="cph-map-instance" />
      <div className="cph-map-actions">
        <a 
          href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
          target="_blank" 
          rel="noreferrer" 
          className="cph-map-action-btn"
        >
          <Icon name="navigation" /> Como chegar
        </a>
      </div>
    </div>
  );
}

