"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Play, Sparkles } from "lucide-react";
import { CinematicGallery } from "../components/cinematic-gallery";
import { chapters } from "../lib/chapters";
import { mergeChapterGallery } from "../lib/cinematic-gallery";
import type { GalleryItem } from "../lib/gallery-types";

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 }
};

const cinematicEase = [0.16, 1, 0.3, 1] as const;

const VIMEO_FILM_EMBED =
  "https://player.vimeo.com/video/1194371177?title=0&byline=0&portrait=0&badge=0";

function StoryInterlude({
  eyebrow,
  children
}: {
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <section className="relative z-20 overflow-hidden px-5 py-20 sm:px-8 md:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,12,16,0),rgba(255,179,107,.055)_48%,rgba(16,12,16,0))]" />
      <motion.div
        className="relative mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: cinematicEase }}
      >
        <div className="mx-auto mb-7 flex max-w-xs items-center justify-center gap-4 text-ember/70">
          <span className="h-px flex-1 bg-current opacity-35" />
          <Sparkles className="h-4 w-4" />
          <span className="h-px flex-1 bg-current opacity-35" />
        </div>
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.42em] text-honey/65">
          {eyebrow}
        </p>
        <p className="font-display text-3xl leading-snug text-white/82 md:text-5xl">
          {children}
        </p>
      </motion.div>
    </section>
  );
}

