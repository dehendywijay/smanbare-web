"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState, useCallback } from "react";
import HeroSlideCaption from "@/components/animations/HeroSlideCaption";
import { heroSlides } from "@/lib/homeData";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveSlideIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  return (
    <section className="relative w-full h-screen min-h-screen overflow-hidden bg-slate-950">
      {/* Carousel */}
      <div className="h-full w-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full w-full">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className="relative flex-[0_0_100%] h-full w-full overflow-hidden"
            >
              {/* Image with Ken Burns effect */}
              <div
                className={`absolute inset-0 w-full h-full transition-transform duration-[10000ms] ease-linear ${index === activeSlideIndex ? "scale-110" : "scale-100"}`}
              >
                <Image
                  src={slide.imageUrl}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Cinematic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
              <div className="absolute inset-0 bg-slate-950/20" />

              {/* Content */}
              <div className="relative h-full w-full max-w-7xl mx-auto px-6 flex items-center">
                <HeroSlideCaption
                  title={slide.title}
                  subtitle={slide.subtitle}
                  isActive={index === activeSlideIndex}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot Navigation */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`transition-all duration-500 rounded-full ${index === activeSlideIndex
                ? "w-10 bg-brand-primary"
                : "w-2.5 bg-white/40 hover:bg-white/60"
              } h-2.5`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce hidden md:block">
        <ChevronDown size={32} />
      </div>
    </section>
  );
}
