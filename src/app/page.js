// app/page.jsx  (or pages/index.js)
'use client';

import Spinner from '@/components/Loading';
import dynamic from 'next/dynamic';


/* ── lazy-loaded components ───────────────────────────────────── */
//  • ssr:false on SlideShow (it needs the browser)
//  • Spinner keeps layout stable + shows the GIF

const SlideShow = dynamic(
  () => import('../components/Slider/SlideShow'),
  {
    ssr: false,
    loading: () => (
      // section around it is already h-[80vh]; use full height
      <Spinner height="100%" />
    ),
  }
);

const TestimonialSection = dynamic(
  () => import('../components/testimonials/TestimonialSection'),
  {
    loading: () => <Spinner height={400} />,
  }
);

const ClientTestimonials = dynamic(
  () => import('../components/testimonials/ClientTestimonials'),
  {
    loading: () => <Spinner height={400} />,
  }
);

/* ── page component ───────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      {/* Hero carousel at 80% of viewport height */}
      <section className="h-[80vh] overflow-hidden">
        <SlideShow />
      </section>

      {/* Lazy-loaded sections */}
      <TestimonialSection />
      <ClientTestimonials />
    </>
  );
}
