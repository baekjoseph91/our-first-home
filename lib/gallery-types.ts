export type MediaType = "image" | "video";

export type GalleryItem = {
  id: string;
  type: MediaType;
  src: string;
  tall?: boolean;
};
