export type Chapter = {
  slug: string;
  /** Folder name under public/photos and public/clips */
  mediaFolder: string;
  number: string;
  title: string;
  kicker: string;
  koreanQuote: string;
  quote: string;
  copy: string;
  palette: string;
  image: string;
};

export const chapters: Chapter[] = [
  {
    slug: "korea",
    mediaFolder: "korea",
    number: "01",
    title: "Korea",
    kicker: "Where magic began to happen",
    koreanQuote: "처음 만났는데도,\n오래 알고 지낸 사람 같았다.",
    quote: "In Korea, even the smallest walks felt like we were building a future.",
    copy:
      "Soft evening lights, busy streets, and the tiny miracle of ordinary days becoming ours.",
    palette: "from-[#251126] via-[#59314b] to-[#d7876c]",
    image:
      "linear-gradient(135deg, rgba(255,184,118,.28), transparent 45%), radial-gradient(circle at 72% 25%, rgba(255,236,196,.45), transparent 20%), linear-gradient(160deg, #20101f, #6d2e43 55%, #d09070)"
  },
  {
    slug: "disneyland",
    mediaFolder: "disney",
    number: "02",
    title: "Disneyland",
    kicker: "A day that remembered how to be magic",
    koreanQuote: "언젠가 가족이 생기면,\n꼭 다시 오자고 약속했다.",
    quote: "That day felt like childhood and magic under the same lights.",
    copy:
      "A glowing castle, soft laughter, hands held together, and a world that made room for two hearts in love.",
    palette: "from-[#17233c] via-[#643c75] to-[#ffb36b]",
    image:
      "radial-gradient(circle at 50% 18%, rgba(255,227,162,.8), transparent 15%), radial-gradient(circle at 24% 62%, rgba(255,143,146,.45), transparent 23%), linear-gradient(145deg, #151c32, #563364 55%, #f0a96e)"
  },
  {
    slug: "brazil",
    mediaFolder: "brazil",
    number: "03",
    title: "Brazil",
    kicker: "Magic that comes from the normal days",
    koreanQuote: "함께 웃는 일상이\n우리에게는 가장 행복한 시간이었다.",
    quote: "The normal day is the real magic inside of us that brings peaceful love.",
    copy:
      "The real magic was never in the big moments, but in the ordinary days that slowly became our favorite kind of love.",
    palette: "from-[#143224] via-[#5a6f2f] to-[#f3b35f]",
    image:
      "radial-gradient(circle at 70% 24%, rgba(255,224,130,.75), transparent 17%), radial-gradient(circle at 28% 72%, rgba(77,187,129,.34), transparent 22%), linear-gradient(150deg, #12301f, #587233 54%, #ecad64)"
  },
  {
    slug: "malaysia",
    mediaFolder: "malaysia",
    number: "04",
    title: "Malaysia",
    kicker: "Warm rain, open windows, morning light",
    koreanQuote: "처음 가진 집은 완벽하지 않았지만,\n우리는 그 안에서 가장 편안했다.",
    quote: "In Malaysia, ordinary mornings started to feel like home.",
    copy:
      "The place where ordinary days became sacred: coffee cooling on the table, soft air breathing through the room, home is becoming a verb.",
    palette: "from-[#102820] via-[#435a50] to-[#ffc082]",
    image:
      "radial-gradient(circle at 68% 34%, rgba(255,211,158,.5), transparent 18%), radial-gradient(circle at 20% 25%, rgba(111,202,178,.25), transparent 20%), linear-gradient(150deg, #0f241f, #3f5c51 54%, #f0ad77)"
  },
  {
    slug: "becoming-family",
    mediaFolder: "family",
    number: "05",
    title: "Becoming Family",
    kicker: "Two becomes three, family begins",
    koreanQuote: "그리고 이제,\n우리의 이야기는 셋이 된다.",
    quote: "The smallest moments slowly became the beginning of our family.",
    copy:
      "Somehow, between ordinary days and quiet love, we found ourselves becoming home to a new soul.",
    palette: "from-[#211218] via-[#75423c] to-[#ffd9a1]",
    image:
      "radial-gradient(circle at 51% 32%, rgba(255,222,174,.7), transparent 17%), radial-gradient(circle at 70% 72%, rgba(255,143,146,.28), transparent 22%), linear-gradient(145deg, #211218, #75423c 55%, #f4c084)"
  }
];

export const chapterBySlug = Object.fromEntries(
  chapters.map((chapter) => [chapter.slug, chapter])
) as Record<string, Chapter>;
