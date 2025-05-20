const cache = new Map<string, string>();
const inFlight = new Set<string>();

export function getCachedImage(id: string): string | undefined {
  return cache.get(id);
}

export function setCachedImage(id: string, data: string) {
  cache.set(id, data);
  inFlight.delete(id); // done fetching
}

export function markIfNotInFlight(id: string): boolean {
  if (inFlight.has(id)) return false;
  inFlight.add(id);
  return true;
}