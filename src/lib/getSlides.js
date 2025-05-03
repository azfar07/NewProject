// src/lib/getSlides.js
const API = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function getSlides() {
  const res  = await fetch(`${API}/api/slides?populate=*`);
  const json = await res.json();
  if (!res.ok || !Array.isArray(json.data)) return [];

  return json.data.map((row) => {
    // support both v4 shape (row.attributes) or raw row
    const a = row.attributes ?? row;

    // pick the small format if available, else fall back to the main url
    const pickUrl = (media) =>
      media.formats?.small?.url
        ? API + media.formats.small.url
        : media.url
          ? API + media.url
          : '';

    // backgroundImage: array → map each to a URL
    const bgItems      = Array.isArray(a.backgroundImage) ? a.backgroundImage : [];
    const backgrounds  = bgItems.map((media) => pickUrl(media));

    // portraitImage: single object
    const ptItem   = a.portraitImage ?? {};
    const portrait = pickUrl(ptItem);

    return {
      id:          row.id,
      order:       a.order      ?? 0,
      heading:     a.heading    ?? '',
      body:        a.body       ?? '',
      buttonText:  a.buttonText ?? 'Read More',
      buttonLink:  a.buttonLink ?? '#',
      backgrounds,    // ← now an array of URLs
      portrait,       // ← single URL string
    };
  });
}
