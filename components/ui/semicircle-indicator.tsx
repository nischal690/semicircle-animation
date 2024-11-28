"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SemicircleIndicatorProps {
  value: number;
  max: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-32 h-16",
  md: "w-48 h-24",
  lg: "w-64 h-32",
};

const dotSizes = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

export function SemicircleIndicator({
  value,
  max,
  size = "md",
  showValue = true,
  className,
}: SemicircleIndicatorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const percentage = (value / max);
    // Calculate angle in radians (0 to π for semicircle)
    const angle = Math.PI * percentage;
    
    // Calculate dot position using parametric equations for a semicircle
    const x = 50 - (Math.cos(angle) * 50); // 50% is the center
    const y = 50 - (Math.sin(angle) * 50); // Using 50% for radius
    
    setPosition({ x, y });
  }, [value, max]);

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* Background semicircle */}
      <div
        className="absolute inset-0 overflow-hidden rounded-t-full bg-secondary"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      />
      
      {/* Dot */}
      <div 
        className={cn(
          "absolute rounded-full bg-primary transition-all duration-300 ease-out",
          dotSizes[size]
        )}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Value display */}
      {showValue && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform">
          <span className="text-foreground font-medium">
            {Math.round(value)}
            <span className="text-muted-foreground text-sm ml-1">/ {max}</span>
          </span>
        </div>
      )}
    </div>
  );
}