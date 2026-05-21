/**
 * Client-safe gallery utilities (no Node.js fs).
 * Server discovery lives in chapter-media.ts / media-discovery.ts.
 */
export type { GalleryItem, MediaType } from "./gallery-types";
export { mergeChapterGallery, buildCinematicGallery } from "./build-cinematic-gallery";
