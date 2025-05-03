// src/components/Slider/SlideShow.jsx
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import SlideContent from "./SlideContent";
import { useGetSlidesQuery } from "@/store/apiSlice";
import React from "react";
import Spinner from "../Loading";

function SlideShow() {
  // 1) all hooks first
  const {
    data: slides = [],
    isLoading,
    isError,
    error,
  } = useGetSlidesQuery();
  const [current, setCurrent] = useState(0);

  // 2) pick your one “slide” object
  const slide = useMemo(
    () =>
      slides[0] ?? {
        backgrounds: [],
        heading: "",
        body: "",
        buttonText: "",
        buttonLink: "",
        portrait: "",
      },
    [slides]
  );

  // 3) extract its backgrounds array & count
  const backgrounds = useMemo(() => slide.backgrounds || [], [slide]);
  const count = backgrounds.length;

  // 4) auto-advance every 5s
  useEffect(() => {
    if (count === 0) return;
    const iv = setInterval(() => {
      setCurrent((c) => (c + 1) % count);
    }, 5000);
    return () => clearInterval(iv);
  }, [count]);

  // 5) define your arrow callbacks **before** any returns
  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + count) % count);
  }, [count]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % count);
  }, [count]);

  // 6) now safe to bail out if loading / error / no backgrounds
  if (isLoading) {
    return (
     <Spinner />
    );
  }
  if (isError) {
    return (
      <div className="p-6 text-center text-red-600">
        <p className="font-semibold">Failed to load slides</p>
        <p>{error?.message || "Unknown error"}</p>
      </div>
    );
  }
  if (count === 0) {
    return null;
  }

  // 7) and finally render
  return (
    <div className="relative w-full h-full overflow-hidden">
      {backgrounds.map((bgUrl, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={bgUrl}
            alt={`Slide background ${idx + 1}`}
            fill
            className="object-cover"
            priority={idx === 0}
          />
          <div className="absolute inset-0 bg-[#613318]/70" />

          <SlideContent
            heading={slide.heading}
            body={slide.body}
            buttonText={slide.buttonText}
            buttonLink={slide.buttonLink}
            portrait={slide.portrait}
          />
        </div>
      ))}

      {/* pagination dots */}
      <div className="absolute top-[50%] left-6 flex flex-col space-y-3 z-20">
        {backgrounds.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`
              w-3 h-3 rounded-full border border-white
              transition-transform duration-200
              ${
                i === current
                  ? "bg-white scale-125"
                  : "bg-transparent hover:scale-110"
              }
            `}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* arrows */}
      <button
        onClick={prev}
        className="absolute left-6 top-[40%] z-20 p-2 bg-white/30 rounded-full hover:bg-white/70 transition"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-6 top-[40%] z-20 p-2 bg-white/30 rounded-full hover:bg-white/70 transition"
        aria-label="Next slide"
      >
        ›
      </button>
    </div>
  );
}

export default React.memo(SlideShow);
