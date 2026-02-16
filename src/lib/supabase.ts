import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client for Storage, Realtime, etc.
 * Database access is handled by Prisma — this client is for
 * Supabase-specific features like image storage buckets.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Returns the public URL for a file in a Supabase Storage bucket.
 * Falls back to the raw path if Supabase is not configured.
 */
export function getStorageUrl(bucket: string, path: string): string {
  if (!supabaseUrl) return path;
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}

/**
 * Upload a file to Supabase Storage.
 * Returns the public URL on success, or null on failure.
 */
export async function uploadToStorage(
  bucket: string,
  path: string,
  file: File
): Promise<string | null> {
  if (!supabase) return null;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true });

  if (error) {
    console.error("Storage upload error:", error.message);
    return null;
  }

  return getStorageUrl(bucket, path);
}
