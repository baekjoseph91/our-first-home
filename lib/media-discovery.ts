import fs from "fs";
import path from "path";
import { buildCinematicGallery } from "./build-cinematic-gallery";
import type { GalleryItem } from "./gallery-types";

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".heic",
  ".avif"
]);

/** Primary format: MP4. Legacy MOV/WebM still accepted if present. */
const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".webm", ".m4v"]);

export function listMediaFiles(
  absoluteDir: string,
  allowedExtensions: Set<string>
): string[] {
  if (!fs.existsSync(absoluteDir)) {
    return [];
  }

  return fs
    .readdirSync(absoluteDir)
    .filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return allowedExtensions.has(ext) && !file.startsWith(".");
    })
    .sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
    );
}

function publicMediaUrl(...segments: string[]): string {
  return `/${segments.map((segment) => encodeURIComponent(segment)).join("/")}`;
}

export function discoverChapterMedia(
  mediaFolder: string,
  slug: string,
  chapterIndex: number,
  publicRoot = path.join(process.cwd(), "public")
): GalleryItem[] {
  const photoFiles = listMediaFiles(
    path.join(publicRoot, "photos", mediaFolder),
    IMAGE_EXTENSIONS
  );
  const clipFiles = listMediaFiles(
    path.join(publicRoot, "clips", mediaFolder),
    VIDEO_EXTENSIONS
  );

  const photos: GalleryItem[] = photoFiles.map((file, index) => ({
    id: `${slug}-photo-${file}`,
    type: "image",
    src: publicMediaUrl("photos", mediaFolder, file),
    tall: index % 3 === 0 || (chapterIndex + index) % 4 === 1
  }));

  const clips: GalleryItem[] = clipFiles.map((file, clipIndex) => ({
    id: `${slug}-clip-${file}`,
    type: "video",
    src: publicMediaUrl("clips", mediaFolder, file),
    tall: (chapterIndex + clipIndex + 2) % 3 === 0
  }));

  return buildCinematicGallery(photos, clips);
}
