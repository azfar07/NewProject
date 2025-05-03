// app/layout.js
"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import "./globals.css";

import Providers from "../components/Provider";
import Header from "../components/Navbar/Header";
import Footer from "../components/Footer/Footer";

export default function RootLayout({ children }) {
  const path = usePathname();

  return (
    <html lang="en">
      <Providers>
        <body>
          <Header />

          <AnimatePresence mode="wait">
            <motion.div
              key={path}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>

          <Footer />
        </body>
      </Providers>
    </html>
  );
}
