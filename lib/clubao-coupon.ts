export function createPublicCouponCode(prefix = "FGX") {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const digits = "23456789";
  const pick = (pool: string, length: number) =>
    Array.from({ length }, () => pool[Math.floor(Math.random() * pool.length)]).join("");
  return `${prefix}-${pick(letters, 3)}-${pick(digits, 2)}${pick(letters, 2)}${pick(digits, 1)}`;
}

export function nextCouponSerial(
  existing: Array<{ serialNumber?: string; publicCode?: string }>,
  year = new Date().getFullYear()
) {
  let max = 0;

  for (const item of existing) {
    const serialMatch = String(item.serialNumber ?? "").match(/FGX-CLB-\d{4}-(\d+)/i);
    if (serialMatch) {
      max = Math.max(max, Number(serialMatch[1]) || 0);
      continue;
    }

    const publicMatch = String(item.publicCode ?? "").match(/CPN-(\d+)/i);
    if (publicMatch) {
      max = Math.max(max, Number(publicMatch[1]) || 0);
    }
  }

  return `FGX-CLB-${year}-${String(max + 1).padStart(6, "0")}`;
}

export function createSecureToken() {
  const bytes = new Uint8Array(24);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}
