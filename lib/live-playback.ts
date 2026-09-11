export type LiveProviderKind = "internal" | "tiktok";

export type LivePlayback =
  | { kind: "internal"; src: string; autoplay: boolean }
  | { kind: "tiktok-video"; videoId: string; embedSrc: string }
  | { kind: "tiktok-live"; username: string; embedSrc: string };

const INTERNAL_STANDBY =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

export function extractTikTokVideoId(url: string) {
  const match = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/i) || url.match(/tiktok\.com\/player\/v1\/(\d+)/i) || url.match(/tiktok\.com\/embed\/(?:v2\/)?(\d+)/i);
  return match?.[1] ?? null;
}

export function extractTikTokUsername(url: string) {
  const live = url.match(/tiktok\.com\/@([^/?#]+)\/live/i);
  if (live?.[1]) return live[1];
  const profile = url.match(/tiktok\.com\/@([^/?#]+)/i);
  return profile?.[1] ?? null;
}

function isDirectVideo(url: string) {
  return /\.(mp4|webm|ogg|m3u8)(\?|#|$)/i.test(url) || url.includes(".m3u8");
}

export function resolveLivePlayback(input: {
  provider?: string;
  transmissionLink?: string;
  recordingUrl?: string;
}): LivePlayback {
  const provider = String(input.provider ?? "").toLowerCase();
  const transmission = String(input.transmissionLink ?? "").trim();
  const recording = String(input.recordingUrl ?? "").trim();
  const source = transmission || recording;

  const tiktokVideoId = extractTikTokVideoId(source);
  if (provider === "tiktok" || tiktokVideoId || /tiktok\.com/i.test(source)) {
    if (tiktokVideoId) {
      return {
        kind: "tiktok-video",
        videoId: tiktokVideoId,
        embedSrc: `https://www.tiktok.com/player/v1/${tiktokVideoId}?autoplay=1&music_info=0&description=0&loop=1&native_context_menu=0`
      };
    }
    const username = extractTikTokUsername(source);
    if (username) {
      return {
        kind: "tiktok-live",
        username,
        embedSrc: `https://www.tiktok.com/embed/@${encodeURIComponent(username)}`
      };
    }
  }

  if (isDirectVideo(source)) {
    return { kind: "internal", src: source, autoplay: true };
  }

  if (recording && isDirectVideo(recording)) {
    return { kind: "internal", src: recording, autoplay: true };
  }

  return { kind: "internal", src: INTERNAL_STANDBY, autoplay: true };
}
