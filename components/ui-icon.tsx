import type { IconName } from "@/lib/dashboard-data";

export type UiIconName =
  | IconName
  | "folder"
  | "map-pin"
  | "arrow-left"
  | "check-circle"
  | "briefcase"
  | "clock"
  | "info"
  | "phone"
  | "message-circle"
  | "mail"
  | "globe"
  | "instagram"
  | "linkedin"
  | "map"
  | "alert-triangle"
  | "navigation"
  | "search"
  | "filter"
  | "shopping-bag"
  | "check"
  | "link"
  | "copy"
  | "tag"
  | "trending-up"
  | "shield"
  | "award";

export function Icon({ name }: { name: UiIconName }) {
  switch (name) {
    case "home":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 10.5L12 3l9 7.5" />
          <path d="M5.5 9.5V20h13V9.5" />
        </svg>
      );
    case "live":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="1.75" />
          <path d="M7.5 7.5a6.4 6.4 0 0 0 0 9" />
          <path d="M16.5 7.5a6.4 6.4 0 0 1 0 9" />
          <path d="M4.5 4.5a10.65 10.65 0 0 0 0 15" />
          <path d="M19.5 4.5a10.65 10.65 0 0 1 0 15" />
        </svg>
      );
    case "box":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
          <path d="M12 12l8-4.5" />
          <path d="M12 12L4 7.5" />
          <path d="M12 12v9" />
        </svg>
      );
    case "cap":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7.5L12 4l8 3.5-8 3.5L4 7.5z" />
          <path d="M6.5 10.5V14c0 1.8 3 3.5 5.5 3.5s5.5-1.7 5.5-3.5v-3.5" />
          <path d="M20 8v5" />
        </svg>
      );
    case "gift":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 10h16v10H4z" />
          <path d="M12 10v10" />
          <path d="M4 7.5h16V10H4z" />
          <path d="M9.5 7.5c-1.5 0-2.5-1-2.5-2.25C7 4 7.8 3.25 9 3.25c2.1 0 3 2.35 3 4.25" />
          <path d="M14.5 7.5c1.5 0 2.5-1 2.5-2.25 0-1.25-.8-2-2-2-2.1 0-3 2.35-3 4.25" />
        </svg>
      );
    case "building":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 21V6.5A1.5 1.5 0 0 1 6.5 5H14v16" />
          <path d="M14 9H19v12H14" />
          <path d="M8.5 9h2" />
          <path d="M8.5 12h2" />
          <path d="M8.5 15h2" />
        </svg>
      );
    case "list":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 7h10" />
          <path d="M9 12h10" />
          <path d="M9 17h10" />
          <circle cx="5.5" cy="7" r="1.25" />
          <circle cx="5.5" cy="12" r="1.25" />
          <circle cx="5.5" cy="17" r="1.25" />
        </svg>
      );
    case "users":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path d="M18 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
          <path d="M4.5 19a4.5 4.5 0 0 1 9 0" />
          <path d="M14.5 19a3.5 3.5 0 0 1 7 0" />
        </svg>
      );
    case "rocket":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14 4c2.5.2 4.7 2.4 5 5-1.8.6-3.6 1.8-5.2 3.4S11 15.8 10.4 17.6c-2.6-.3-4.8-2.5-5-5 .6-1.8 1.8-3.6 3.4-5.2S12.2 4.6 14 4z" />
          <path d="M14 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
        </svg>
      );
    case "megaphone":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 13V9l10-4v12L4 13z" />
          <path d="M14 9h4.5a1.5 1.5 0 0 1 0 3H14" />
        </svg>
      );
    case "share":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="18" cy="5" r="2.5" />
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="19" r="2.5" />
          <path d="M8.2 10.9l7.6-4.8" />
          <path d="M8.2 13.1l7.6 4.8" />
        </svg>
      );
    case "target":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="7.5" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
      );
    case "wallet":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16v11H4z" />
          <path d="M4 10h16" />
        </svg>
      );
    case "grid":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="6" height="6" />
          <rect x="14" y="4" width="6" height="6" />
          <rect x="4" y="14" width="6" height="6" />
          <rect x="14" y="14" width="6" height="6" />
        </svg>
      );
    case "bell":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 18h8" />
          <path d="M9 18v-6a3 3 0 0 1 6 0v6" />
          <path d="M6 18h12l-1.5-2.5V12a4.5 4.5 0 0 0-9 0v3.5L6 18z" />
        </svg>
      );
    case "profile":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path d="M5 19a7 7 0 0 1 14 0" />
        </svg>
      );
    case "trophy":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 4h8v3a4 4 0 0 1-8 0V4z" />
          <path d="M7 7H5a2 2 0 0 1-2-2V4h5" />
          <path d="M17 7h2a2 2 0 0 0 2-2V4h-5" />
          <path d="M12 11v5" />
        </svg>
      );
    case "sparkles":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4l1.7 4.3L18 10l-4.3 1.7L12 16l-1.7-4.3L6 10l4.3-1.7L12 4z" />
        </svg>
      );
    case "folder":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3.5 7.5h6l2 2.5H20.5v9H3.5z" />
          <path d="M3.5 7.5V6h5l1.5 1.5" />
        </svg>
      );
    case "map-pin":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21s6.5-6.2 6.5-11A6.5 6.5 0 0 0 5.5 10c0 4.8 6.5 11 6.5 11z" />
          <circle cx="12" cy="10" r="2.2" />
        </svg>
      );
    case "arrow-left":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" />
          <path d="M9 12h10" />
        </svg>
      );
    case "check-circle":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
          <path d="M8.5 12.5l2.3 2.3 4.7-5.2" />
        </svg>
      );
    case "briefcase":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 8h16v11H4z" />
          <path d="M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8" />
          <path d="M4 13h16" />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4.5l3 2" />
        </svg>
      );
    case "info":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 11v5" />
          <circle cx="12" cy="8" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case "phone":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 3.5h3.5L12 7.5 10 9.2c.8 1.6 2.2 3 3.8 3.8L15.5 11l4 1.5V16c-6.2 1.2-12.3-4.8-12.5-12.5z" />
        </svg>
      );
    case "message-circle":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 18.5 6.2 15A7.5 7.5 0 1 1 12 19.5a7.4 7.4 0 0 1-3.2-.7z" />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16v10H4z" />
          <path d="M4 7l8 6 8-6" />
        </svg>
      );
    case "globe":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
          <path d="M4 12h16" />
          <path d="M12 4c2.4 2.4 3.6 5.2 3.6 8s-1.2 5.6-3.6 8c-2.4-2.4-3.6-5.2-3.6-8s1.2-5.6 3.6-8z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="16.5" cy="7.5" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 10.5V16" />
          <circle cx="8" cy="8" r="0.8" fill="currentColor" stroke="none" />
          <path d="M12 16v-3.2c0-1.3.8-2.3 2-2.3s2 1 2 2.3V16" />
        </svg>
      );
    case "map":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7.5 9.5 5 14.5 8 20 5.5V16.5L14.5 19 9.5 16 4 18.5z" />
          <path d="M9.5 5v11" />
          <path d="M14.5 8v11" />
        </svg>
      );
    case "alert-triangle":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4 21 19H3z" />
          <path d="M12 10v4" />
          <circle cx="12" cy="16.2" r="0.7" fill="currentColor" stroke="none" />
        </svg>
      );
    case "navigation":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3.5 20 20l-8-3.5L4 20z" />
        </svg>
      );
    case "search":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" />
          <path d="M16 16l4.5 4.5" />
        </svg>
      );
    case "filter":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 6h16" />
          <path d="M7 12h10" />
          <path d="M10 18h4" />
        </svg>
      );
    case "shopping-bag":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 8h12l-1 12H7z" />
          <path d="M9 8V7a3 3 0 0 1 6 0v1" />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12.5l5 5 9-11" />
        </svg>
      );
    case "link":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M10 13a4 4 0 0 0 6 0l2.5-2.5a4 4 0 0 0-5.7-5.7L11.5 6" />
          <path d="M14 11a4 4 0 0 0-6 0L5.5 13.5a4 4 0 1 0 5.7 5.7L12.5 18" />
        </svg>
      );
    case "copy":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="8" y="8" width="11" height="12" />
          <path d="M5 16V4h11" />
        </svg>
      );
    case "tag":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 12.5V4h8.5L20 11.5 12.5 19z" />
          <circle cx="9" cy="9" r="1.2" />
        </svg>
      );
    case "trending-up":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 16l6-6 3.5 3.5L20 7" />
          <path d="M14 7h6v6" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3.5 20 6.5v6c0 4.5-3.2 7.8-8 9.5-4.8-1.7-8-5-8-9.5v-6z" />
        </svg>
      );
    case "award":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="10" r="5" />
          <path d="M9 14.5 8 21l4-2 4 2-1-6.5" />
        </svg>
      );
    default:
      return null;
  }
}

export function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}