function ParticleField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {Array.from({ length: 42 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-honey/60 shadow-[0_0_20px_rgba(255,217,161,.75)]"
          style={{
            left: `${(index * 31) % 100}%`,
            top: `${(index * 47) % 100}%`
          }}
          animate={{
            y: [0, -46, 0],
            opacity: [0.08, 0.72, 0.08],
            scale: [0.7, 1.5, 0.7]
          }}
          transition={{
            duration: 7 + (index % 8),
            repeat: Infinity,
            delay: index * 0.18,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

function LoadingCurtain() {
  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-night"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 1.2, delay: 1.1, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.55em] text-ember">
          First Anniversary Film
        </p>
        <h1 className="font-display text-5xl text-honey md:text-7xl">
          우리의 첫번째 집
        </h1>
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  const [videoReady, setVideoReady] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.22], [1, 1.12]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.24], [1, 0.25]);

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-night" />
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="absolute inset-0"
      >
        <Image
          src="/poster.png"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="absolute inset-0 hidden md:block"
      >
        <video
          className={`h-full w-full object-cover transition-opacity duration-1000 ${
            videoReady ? "opacity-80" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          poster="/poster.png"
          preload="metadata"
          onCanPlay={() => setVideoReady(true)}
        >
          <source src="/cinematic-background.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_36%_42%,rgba(255,179,107,.3),transparent_24%),radial-gradient(circle_at_78%_28%,rgba(255,217,161,.14),transparent_18%),linear-gradient(90deg,rgba(8,6,8,.9),rgba(16,12,16,.5)_48%,rgba(8,6,8,.88)),linear-gradient(180deg,rgba(5,4,5,.4),rgba(16,12,16,.42)_52%,#100c10_96%)]" />
      <motion.div
        className="absolute left-[8%] top-[22%] h-52 w-52 rounded-full bg-ember/20 blur-3xl md:h-80 md:w-80"
        animate={{
          opacity: [0.22, 0.44, 0.22],
          scale: [0.92, 1.08, 0.92]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[18%] right-[10%] h-44 w-44 rounded-full bg-rosefilm/14 blur-3xl md:h-72 md:w-72"
        animate={{
          opacity: [0.12, 0.32, 0.12],
          scale: [1.05, 0.9, 1.05]
        }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="relative z-20 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 py-24 sm:px-8 lg:pl-12"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.18, delayChildren: 1.55 }}
      >
        <div className="relative w-fit max-w-full">
          <div className="absolute -inset-x-5 -inset-y-8 rounded-[2rem] bg-night/16 blur-2xl backdrop-blur-sm md:-inset-x-10 md:-inset-y-12" />
          <motion.p
            variants={fadeUp}
            className="relative mb-6 text-xs font-semibold uppercase tracking-[0.54em] text-honey/90 md:text-sm"
          >
            Our First Home
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="relative max-w-4xl font-display text-[clamp(3.35rem,15.5vw,8.7rem)] font-semibold leading-[0.92] text-white drop-shadow-[0_12px_42px_rgba(0,0,0,.55)] sm:text-[clamp(4.6rem,9.8vw,8.7rem)]"
          >
            <span className="block whitespace-nowrap">우리의</span>
            <span className="mt-1.5 block whitespace-nowrap md:mt-3">첫번째 집</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="relative mt-9 max-w-2xl font-display text-[2rem] leading-snug text-honey md:text-[2.9rem]"
          >
            A story about love, marriage, and becoming family.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="relative mt-11 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#film"
              className="group inline-flex w-fit items-center justify-center gap-3 rounded-full border border-honey/40 bg-honey px-7 py-4 text-sm font-bold text-night shadow-[0_0_44px_rgba(255,217,161,.28)] transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-white"
            >
              <Play className="h-4 w-4 fill-current transition group-hover:translate-x-0.5" />
              Begin Our Story
            </a>
          </motion.div>
        </div>
        <motion.a
          href="#film"
          className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-white/55"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.45, duration: 0.8 }}
        >
          Scroll
          <motion.span
            className="block h-12 w-px bg-gradient-to-b from-honey via-white/35 to-transparent"
            animate={{ scaleY: [0.35, 1, 0.35], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.a>
      </motion.div>
    </section>
  );
}

function FilmSection() {
  return (
    <section
      id="film"
      className="relative z-20 flex min-h-screen items-center overflow-hidden px-5 py-28 sm:px-8 md:py-36"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,179,107,.2),transparent_24%),radial-gradient(circle_at_72%_26%,rgba(255,143,146,.09),transparent_18%),linear-gradient(180deg,#070507,#1b0f15_44%,#100c10)]" />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/12 blur-3xl"
        animate={{ opacity: [0.24, 0.44, 0.24], scale: [0.9, 1.06, 0.9] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="relative mx-auto w-full max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={fadeUp}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.44em] text-ember">
            Premiere Showcase
          </p>
          <h2 className="font-display text-5xl font-semibold leading-[0.95] text-white md:text-8xl">
            Our First
            <br />
            Home
          </h2>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/70 md:text-xl md:leading-9">
            Our first home was not a place, but it was each other.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-6xl md:mt-16">
          <div className="mb-5 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.34em] text-white/42">
            <span className="h-px w-12 bg-honey/35" />
            Our First Home
            <span className="h-px w-12 bg-honey/35" />
          </div>
        </div>
        <motion.div
          className="relative mx-auto max-w-6xl rounded-[2rem] bg-white/[0.045] p-2 shadow-[0_0_90px_rgba(255,179,107,.18),0_50px_170px_rgba(0,0,0,.78)] backdrop-blur-xl md:p-3"
          initial={{ opacity: 0, y: 38, scale: 0.985, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1, delay: 0.15, ease: cinematicEase }}
        >
          <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-[radial-gradient(circle_at_50%_50%,rgba(255,217,161,.18),transparent_62%)] blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.55rem] border border-white/12 bg-black">
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={VIMEO_FILM_EMBED}
                title="Our First Home — Anniversary Film"
                className="absolute inset-0 h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
        <p className="mx-auto mt-7 max-w-2xl text-center text-sm leading-7 text-white/48">
          Stream the anniversary film in a cinematic Vimeo player with fullscreen
          playback.
        </p>
      </motion.div>
    </section>
  );
}

function MemoryChapters({
  chapterMedia
}: {
  chapterMedia: Record<string, GalleryItem[]>;
}) {
  const [expandedMemory, setExpandedMemory] = useState(0);
  const [uploadedMemories, setUploadedMemories] = useState<Record<string, GalleryItem[]>>({});

  const handleMemoryUpload = (
    chapterSlug: string,
    files: FileList | null
  ) => {
    if (!files) {
      return;
    }

    const uploads = Array.from(files)
      .filter((file) => file.type.startsWith("image/") || file.type.startsWith("video/"))
      .map((file, index) => ({
        id: `upload-${chapterSlug}-${file.name}-${index}`,
        type: file.type.startsWith("video/") ? ("video" as const) : ("image" as const),
        src: URL.createObjectURL(file),
        tall: index % 3 === 0
      })) satisfies GalleryItem[];

    setUploadedMemories((current) => ({
      ...current,
      [chapterSlug]: [...(current[chapterSlug] ?? []), ...uploads]
    }));
  };

  return (
    <section
      id="chapters"
      className="relative z-20 overflow-hidden px-5 pt-28 pb-20 sm:px-8 md:pt-40 md:pb-28"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#100c10,#25131c_48%,#100c10_88%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#100c10] md:h-40" />
      <motion.div
        className="relative mx-auto max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={fadeUp}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.42em] text-ember">
              Memory Chapters
            </p>
            <h2 className="font-display text-5xl font-semibold leading-none text-white md:text-7xl">
              Where we come
              <br />
              touch the memories.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-white/68">
            These chapters are not separate films. They are little rooms inside
            the same story, places to revisit after the anniversary film has
            played.
          </p>
        </div>

        <div className="grid gap-6">
          {chapters.map((chapter, index) => {
            const expanded = expandedMemory === index;
            const galleryItems = mergeChapterGallery(
              chapterMedia[chapter.slug] ?? [],
              uploadedMemories[chapter.slug]
            );

            return (
              <motion.article
                key={chapter.title}
                layout
                transition={{ layout: { duration: 0.72, ease: cinematicEase } }}
                className={`group relative overflow-hidden rounded-[1.75rem] border transition duration-300 ${
                  expanded
                    ? "border-honey/45 bg-white/[0.075] shadow-[0_0_70px_rgba(255,179,107,.17),0_34px_110px_rgba(0,0,0,.5)]"
                    : "border-white/10 bg-white/[0.045] hover:border-honey/28 hover:bg-white/[0.065] hover:shadow-[0_0_42px_rgba(255,179,107,.1)]"
                  }`}
              >
                <div className="relative z-10 border-b border-white/10 px-5 pb-5 pt-7 md:px-7 md:pb-7 md:pt-9">
                  <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.34em] text-ember/80">
                    <span className="h-px w-10 bg-ember/40" />
                    Memory Quote
                  </p>
                  <p className="whitespace-pre-line font-display text-3xl leading-snug text-white md:text-5xl">
                    “{chapter.koreanQuote}”
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setExpandedMemory(expanded ? -1 : index)}
                  className="relative z-10 grid w-full gap-5 p-5 text-left md:grid-cols-[8rem_1fr_auto] md:items-center md:p-7"
                >
                  <div className="flex items-center gap-4 text-honey">
                    <span className="font-display text-5xl leading-none text-white/22 md:text-6xl">
                      {chapter.number}
                    </span>
                    <span className="h-px w-16 bg-honey/40 md:hidden" />
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-4xl font-semibold leading-none text-white md:text-6xl">
                      {chapter.title}
                    </h3>
                    <p className="mt-3 max-w-3xl font-display text-2xl leading-snug text-honey/90 md:text-3xl">
                      {chapter.kicker}
                    </p>
                  </div>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/8 text-honey transition group-hover:border-honey/36 group-hover:bg-honey/12">
                    <Sparkles className={`h-5 w-5 transition ${expanded ? "rotate-45" : ""}`} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      key="expanded"
                      initial={{ height: 0, opacity: 0, filter: "blur(14px)" }}
                      animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                      exit={{ height: 0, opacity: 0, filter: "blur(12px)" }}
                      transition={{ duration: 0.78, ease: cinematicEase }}
                      className="relative z-10 overflow-hidden"
                    >
                      <motion.div
                        className="border-t border-white/10 px-5 pb-6 pt-6 md:px-7 md:pb-8"
                        initial={{ y: 18 }}
                        animate={{ y: 0 }}
                        exit={{ y: 12 }}
                        transition={{ duration: 0.7, ease: cinematicEase }}
                      >
                        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
                          <motion.div
                            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.68, delay: 0.1, ease: cinematicEase }}
                          >
                            <p className="font-display text-3xl leading-snug text-white md:text-5xl">
                              “{chapter.quote}”
                            </p>
                            <p className="mt-5 text-lg leading-8 text-white/68">
                              {chapter.copy}
                            </p>
                            <label className="mt-7 inline-flex cursor-pointer items-center justify-center gap-3 rounded-full border border-honey/30 bg-honey/10 px-5 py-3 text-sm font-bold text-honey transition hover:-translate-y-0.5 hover:border-honey/50 hover:bg-honey/18 hover:shadow-[0_0_34px_rgba(255,217,161,.12)]">
                              <Sparkles className="h-4 w-4" />
                              Add photos or clips
                              <input
                                type="file"
                                multiple
                                accept="image/*,video/*"
                                className="sr-only"
                                onChange={(event) =>
                                  handleMemoryUpload(chapter.slug, event.target.files)
                                }
                              />
                            </label>
                            <p className="mt-3 text-sm leading-6 text-white/40">
                              Add more locally here, or drop files into{" "}
                              <span className="text-white/55">
                                public/photos/{chapter.mediaFolder}
                              </span>{" "}
                              and{" "}
                              <span className="text-white/55">
                                public/clips/{chapter.mediaFolder}
                              </span>
                              .
                            </p>
                          </motion.div>
                          <CinematicGallery
                            items={galleryItems}
                            isExpanded={expanded}
                            mediaFolder={chapter.mediaFolder}
                          />
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  className={`pointer-events-none absolute inset-0 opacity-0 transition duration-500 ${
                    expanded ? "opacity-70" : "group-hover:opacity-30"
                  }`}
                  style={{ background: chapter.image }}
                  animate={{
                    scale: expanded ? 1.06 : 1,
                    x: expanded ? [0, -10, 0] : 0,
                    y: expanded ? [0, -6, 0] : 0
                  }}
                  transition={{
                    duration: expanded ? 14 : 0.5,
                    repeat: expanded ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(16,12,16,.9),rgba(16,12,16,.66)_46%,rgba(16,12,16,.88))]" />
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

function Fireworks() {
  return (
    <section className="relative min-h-screen overflow-hidden px-5 py-28 sm:px-8 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(255,179,107,.3),transparent_22%),radial-gradient(circle_at_52%_38%,rgba(255,143,146,.14),transparent_18%),linear-gradient(180deg,#100c10_0%,#180f24_48%,#050407)]" />
      {Array.from({ length: 12 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full border border-honey/60"
          style={{
            left: `${12 + ((index * 17) % 78)}%`,
            top: `${12 + ((index * 23) % 62)}%`
          }}
          animate={{
            width: [0, 130 + (index % 4) * 28],
            height: [0, 130 + (index % 4) * 28],
            opacity: [0, 0.9, 0],
            scale: [0.2, 1, 1.18]
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            delay: index * 0.34,
            ease: "easeOut"
          }}
        />
      ))}
      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center justify-center text-center">
        <motion.p
          className="mb-5 text-sm font-semibold uppercase tracking-[0.42em] text-ember"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          The beginning continues
        </motion.p>
        <motion.h2
          className="font-display text-6xl font-semibold leading-none text-white md:text-9xl"
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.9, ease: cinematicEase }}
        >
          Happy First
          <br />
          Anniversary
        </motion.h2>
        <motion.p
          className="mt-8 max-w-2xl text-lg leading-8 text-white/74 md:text-2xl md:leading-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.24, duration: 0.9, ease: cinematicEase }}
        >
          From our first home to every home after, may the story keep glowing.
        </motion.p>
      </div>
    </section>
  );
}

export default function HomeClient({
  chapterMedia
}: {
  chapterMedia: Record<string, GalleryItem[]>;
}) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-night text-white">
      <LoadingCurtain />
      <ParticleField />
      <Hero />
      <StoryInterlude eyebrow="Act One">The memories bring us to our story</StoryInterlude>
      <FilmSection />
      <StoryInterlude eyebrow="Act Two">Our first home has memories that has rooms we can enter again.</StoryInterlude>
      <MemoryChapters chapterMedia={chapterMedia} />
      <StoryInterlude eyebrow="Finale">
       우리의 집은 장소가 아니라 서로였다
      </StoryInterlude>
      <Fireworks />
    </main>
  );
}
