interface ManagedMediaProps {
  alt: string;
  sizeLabel: string;
  src?: string;
  className?: string;
  tone?: "light" | "dark" | "soft";
  hint?: string;
}

export function ManagedMedia({
  alt,
  sizeLabel,
  src,
  className = "",
  tone = "light",
  hint = "Adicionar imagem do admin"
}: ManagedMediaProps) {
  return (
    <div
      className={`managed-media managed-media-${tone}${className ? ` ${className}` : ""}`}
      role="img"
      aria-label={`${alt}. Tamanho recomendado ${sizeLabel}.`}
    >
      {src ? (
        <img className="managed-media-image" src={src} alt={alt} />
      ) : (
        <>
          <div className="managed-media-grid" aria-hidden="true" />
          <div className="managed-media-copy">
            <span>{hint}</span>
            <strong>{sizeLabel}</strong>
          </div>
        </>
      )}
    </div>
  );
}
