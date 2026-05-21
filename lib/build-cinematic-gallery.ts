import type { GalleryItem } from "./gallery-types";

/** Interleave video clips into the photo masonry for a cinematic rhythm. */
export function buildCinematicGallery(
  photos: GalleryItem[],
  clips: GalleryItem[]
): GalleryItem[] {
  if (clips.length === 0) {
    return photos;
  }

  const gallery = [...photos];
  clips.forEach((clip, clipIndex) => {
    const insertAt =
      gallery.length <= 2
        ? gallery.length
        : Math.min(2 + clipIndex * 2, gallery.length);
    gallery.splice(insertAt, 0, clip);
  });

  return gallery;
}

/** Merge server-discovered assets with optional local uploads. */
export function mergeChapterGallery(
  discovered: GalleryItem[],
  uploads: GalleryItem[] = []
): GalleryItem[] {
  if (uploads.length === 0) {
    return discovered;
  }

  const photos = [
    ...discovered.filter((item) => item.type === "image"),
    ...uploads.filter((item) => item.type === "image")
  ];
  const clips = [
    ...discovered.filter((item) => item.type === "video"),
    ...uploads.filter((item) => item.type === "video")
  ];

  return buildCinematicGallery(photos, clips);
}
