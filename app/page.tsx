import { getChapterMediaMap } from "../lib/chapter-media";
import HomeClient from "./home-client";

/** Re-scan public/photos and public/clips when folders change during dev. */
export const dynamic = "force-dynamic";

export default function Home() {
  const chapterMedia = getChapterMediaMap();

  return <HomeClient chapterMedia={chapterMedia} />;
}
