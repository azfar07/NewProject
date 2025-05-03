"use client";

import React, { memo } from "react";

function MobileToggle({ textColor, toggle }) {
  return (
    <div className="lg:hidden">
      <button onClick={toggle} className={`focus:outline-none ${textColor}`}>
        <svg
          className={`h-6 w-6 ${textColor}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
}

export default memo(MobileToggle);
