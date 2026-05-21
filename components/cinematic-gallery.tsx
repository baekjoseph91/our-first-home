"use client";

import type { GalleryItem } from "../lib/gallery-types";
import { GalleryMediaCard } from "./gallery-media-card";

export type CinematicGalleryProps = {
  items: GalleryItem[];
  /** When true, muted MP4 clips autoplay (expanded chapter). Hover also plays on desktop. */
  isExpanded: boolean;
  /** Folder name for empty-state hint, e.g. "korea" */
  mediaFolder?: string;
};

/**
 * Reusable cinematic masonry gallery for any chapter.
 * Renders photos and MP4 clips with varied card heights, hover motion, and warm overlays.
 */
export function CinematicGallery({
  items,
  isExpanded,
  mediaFolder = "chapter"
}: CinematicGalleryProps) {
  if (items.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-white/15 px-6 py-10 text-center text-sm leading-7 text-white/45">
        Add photos to{" "}
        <span className="text-white/60">public/photos/{mediaFolder}/</span> and clips
        to{" "}
        <span className="text-white/60">public/clips/{mediaFolder}/</span>
      </p>
    );
  }

  return (
    <div
      className="columns-1 gap-4 sm:columns-2 xl:columns-3"
      role="list"
      aria-label="Chapter memories"
    >
      {items.map((item, mediaIndex) => (
        <GalleryMediaCard
          key={item.id}
          item={item}
          mediaIndex={mediaIndex}
          isChapterExpanded={isExpanded}
        />
      ))}
    </div>
  );
}
