const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]", "::1"]);

/**
 * Normalizes a user-supplied avatar / image URL before it is stored or rendered.
 *
 * - Returns `undefined` for empty or invalid values so UI falls back to the
 *   letter avatar instead of rendering a broken image.
 * - Upgrades `http://` to `https://` for public hosts, because the production
 *   site is served over HTTPS and browsers block mixed-content images
 *   (they work on localhost, but not after deployment).
 */
export function normalizeAvatarUrl(raw?: string | null): string | undefined {
  const value = raw?.trim();
  if (!value) return undefined;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return undefined;
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") return undefined;

  if (url.protocol === "http:" && !LOCAL_HOSTS.has(url.hostname)) {
    url.protocol = "https:";
  }

  return url.toString();
}
