import { randomUUID } from "node:crypto";
import { getSupabaseAdminClient } from "../../config/supabase.js";
import { AppError } from "../../shared/app-error.js";

const BUCKET = "event-media";
const EXTENSIONS = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

const FOLDERS = new Set(["gallery", "greetings", "support"]);

export async function uploadImage(buffer, mimeType, client = getSupabaseAdminClient(), folder = "gallery") {
  const extension = EXTENSIONS.get(mimeType);
  if (!extension) throw new AppError(415, "Image must be JPEG, PNG, or WebP");
  if (!Buffer.isBuffer(buffer) || buffer.length === 0) throw new AppError(422, "Image file is required");

  if (!FOLDERS.has(folder)) throw new AppError(422, "Invalid media folder");
  const storagePath = `${folder}/${randomUUID()}.${extension}`;
  const { error } = await client.storage.from(BUCKET).upload(storagePath, buffer, {
    contentType: mimeType,
    upsert: false,
  });
  if (error) throw new AppError(502, "Image upload failed");

  const { data } = client.storage.from(BUCKET).getPublicUrl(storagePath);
  return { storagePath, publicUrl: data.publicUrl, size: buffer.length, mimeType };
}

export async function deleteImage(storagePath, client = getSupabaseAdminClient()) {
  if (typeof storagePath !== "string" || !/^(gallery|greetings|support)\/[a-f0-9-]+\.(jpg|png|webp)$/.test(storagePath)) {
    throw new AppError(422, "Invalid media storage path");
  }
  const { error } = await client.storage.from(BUCKET).remove([storagePath]);
  if (error) throw new AppError(502, "Image deletion failed");
}
