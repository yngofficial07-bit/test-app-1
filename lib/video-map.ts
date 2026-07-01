// ============================================================
// VIDEO MAP
// ------------------------------------------------------------
// This is where you connect a title shown on the homepage to
// the actual YouTube video that should play.
//
// Add one line per title using its TMDB id (same id shown in
// the URL when you click a title, e.g. ?id=66732) mapped to
// your YouTube video id (the part after "v=" in a YouTube URL,
// e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ -> "dQw4w9WgXcQ").
//
// Anything not listed here falls back to DEFAULT_VIDEO_ID so the
// player never breaks while you're still uploading content.
// ============================================================

export const DEFAULT_VIDEO_ID = "dQw4w9WgXcQ" // placeholder until you add your own

export const VIDEO_MAP: Record<string, string> = {
  // "66732": "your_youtube_video_id_here",   // Stranger Things -> my short film
  // "27205": "your_youtube_video_id_here",   // Inception -> my vlog
}

export function getVideoId(tmdbId: string | number): string {
  return VIDEO_MAP[String(tmdbId)] || DEFAULT_VIDEO_ID
}
