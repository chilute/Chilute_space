// Markdown агуулгатай ажиллах туслах функцууд.

const IMAGE_MD = /!\[[^\]]*\]\(\s*([^)\s]+)[^)]*\)/;

// Агуулгад орсон эхний зургийн URL-ийг буцаана (![alt](url)).
export const firstImage = (md?: string | null): string | undefined =>
  md?.match(IMAGE_MD)?.[1];

// Эхний зургийг "cover" болгон салгаж, үлдсэн агуулгыг буцаана.
// Substack маягийн нийтлэлд гарчгийн дээр cover харуулахад ашиглана.
export const splitCover = (
  md?: string | null,
): { cover?: string; body: string } => {
  if (!md) return { body: "" };
  const m = md.match(IMAGE_MD);
  if (!m || m.index === undefined) return { body: md };
  const body = (md.slice(0, m.index) + md.slice(m.index + m[0].length)).trim();
  return { cover: m[1], body };
};
