// lib/getTestimonials.js
const API = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

/**
 * Fetches /api/testimonials from Strapi, normalises the shape,
 * and returns an array sorted by the “Order” field.
 */
export async function getTestimonials() {
  const res  = await fetch(`${API}/api/testimonials?populate=*`);
  const json = await res.json();

  // Strapi v4 always returns { data: [...] }
  const rows = Array.isArray(json.data)
    ? json.data.map((d) => d.attributes ?? d)
    : [];

  return rows
    .map((r) => {
      // r now is either the flattened item or its attributes
      // pull out the first Photo entry
      const photoArr = Array.isArray(r.Photo) ? r.Photo : [];
      const pic       = photoArr[0] || {};
      // prefer the “small” format if present
      const relUrl    =
        pic.formats?.small?.url
          ? pic.formats.small.url
          : pic.url || '';
debugger
      return {
        id:    r.id,
        name:  r.Name   || '',
        role:  r.Role   || '',
        quote: r.Quote  || '',
        order: r.Order  || 0,
        photo: relUrl ? API + relUrl : '/portrait.png',
      };
    })
    // sort by your Order field
    .sort((a, b) => a.order - b.order);
}
