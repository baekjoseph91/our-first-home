"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { GalleryItem } from "../lib/gallery-types";

const cinematicEase = [0.16, 1, 0.3, 1] as const;

type GalleryMediaCardProps = {
  item: GalleryItem;
  mediaIndex: number;
  isChapterExpanded: boolean;
};

export function GalleryMediaCard({
  item,
  mediaIndex,
  isChapterExpanded
}: GalleryMediaCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const shouldPlayVideo =
    item.type === "video" && (hovered || isChapterExpanded);

  const syncPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video || item.type !== "video") {
      return;
    }

    if (shouldPlayVideo) {
      video.muted = true;
      void video.play().catch(() => {});
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [shouldPlayVideo, item.type]);

  useEffect(() => {
    syncPlayback();
  }, [syncPlayback]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || item.type !== "video") {
      return;
    }

    const handleEnded = () => {
      video.currentTime = 0;
      if (shouldPlayVideo) {
        void video.play().catch(() => {});
      }
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [shouldPlayVideo, item.type]);

  return (
    <motion.div
      role="listitem"
      className={`group/media relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_22px_70px_rgba(0,0,0,.35)] ${
        item.tall ? "min-h-72 sm:min-h-80" : "min-h-48 sm:min-h-56"
      }`}
      initial={{
        opacity: 0,
        y: 32,
        scale: 0.96,
        filter: "blur(12px)"
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)"
      }}
      transition={{
        duration: 0.72,
        delay: 0.12 + mediaIndex * 0.055,
        ease: cinematicEase
      }}
      whileHover={{ y: -4, scale: 1.012 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      {item.type === "image" ? (
        <img
          src={item.src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover/media:scale-105"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <video
          ref={videoRef}
          src={item.src}
          className={`absolute inset-0 h-full w-full object-cover transition duration-700 group-hover/media:scale-105 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          muted
          loop
          playsInline
          preload={shouldPlayVideo ? "auto" : "metadata"}
          onLoadedData={() => setVideoReady(true)}
          onCanPlay={() => setVideoReady(true)}
        />
      )}
      {item.type === "video" && !videoReady && (
        <div className="absolute inset-0 animate-pulse bg-night/80" />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,179,107,.08),transparent_42%,rgba(0,0,0,.62)),radial-gradient(circle_at_50%_45%,transparent,rgba(255,179,107,.12))] mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,.58))]" />
      {item.type === "video" && (
        <span
          className={`absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-honey backdrop-blur-md transition-opacity duration-300 ${
            shouldPlayVideo && videoReady ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden
        >
          <Play className="h-3 w-3 fill-current" />
          Clip
        </span>
      )}
    </motion.div>
  );
}
