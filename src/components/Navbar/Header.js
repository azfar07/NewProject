"use client";

import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import dynamic from "next/dynamic";
import { useRouter, usePathname } from "next/navigation";
import { useGetLegalConsultationQuery } from "@/store/apiSlice";
import Spinner from "../Loading";
/* ── lazy-loaded sub-components ─────────────────────── */
const DesktopNav = dynamic(() => import("./Components/DesktopNav"), {
  loading: () => <Spinner height={64} />, // ~menu height
});
const RightControls = dynamic(() => import("./Components/RightControls"), {
  loading: () => <Spinner height={64} />,
});
const MobileToggle = dynamic(() => import("./Components/MobileToggle"), {
  loading: () => <Spinner height={64} />,
});
const MegaMenu = dynamic(() => import("./Components/MegaMenu"), {
  loading: () => <Spinner height={300} />, // approximate
});

/* ─────────────────────────────  HEADER  ───────────────────────────── */

function Header() {
  const router = useRouter();
  const pathname = usePathname();

  /* ─── state ────────────────────────────────────────── */
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  /* ─── RTK Query ────────────────────────────────────── */
  const {
    data: page,
    isLoading: isConsultLoading,
    isError: isConsultError,
  } = useGetLegalConsultationQuery();

  /* ─── effects ──────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // prefetch static routes once
  useEffect(() => {
    ["/about", "/team", "/blogs", "/contact", "/book"].forEach((p) =>
      router.prefetch(p)
    );
  }, [router]);

  // prefetch dynamic slug when ready
  useEffect(() => {
    if (page?.slug) router.prefetch(`/legal-consultation/${page.slug}`);
  }, [router, page?.slug]);

  /* ─── memoised callbacks ───────────────────────────── */
  const scrollTo = useCallback((id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const goHome = useCallback(() => router.push("/"), [router]);
  const goLegal = useCallback(() => {
    if (page?.slug) router.push(`/legal-consultation/${page.slug}`);
  }, [router, page?.slug]);

  /* ─── mega-menu data (memo) ────────────────────────── */
  const megaMenuColumns = useMemo(
    () => [
      [
        {
          label: "Legal Consultation Services",
          click: goLegal,
          prefetch: page?.slug && `/legal-consultation/${page.slug}`,
        },
        {
          label: "Foreign Investment Services",
          click: () => {},
          prefetch: null,
        },
        { label: "Contracts", click: () => {}, prefetch: null },
        { label: "Notarization", click: () => {}, prefetch: null },
        { label: "Insurance", click: () => {}, prefetch: null },
      ],
      [
        { label: "…and Defense in All Cases", click: () => {}, prefetch: null },
        {
          label: "Banks and Financial Institutions",
          click: () => {},
          prefetch: null,
        },
        {
          label: "Corporate Governance Services",
          click: () => {},
          prefetch: null,
        },
        { label: "Companies Liquidation", click: () => {}, prefetch: null },
        {
          label: "Internal Regulations for Companies",
          click: () => {},
          prefetch: null,
        },
      ],
      [
        {
          label: "Services for Companies and Institutions",
          click: () => {},
          prefetch: null,
        },
        { label: "Arbitration", click: () => {}, prefetch: null },
        { label: "Intellectual Property", click: () => {}, prefetch: null },
        {
          label: "Corporate Restructuring and Reorganization",
          click: () => {},
          prefetch: null,
        },
        { label: "Estates", click: () => {}, prefetch: null },
      ],
      [
        {
          label: "Establishing National and Foreign Companies",
          click: () => {},
          prefetch: null,
        },
        { label: "Commercial Agencies", click: () => {}, prefetch: null },
        { label: "Supporting Vision 2030", click: () => {}, prefetch: null },
        { label: "…", click: () => {}, prefetch: null },
        { label: "", click: () => {}, prefetch: null },
      ],
    ],
    [goLegal, page?.slug]
  );

  /* ─── memoised styling strings ─────────────────────── */
  const textColor = useMemo(
    () => (scrolled ? "text-black" : "text-white"),
    [scrolled]
  );
  const bgColor = useMemo(
    () => (scrolled ? "bg-transparent" : "bg-[#613318]"),
    [scrolled]
  );
  const borderColor = useMemo(
    () => (scrolled ? "border-black" : "border-white"),
    [scrolled]
  );
  const btnHover = useMemo(
    () =>
      scrolled
        ? "hover:bg-black hover:text-white"
        : "hover:bg-white hover:text-[#613318]",
    [scrolled]
  );

  /* ─── search-bar visibility (memo) ─────────────────── */
  const onBlogPage = pathname === "/blogs";
  const onLegalPage = pathname.startsWith("/legal-consultation");
  const showIcon = useMemo(
    () => (pathname === "/" || onLegalPage) && !showSearchInput,
    [pathname, onLegalPage, showSearchInput]
  );
  const showSearchBar = useMemo(
    () => onBlogPage || showSearchInput,
    [onBlogPage, showSearchInput]
  );

  /* ─── render ───────────────────────────────────────── */
  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${bgColor}`}
      onMouseLeave={() => setMenuOpen(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button onClick={goHome} aria-label="Home" className="flex-shrink-0">
            <img src="/LogoImage.png" alt="Logo" className="h-10 w-auto" />
          </button>

          {/* Desktop nav */}
          <DesktopNav
            textColor={textColor}
            scrollTo={scrollTo}
            setMenuOpen={setMenuOpen}
          />

          {/* Right side */}
          <RightControls
            showIcon={showIcon}
            showSearchBar={showSearchBar}
            textColor={textColor}
            setShowSearchInput={setShowSearchInput}
            borderColor={borderColor}
            btnHover={btnHover}
          />

          {/* Mobile burger */}
          <MobileToggle
            textColor={textColor}
            toggle={() => setMenuOpen((o) => !o)}
          />
        </div>
      </div>

      {/* Mega-menu */}
      <MegaMenu
        menuOpen={menuOpen}
        columns={megaMenuColumns}
        router={router}
        isConsultLoading={isConsultLoading}
        isConsultError={isConsultError}
      />
    </header>
  );
}

export default memo(Header);
