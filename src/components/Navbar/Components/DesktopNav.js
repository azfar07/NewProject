"use client";

import React, { memo } from "react";
import Link from "next/link";

function DesktopNav({ textColor, scrollTo, setMenuOpen }) {
  return (
    <nav className={`hidden lg:flex space-x-8 font-medium ${textColor}`}>
      <button
        onClick={() => scrollTo("ClientTestimonial")}
        className="hover:underline"
      >
        About us
      </button>

      {/* Services dropdown trigger */}
      <div className="relative" onMouseEnter={() => setMenuOpen(true)}>
        <button className="flex items-center hover:underline">
          <span className={textColor}>Services</span>
          <svg
            className={`ml-1 h-4 w-4 ${textColor}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      <button
        onClick={() => scrollTo("TestimonialSection")}
        className="hover:underline"
      >
        Our Team
      </button>

      <Link href="/blogs" className="hover:underline" prefetch>
        Blogs
      </Link>
      <Link href="/contact" className="hover:underline" prefetch>
        Contact Us
      </Link>
    </nav>
  );
}

export default memo(DesktopNav);
