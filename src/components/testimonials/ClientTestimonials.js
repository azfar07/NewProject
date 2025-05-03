// src/components/testimonials/ClientTestimonials.jsx
'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useGetTestimonialsQuery } from '@/store/apiSlice';
import Spinner from '../Loading';

function ClientTestimonials() {
  // 1. data hook (now also grabbing `error`)
  const {
    data: list = [],
    isLoading,
    isError,
    error,
  } = useGetTestimonialsQuery();

  // 2. hooks for carousel & animation  
  const last = list.length - 1;
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timer = useRef(null);

  // cleanup timer
  useEffect(() => () => clearTimeout(timer.current), []);

  const switchTo = useCallback(
    (idx) => {
      if (animating) return;
      setAnimating(true);
      timer.current = setTimeout(() => {
        setCurrent(idx);
        setAnimating(false);
      }, 500);
    },
    [animating]
  );

  const prev = useCallback(
    () => switchTo(current === 0 ? last : current - 1),
    [current, last, switchTo]
  );
  const next = useCallback(
    () => switchTo(current === last ? 0 : current + 1),
    [current, last, switchTo]
  );

  // 3. handle loading / error / empty
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="p-6 max-w-md mx-auto bg-red-100 text-red-800 rounded">
        <p className="font-semibold">Error {error?.status || ''} loading testimonials</p>
        <p>{error?.data || error?.message || 'An unexpected error occurred.'}</p>
      </div>
    );
  }

  if (!list.length) return null;

  // current slide data
  const { name, role, quote, photo } = list[current];

  // 4. render
  return (
    <section id="ClientTestimonial" className="bg-[#613318] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">What our clients are saying</h2>
          <p className="text-lg">Our clients range from individual investors to Fortune 500 companies.</p>
          <div
            className={`w-full max-w-sm rounded-lg overflow-hidden shadow-lg transition-opacity duration-500 ${
              animating ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <Image src={photo} alt={name} width={500} height={500} className="object-cover w-full h-full" />
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <p
            className={`text-xl leading-relaxed transition-opacity duration-500 ${
              animating ? 'opacity-0' : 'opacity-100'
            }`}
          >
            “{quote}”
          </p>
          <div className={`transition-opacity duration-500 ${animating ? 'opacity-0' : 'opacity-100'}`}>
            <p className="font-semibold text-2xl">{name}</p>
            <p className="uppercase text-gray-300">{role}</p>
          </div>

          <div className="flex items-center space-x-4 mt-4">
            <button
              onClick={prev}
              className="w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition"
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 bg-white text-[#613318] rounded-full flex items-center justify-center transition"
              aria-label="Next testimonial"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(ClientTestimonials);
