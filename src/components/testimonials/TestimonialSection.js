// src/components/testimonials/TestimonialSection.jsx
"use client";
import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { RiWhatsappFill } from "react-icons/ri";
import { HiOutlinePhone, HiOutlineMail } from "react-icons/hi";
import { useGetTeamQuery } from "@/store/apiSlice";
import Spinner from "../Loading";

function TestimonialSection() {
  // include `error` in the hook destructure
  const { data: team = [], isLoading, isError, error } = useGetTeamQuery();

  const visible = 3;
  const pages = useMemo(() => {
    const perPage = visible;
    const count = Math.ceil(team.length / perPage);
    return Array.from({ length: count }, (_, i) =>
      team.slice(i * perPage, i * perPage + perPage)
    );
  }, [team]);

  const [page, setPage] = useState(0);
  const prev = useCallback(() => {
    setPage((p) => (p === 0 ? pages.length - 1 : p - 1));
  }, [pages.length]);
  const next = useCallback(() => {
    setPage((p) => (p === pages.length - 1 ? 0 : p + 1));
  }, [pages.length]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="p-6 max-w-md mx-auto bg-red-100 text-red-800 rounded">
        <p className="font-semibold">
          Error {error?.status || ""} loading team
        </p>
        <p>
          {error?.data || error?.message || "An unexpected error occurred."}
        </p>
      </div>
    );
  }

  if (!team.length) {
    return null;
  }

  return (
    <section id="TestimonialSection" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl font-bold text-[#613318]">Our Team</h2>
        <p className="text-gray-600 mt-2">
          Meet the professionals who drive our success.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <button
          onClick={prev}
          className="absolute -left-8 top-1/2 -translate-y-1/2 w-10 h-10
                     flex items-center justify-center bg-white rounded-full
                     shadow hover:bg-gray-100 z-10"
          aria-label="Previous"
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </button>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${100 * page}%)` }}
          >
            {pages.map((group, gi) => (
              <div key={gi} className="flex-shrink-0 w-full flex space-x-4">
                {group.map((member) => (
                  <div key={member.id} className="w-1/3 px-2">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg text-center">
                      <div className="relative h-64 bg-[#613318]">
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-[#613318]">
                          {member.name}
                        </h3>
                        <p className="text-gray-400 uppercase mb-4">
                          {member.role}
                        </p>
                        <div className="flex justify-center space-x-4 text-gray-600">
                          <RiWhatsappFill className="h-6 w-6" />
                          <HiOutlinePhone className="h-6 w-6" />
                          <HiOutlineMail className="h-6 w-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={next}
          className="absolute -right-8 top-1/2 -translate-y-1/2 w-10 h-10
                     flex items-center justify-center bg-white rounded-full
                     shadow hover:bg-gray-100 z-10"
          aria-label="Next"
        >
          <ChevronRightIcon className="w-6 h-6 text-gray-800" />
        </button>
      </div>
    </section>
  );
}

export default React.memo(TestimonialSection);
