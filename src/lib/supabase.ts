/**
 * Supabase helpers for storage (product images, etc.)
 *
 * The database connection is handled entirely through Prisma.
 * This file provides utilities for Supabase Storage if you
 * choose to host product images there.
 *
 * To use Supabase Storage, install the client:
 *   npm install @supabase/supabase-js
 *
 * Then uncomment and configure below.
 */

// import { createClient } from "@supabase/supabase-js";
//
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
//
// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Returns the public URL for an image in a Supabase Storage bucket.
 */
export function getSupabaseImageUrl(
  bucket: string,
  path: string
): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return path;
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}
