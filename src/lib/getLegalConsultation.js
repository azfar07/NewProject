// src/lib/getLegalConsultation.js
const API = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function getLegalConsultation() {
  const url = `${API}/api/legal-consultations?populate[sections][populate]=*`;

  try {
    const res  = await fetch(url);
    const json = await res.json();

    // If HTTP failed or no data, return a fallback object
    if (!res.ok || !Array.isArray(json.data) || json.data.length === 0) {
      console.warn('No legal-consultation data:', res.status, json);
      return {
        id:      0,
        slug:    'legal-consultation-0',
        title:   'Page not found',
        intro:   '',
        outro:   '',
        sections:[]
      };
    }

    // We have at least one record
    const entry = json.data[0];
    const a     = entry;

    const sections = (a.sections || []).map((s) => ({
      heading:    s.Heading    || '',
      subHeading: s.SubHeading || '',
      body:       s.Body       || '',
      points:     [s.point1, s.point2, s.point3, s.point4].filter(Boolean),
    }));

    return {
      id:     entry.id,
      slug:   `${a.slug || 'legal-consultation'}-${entry.id}`,
      title:  a.title  || '',
      intro:  a.intro  || '',
      outro:  a.outro  || '',
      sections,
    };
  } catch (err) {
    console.error('Error fetching legal-consultation:', err);
    return {
      id:      0,
      slug:    'legal-consultation-0',
      title:   'Page not found',
      intro:   '',
      outro:   '',
      sections:[]
    };
  }
}
