// lib/getTeam.js
const API = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function getTeam() {
  // 1) ask Strapi to populate the Photo array
  const res  = await fetch(`${API}/api/team-members?populate=Photo`);
  const json = await res.json();

  // 2) pull out the raw records array
  //    either json.data (v4 API) or json itself (if you have a plugin returning raw)
  const records = Array.isArray(json.data)
    ? json.data            // [{ id, attributes:{ Name, Role, Order, Photo:[…] }}…]
    : Array.isArray(json)
      ? json              // [{ id, Name, Role, Order, Photo:[…] }…]
      : [];

  // 3) normalize and sort
  return records
    .map((row) => {
      // attributes shape or flat shape
      const a = row.attributes ?? row;

      // grab first image from Photo[], prefer a small format if available
      const first = Array.isArray(a.Photo) ? a.Photo[0] : null;
      let photo = '/portrait.png';
      if (first) {
        // small thumbnail preferred, else full url
        if (first.formats?.small?.url) {
          photo = API + first.formats.small.url;
        } else if (first.url) {
          photo = API + first.url;
        }
      }
debugger
      return {
        id:    row.id,
        name:  a.Name  ?? a.name  ?? '',
        role:  a.Role  ?? a.role  ?? '',
        order: a.Order ?? a.order ?? 0,
        photo,
      };
    })
    // local sort by your Order field
    .sort((a, b) => a.order - b.order);
}
