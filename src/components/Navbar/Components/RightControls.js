"use client";

import React, { memo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

function RightControls({
  showIcon,
  showSearchBar,
  textColor,
  setShowSearchInput,
  borderColor,
  btnHover,
}) {
  return (
    <div className="flex items-center space-x-4">
      {showIcon && (
        <button
          onClick={() => setShowSearchInput(true)}
          className={`p-2 rounded-full hover:bg-white/20 transition ${textColor}`}
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      )}

      {showSearchBar && (
        <div className="flex items-center border rounded-full px-2 py-1 border-white bg-white bg-opacity-10 focus-within:bg-opacity-20 transition">
          <Search className="text-white opacity-75" size={18} />
          <input
            type="text"
            placeholder="Search…"
            className="ml-2 bg-transparent focus:outline-none text-white placeholder-white/70 w-40 sm:w-64"
          />
        </div>
      )}

      {!showIcon && !showSearchBar && (
        <button className={`${textColor} hover:underline flex items-center`}>
          En
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
      )}

      <Link
        href="/book"
        className={`px-4 py-2 border ${borderColor} rounded-full ${textColor} ${btnHover} transition`}
        prefetch
      >
        Book Appointment
      </Link>
    </div>
  );
}

export default memo(RightControls);
