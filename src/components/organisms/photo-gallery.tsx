"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface PhotoGalleryProps {
  images: string[];
  alt: string;
}

export function PhotoGallery({ images, alt }: PhotoGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function scrollToIndex(index: number): void {
    const track = trackRef.current;
    if (!track) {
      return;
    }
    const clamped = Math.max(0, Math.min(index, images.length - 1));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
  }

  function handleScroll(): void {
    const track = trackRef.current;
    if (!track) {
      return;
    }
    setActiveIndex(Math.round(track.scrollLeft / track.clientWidth));
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex aspect-[4/3] snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] md:aspect-[16/9]"
      >
        {images.map((src, index) => (
          <div
            key={src}
            className="relative h-full w-full shrink-0 snap-center"
          >
            <Image
              src={src}
              alt={`${alt} — foto ${index + 1} de ${images.length}`}
              fill
              priority={index === 0}
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/85 p-2 text-stone-700 shadow transition-opacity hover:bg-white disabled:opacity-40 disabled:hover:bg-white/85 md:block"
          >
            <ChevronLeft aria-hidden className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === images.length - 1}
            aria-label="Próxima foto"
            className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/85 p-2 text-stone-700 shadow transition-opacity hover:bg-white disabled:opacity-40 disabled:hover:bg-white/85 md:block"
          >
            <ChevronRight aria-hidden className="size-5" />
          </button>
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {images.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => scrollToIndex(index)}
                aria-label={`Ir para a foto ${index + 1}`}
                className={cn(
                  "size-2 rounded-full transition-colors",
                  index === activeIndex ? "bg-white" : "bg-white/50",
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
