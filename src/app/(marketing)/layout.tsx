import React from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 200px)" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
