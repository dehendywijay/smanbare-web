"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Globe } from "lucide-react";

type HeroSlideCaptionProps = {
  title: string;
  subtitle: string;
  isActive: boolean;
};

export default function HeroSlideCaption({ title, subtitle, isActive }: HeroSlideCaptionProps) {
  return (
    <div className="max-w-3xl">
      <div className="space-y-6">
        {/* Badge */}
        <div className={cn(
          "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/20 border border-brand-primary/30 backdrop-blur-md transition-all duration-700 delay-100",
          isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
        )}>
          <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse" />
          <span className="text-xs md:text-sm font-bold tracking-widest text-brand-secondary uppercase">
            SMA Negeri 1 Bangunrejo
          </span>
        </div>

        {/* Title */}
        <h1 className={cn(
          "text-4xl md:text-7xl font-heading font-extrabold text-white leading-[1.1] transition-all duration-1000 ease-out delay-300",
          isActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
        )}>
          {title}
        </h1>

        {/* Subtitle */}
        <p className={cn(
          "text-lg md:text-xl text-white/80 max-w-2xl font-light leading-relaxed transition-all duration-1000 delay-500",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div className={cn(
          "flex flex-wrap gap-4 pt-4 transition-all duration-1000 delay-700",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <Link 
            href="/main/tentang-kami" 
            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/40 active:scale-95"
          >
            Jelajahi Sekolah <Globe size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
