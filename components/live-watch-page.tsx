"use client";

import Link from "next/link";
import { ClientShell } from "@/components/client-shell";
import { ManagedMedia } from "@/components/managed-media";
import { resolveLivePlayback } from "@/lib/live-playback";
import type { LiveRecord } from "@/lib/platform-types";

export function LiveWatchPage({ live }: { live: LiveRecord }) {
  const playback = resolveLivePlayback(live);
  const isLiveNow = live.status === "PUBLICADO" && (live.featured || playback.kind !== "internal" || Boolean(live.transmissionLink));

  return (
    <ClientShell
      activeSection="lives"
      title={live.title}
      breadcrumb={`FG EXACTA / LIVES / ${live.title.toUpperCase()}`}
    >
      <section className="live-watch-page">
        <Link href="/lives" className="live-watch-back">
          Voltar para Lives
        </Link>

        <div className="live-watch-stage">
          <div className="live-watch-player">
            {playback.kind === "internal" ? (
              <video
                key={playback.src}
                className="live-watch-video"
                src={playback.src}
                poster={live.image}
                autoPlay
                muted
                loop
                playsInline
                controls
                controlsList="nodownload noremoteplayback"
              />
            ) : (
              <iframe
                className="live-watch-frame"
                src={playback.embedSrc}
                title={live.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            )}
            <div className="live-watch-overlay-ui">
              <span className={`live-watch-badge ${isLiveNow ? "is-live" : ""}`}>
                {playback.kind === "tiktok-live" ? "TikTok ao vivo" : playback.kind === "tiktok-video" ? "TikTok" : isLiveNow ? "Ao vivo" : "Transmissão"}
              </span>
            </div>
          </div>

          <aside className="live-watch-side">
            <p className="live-watch-kicker">
              {playback.kind.startsWith("tiktok") ? "Provedor TikTok (embed oficial)" : "Live interna · Admin Master"}
            </p>
            <h1>{live.title}</h1>
            <p>{live.description || live.shortDescription}</p>

            <div className="live-watch-host">
              <ManagedMedia
                alt={live.presenterName}
                sizeLabel="128 x 128"
                src={live.presenterAvatar}
                className="managed-media-mentor-avatar"
                tone="soft"
              />
              <div>
                <span>Apresentador</span>
                <strong>{live.presenterName}</strong>
              </div>
            </div>

            <ul className="live-watch-meta">
              <li>
                <span>Quando</span>
                <strong>
                  {live.scheduledDate} • {live.scheduledTime}
                </strong>
              </li>
              <li>
                <span>Duração</span>
                <strong>{live.duration}</strong>
              </li>
              <li>
                <span>Categoria</span>
                <strong>{live.category}</strong>
              </li>
            </ul>

            {playback.kind === "tiktok-live" ? (
              <p className="live-watch-note">
                A live entra pelo player oficial do TikTok, sem comentários nesta tela. O Admin Master precisa colar o
                link autorizado da transmissão.
              </p>
            ) : null}
          </aside>
        </div>
      </section>
    </ClientShell>
  );
}
