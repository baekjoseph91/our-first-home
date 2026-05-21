import type { GalleryItem } from "./gallery-types";
import { chapters } from "./chapters";
import { discoverChapterMedia } from "./media-discovery";

export function getChapterMediaMap(): Record<string, GalleryItem[]> {
  const map: Record<string, GalleryItem[]> = {};

  chapters.forEach((chapter, chapterIndex) => {
    map[chapter.slug] = discoverChapterMedia(
      chapter.mediaFolder,
      chapter.slug,
      chapterIndex
    );
  });

  return map;
}
