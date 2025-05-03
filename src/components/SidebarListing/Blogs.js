"use client";

import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import React from "react";
import dynamic from "next/dynamic";
import Spinner from "../Loading";
const SlideShow = dynamic(() => import("../Slider/SlideShow"), {
  loading: () => <Spinner height={64} />, // ~menu height
});
function Blogs() {
  return (
    <>
      <div className="w-full h-64 sm:h-96 lg:h-[500px]">
        <SlideShow />
      </div>
      <section className="w-full bg-white text-[#1a1a1a]">
        <div className="max-w-6xl mx-auto flex">
          {/* ───────── Sidebar ───────── */}
          <aside className="w-40 shrink-0 border-r border-gray-200 bg-gray-50 py-10 px-4">
            <p className="text-sm font-semibold mb-8 text-gray-400">
              Frame&nbsp;1
            </p>

            <nav className="flex flex-col gap-6">
              <Link
                href="#"
                className="text-sm font-medium text-gray-900 hover:underline"
              >
                Team
              </Link>

              {/* active item */}
              <Link
                href="#"
                className="text-sm font-medium text-[#1a1a1a] border-l-4 border-[#613318] pl-4"
              >
                Services
              </Link>
            </nav>
          </aside>

          {/* ───────── Main column ───────── */}
          <main className="flex-1 px-8 py-10">
            {/* Back */}
            <Link
              href="#"
              className="mb-6 flex items-center text-sm hover:underline"
            >
              <ChevronLeftIcon className="w-4 h-4 mr-1" />
              Back
            </Link>

            {/* LIST ITEM 1 */}
            <article className="mb-8">
              <p className="text-sm font-medium mb-2">
                Law Firm is one of the leading legal offices
              </p>
              <Link href="#" className="text-sm text-[#613318] hover:underline">
                Read more
              </Link>
            </article>

            <hr className="border-t border-gray-200 mb-8" />

            {/* LIST ITEM 2 */}
            <article className="mb-12">
              <p className="text-sm font-medium mb-2">
                Law Firm is one of the leading legal offices
              </p>
              <Link href="#" className="text-sm text-[#613318] hover:underline">
                Read more
              </Link>
            </article>

            {/* ───────── Divider before footer pagination ───────── */}
            <hr className="border-t border-gray-200 mb-12" />

            {/* ───────── Pagination ───────── */}
            <div className="flex justify-end">
              <div className="text-right">
                <p className="text-xs text-gray-400 mb-2">Pagination</p>

                <div className="inline-flex items-center gap-3 text-sm">
                  <button className="text-gray-700 hover:text-[#613318]">
                    {"<"}
                  </button>

                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      className={`w-6 text-center ${
                        num === 1
                          ? "underline font-medium"
                          : "text-gray-700 hover:text-[#613318]"
                      }`}
                    >
                      {num}
                    </button>
                  ))}

                  {/* Ellipsis box */}
                  <span className="px-1.5 py-0.5 border text-xs rounded">
                    …
                  </span>

                  <button className="w-8 text-gray-700 hover:text-[#613318]">
                    999
                  </button>
                  <button className="text-gray-700 hover:text-[#613318]">
                    {">"}
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
export default React.memo(Blogs);
