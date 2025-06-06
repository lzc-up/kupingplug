"use client";
import { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import Link from "next/link";
import "keen-slider/keen-slider.min.css";

const heroImages = [
  {
    src: "/images/leoga/2主界面导航栏轮播背景2.png",
    alt: "Music Experience 2",
    width: 1920,
    height: 1080
  },
  {
    src: "/images/leoga/3主界面导航栏轮播背景3.png",
    alt: "Music Experience 3",
    width: 1920,
    height: 1080
  },
  {
    src: "/images/leoga/背景图.webp",
    alt: "Music Experience 4",
    width: 1920,
    height: 1080
  }
];

interface HeroCarouselProps {
  className?: string;
}

export default function HeroCarousel({ className }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    slides: {
      perView: 1,
    },
  });

  // 自动轮播效果
  useEffect(() => {
    const interval = setInterval(() => {
      if (instanceRef.current) {
        instanceRef.current.next();
      }
    }, 4000); // 3秒间隔

    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <div className="relative w-full h-full">
      <div ref={sliderRef} className="keen-slider w-full h-full">
        {heroImages.map((image, index) => (
          <div key={index} className="keen-slider__slide relative w-full h-full">
            <Link href="https://www.baidu.com" target="_blank" className="block w-full h-full">
              <Image
                src={image.src}
                fill
                className="object-cover"
                alt={image.alt}
                priority={index === 0}
              />
            </Link>
          </div>
        ))}
      </div>

      {/* 轮播指示器 */}
      <div className="absolute bottom-4 left-0 right-0 z-10">
        <div className="flex justify-center space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => instanceRef.current?.moveToIdx(index)}
              className={`w-20 h-1 rounded-none transition-all duration-300 ${
                currentSlide === index
                  ? "bg-white shadow-lg"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}