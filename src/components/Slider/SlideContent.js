// src/components/Slider/SlideContent.jsx
"use client";

import Image from "next/image";
import React from "react";
function SlideContent({ heading, body, buttonText, buttonLink, portrait }) {
  return (
    <div className="absolute inset-0 flex items-center px-16">
      <div className="w-1/2 space-y-6 text-white">
        <h2 className="text-5xl font-bold">{heading}</h2>
        <p className="text-lg leading-relaxed">{body}</p>
        <a
          href={buttonLink}
          className="inline-block px-6 py-2 bg-white text-[#613318] rounded-lg hover:bg-[#613318] hover:text-white transition"
        >
          {buttonText}
        </a>
      </div>

      <div className="w-1/2 flex justify-center">
        <div className="w-80 h-80 bg-[#613318] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={portrait}
            alt=""
            width={320}
            height={320}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
export default React.memo(SlideContent);
