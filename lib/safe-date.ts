export function parseSafeDate(value: unknown, fallbackMs = Date.now()): Date {
  const fallback = new Date(fallbackMs);
  const validFallback = Number.isFinite(fallback.getTime()) ? fallback : new Date();

  if (value instanceof Date) {
    return Number.isFinite(value.getTime()) ? value : validFallback;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    const fromNumber = new Date(value);
    return Number.isFinite(fromNumber.getTime()) ? fromNumber : validFallback;
  }

  if (typeof value !== "string") {
    return validFallback;
  }

  const trimmed = value.trim();
  if (!trimmed || trimmed === "Invalid Date" || trimmed === "null" || trimmed === "undefined") {
    return validFallback;
  }

  const localMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?/);
  if (localMatch) {
    const fromLocal = new Date(
      Number(localMatch[1]),
      Number(localMatch[2]) - 1,
      Number(localMatch[3]),
      Number(localMatch[4]),
      Number(localMatch[5]),
      Number(localMatch[6] ?? "0")
    );
    if (Number.isFinite(fromLocal.getTime())) {
      return fromLocal;
    }
  }

  const dayMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (dayMatch) {
    const fromDay = new Date(Number(dayMatch[1]), Number(dayMatch[2]) - 1, Number(dayMatch[3]));
    if (Number.isFinite(fromDay.getTime())) {
      return fromDay;
    }
  }

  const brMatch = trimmed.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  if (brMatch) {
    const fromBr = new Date(Number(brMatch[3]), Number(brMatch[2]) - 1, Number(brMatch[1]));
    if (Number.isFinite(fromBr.getTime())) {
      return fromBr;
    }
  }

  const parsed = Date.parse(trimmed);
  if (Number.isFinite(parsed)) {
    return new Date(parsed);
  }

  return validFallback;
}

export function formatPtDate(value: unknown) {
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).format(parseSafeDate(value));
  } catch {
    return "Data a confirmar";
  }
}

export function formatPtDateTime(value: unknown) {
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(parseSafeDate(value));
  } catch {
    return "Data a confirmar";
  }
}

export function formatPtTime(value: unknown) {
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(parseSafeDate(value));
  } catch {
    return "--:--";
  }
}
