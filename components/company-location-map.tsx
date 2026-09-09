import { ManagedMedia } from "@/components/managed-media";

export function CompanyLocationMap({
  companyName,
  latitude,
  longitude,
  locationLabel
}: {
  companyName: string;
  latitude: number;
  longitude: number;
  locationLabel: string;
}) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!token) {
    return (
      <div className="company-map-fallback">
        <ManagedMedia alt={`Mapa de ${companyName}`} sizeLabel="640 x 360" className="managed-media-fill" hint="Adicione NEXT_PUBLIC_MAPBOX_TOKEN" />
        <div className="company-map-fallback-copy">
          <strong>Mapa pronto para Mapbox</strong>
          <p>{locationLabel}</p>
          <small>Assim que você colocar o token, o mini mapa desta empresa aparece aqui automaticamente.</small>
        </div>
      </div>
    );
  }

  const mapSrc = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+1d4ed8(${longitude},${latitude})/${longitude},${latitude},13,0/640x360?access_token=${token}`;

  return (
    <div className="company-map-shell">
      <img src={mapSrc} alt={`Mapa de ${companyName}`} className="company-map-image" />
    </div>
  );
}
