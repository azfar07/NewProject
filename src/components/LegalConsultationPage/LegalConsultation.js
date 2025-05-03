// src/components/LegalConsultation.jsx
"use client";

import Link from "next/link";
import { useGetLegalConsultationQuery } from "@/store/apiSlice";
import React from "react";
import dynamic from "next/dynamic";
import Spinner from "../Loading";

const SlideShow = dynamic(() => import("../Slider/SlideShow"), {
  loading: () => <Spinner height={64} />,
  // for dynamic errors:
  onError: (err) => console.error("SlideShow load failed:", err),
});

export default React.memo(function LegalConsultation() {
  // 1) fetch
  const { data: page, isLoading, isError, error } = useGetLegalConsultationQuery();

  // 2) loading / API error states
  if (isLoading) {
    return <p className="p-10 text-center">Loading…</p>;
  }
  if (isError) {
    console.error("LegalConsultation fetch error:", error);
    return <p className="p-10 text-center text-red-600">Error loading page.</p>;
  }
  if (!page || typeof page !== "object") {
    return <p className="p-10 text-center">Page not found.</p>;
  }

  // 3) ensure sections is an array
  const sections = Array.isArray(page.sections) ? page.sections : [];

  // 4) render wrapped in try/catch to guard against thrown errors
  try {
    return (
      <>
        <div className="w-full h-64 sm:h-96 lg:h-[500px]">
          <SlideShow />
        </div>
        <section className="w-full bg-white text-[#1a1a1a]">
          <div className="mx-auto max-w-4xl px-4 py-10 lg:py-14">
            <Link
              href="/"
              className="flex items-center text-sm mb-6 hover:underline"
            >
              ← Back
            </Link>

            <h1 className="text-3xl lg:text-4xl font-semibold mb-6">
              {page.title ?? "Untitled"}
            </h1>

            {page.intro && (
              <p className="text-sm leading-relaxed mb-10 max-w-prose">
                {page.intro}
              </p>
            )}

            {sections.map((sec, idx) => (
              <article key={idx} className="mb-10">
                <h3 className="font-semibold mb-4">{sec.heading}</h3>
                <div className="border-l border-gray-300 pl-6 space-y-4">
                  {sec.body && <p className="text-sm">{sec.body}</p>}
                  {sec.subHeading && (
                    <p className="font-semibold mb-2">{sec.subHeading}</p>
                  )}
                  {Array.isArray(sec.points) && sec.points.length > 0 && (
                    <ul className="list-disc ml-6 space-y-1 text-sm">
                      {sec.points.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}

            {page.outro && (
              <p className="text-sm leading-relaxed max-w-prose">{page.outro}</p>
            )}
          </div>
        </section>
      </>
    );
  } catch (renderError) {
    console.error("LegalConsultation render error:", renderError);
    return <p className="p-10 text-center text-red-600">Something went wrong.</p>;
  }
});
