import { readFile, readdir } from "node:fs/promises";
import { extname, join, relative, sep } from "node:path";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !secretKey) {
  throw new Error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY in .env.local before uploading.");
}

const supabase = createClient(url, secretKey, { auth: { persistSession: false, autoRefreshToken: false } });
const bucket = "site-media";
const publicRoot = join(process.cwd(), "public");
const roots = ["images", "media", "models", "documents"];

const mime = {
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".glb": "model/gltf-binary",
  ".pdf": "application/pdf",
};

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute));
    else files.push(absolute);
  }
  return files;
}

const { data: buckets, error: listError } = await supabase.storage.listBuckets();
if (listError) throw listError;
if (!buckets.some((item) => item.name === bucket)) {
  const { error } = await supabase.storage.createBucket(bucket, {
    public: true,
    fileSizeLimit: "25MB",
    allowedMimeTypes: Object.values(mime),
  });
  if (error) throw error;
}

let uploaded = 0;
for (const root of roots) {
  for (const file of await walk(join(publicRoot, root))) {
    const objectPath = relative(publicRoot, file).split(sep).join("/");
    const { error } = await supabase.storage.from(bucket).upload(objectPath, await readFile(file), {
      contentType: mime[extname(file)] ?? "application/octet-stream",
      cacheControl: "31536000",
      upsert: true,
    });
    if (error) throw new Error(`${objectPath}: ${error.message}`);
    uploaded += 1;
    console.log(`Uploaded ${objectPath}`);
  }
}

console.log(`Storage upload complete: ${uploaded} files in ${bucket}.`);
