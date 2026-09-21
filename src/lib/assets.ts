export function assetUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (!projectUrl) return normalized;
  return `${projectUrl}/storage/v1/object/public/site-media${normalized}`;
}
