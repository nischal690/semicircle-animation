"use client";

import { SemicircleIndicator } from "@/components/ui/semicircle-indicator";
import { useState, useEffect } from "react";

export default function Home() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <SemicircleIndicator 
        value={value} 
        max={100} 
        size="lg"
      />
    </main>
  );
}