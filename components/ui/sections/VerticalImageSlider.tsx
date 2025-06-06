"use client";

// package
import { useState, useEffect, useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";

// ui
import SectionLayout from "@/layouts/sectionLayout";

// data
import verticalSliderData from "@/data/verticalSlider.json";

// css
import "keen-slider/keen-slider.min.css";

interface SliderItem {
  id: number;
  image: {
    src: string;
    alt: string;
  };
  title: string;
  subtitle: string;
  description: string;
}

export default function VerticalImageSlider() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  
  const [slideRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    vertical: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    slides: {
      perView: 1,
      spacing: 0,
    },
    mode: "snap",
    renderMode: "performance",
  });

  // 自动播放功能
  useEffect(() => {
    if (!loaded || !isAutoPlaying || isPaused) return;

    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        if (instanceRef.current) {
          const nextSlide = (currentSlide + 1) % verticalSliderData.length;
          instanceRef.current.moveToIdx(nextSlide);
        }
      }, 4000);
    };

    startAutoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [loaded, isAutoPlaying, isPaused, currentSlide, instanceRef]);

  // 鼠标滚轮事件处理
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!instanceRef.current) return;
      
      e.preventDefault();
      
      setIsPaused(true);
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      
      if (e.deltaY > 0) {
        instanceRef.current.next();
      } else {
        instanceRef.current.prev();
      }
      
      setTimeout(() => {
        setIsPaused(false);
      }, 2000);
    };

  }, [instanceRef]);

  const goToSlide = (index: number) => {
    if (instanceRef.current) {
      instanceRef.current.moveToIdx(index);
      setIsPaused(true);
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      setTimeout(() => {
        setIsPaused(false);
      }, 3000);
    }
  };

  const goToPrevSlide = () => {
    if (instanceRef.current && currentSlide > 0) {
      instanceRef.current.prev();
      setIsPaused(true);
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      setTimeout(() => {
        setIsPaused(false);
      }, 3000);
    }
  };

  const goToNextSlide = () => {
    if (instanceRef.current && currentSlide < verticalSliderData.length - 1) {
      instanceRef.current.next();
      setIsPaused(true);
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      setTimeout(() => {
        setIsPaused(false);
      }, 3000);
    }
  };

  // 竖向标识文字
  const indicators = [
    { label: "COAT", subtitle: "Premium" },
    { label: "SHIRT", subtitle: "Refined" },
    { label: "SWEATER", subtitle: "Luxury" },
    { label: "BLAZER", subtitle: "Classic" }
  ];

  const currentItem = verticalSliderData[currentSlide] as SliderItem;
  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === verticalSliderData.length - 1;

  return (
    <SectionLayout bg="bg-white">
      <div className="py-16">
        <div className="w-full">
          <div 
            className="relative min-h-[600px] flex items-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            
            {/* 左侧文字内容区域 */}
            <div className="w-2/5 pr-12 z-10">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wider transition-all duration-700 ease-in-out">
                      {currentItem?.subtitle}
                    </p>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight transition-all duration-700 ease-in-out">
                      {currentItem?.title}
                    </h2>
                  </div>
                  
                  <p className="text-lg text-gray-700 leading-relaxed max-w-md transition-all duration-700 ease-in-out">
                    {currentItem?.description}
                  </p>
                </div>
                
                <div className="pt-4">
                  <button className="bg-gray-900 text-white px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-all duration-300">
                    FABRICS COLLECTION
                  </button>
                </div>
              </div>
            </div>
            
            {/* 中间图片区域 */}
            <div className="w-2/5 h-full relative">
              {/* 上方滑动提示 */}
              <button
                onClick={goToPrevSlide}
                disabled={isFirstSlide}
                className={`absolute top-4 left-1/2 transform -translate-x-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isFirstSlide 
                    ? "text-gray-400 cursor-not-allowed opacity-30" 
                    : "text-white hover:text-gray-200 opacity-70 hover:opacity-100 backdrop-blur-sm"
                }`}
                aria-label="Previous slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              
              <div className="h-[600px] w-full overflow-hidden rounded-2xl shadow-2xl relative">
                <div ref={slideRef} className="keen-slider h-full">
                  {verticalSliderData.map((item, index) => (
                    <div key={item.id} className="keen-slider__slide relative">
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                        priority={item.id === 1}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 下方滑动提示 */}
              <button
                onClick={goToNextSlide}
                disabled={isLastSlide}
                className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isLastSlide 
                    ? "text-gray-400 cursor-not-allowed opacity-30" 
                    : "text-white hover:text-gray-200 opacity-70 hover:opacity-100 backdrop-blur-sm"
                }`}
                aria-label="Next slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            {/* 右侧导航区域 */}
            <div className="w-1/5 pl-12 z-10">
              <div className="space-y-8">
                {/* 竖向指示器 */}
                <div className="space-y-6">
                  {indicators.map((indicator, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`group w-full flex items-center transition-all duration-500 hover:scale-105 ${
                        currentSlide === index ? "opacity-100" : "opacity-60 hover:opacity-80"
                      }`}
                      aria-label={`Go to ${indicator.label}`}
                    >
                      {/* 标识文字 */}
                      <div className="text-right mr-4 flex-1">
                        <div className={`text-xs font-bold tracking-wider transition-all duration-500 ${
                          currentSlide === index ? "text-gray-900 scale-105" : "text-gray-500"
                        }`}>
                          {indicator.label}
                        </div>
                        <div className={`text-xs transition-all duration-500 ${
                          currentSlide === index ? "text-gray-600" : "text-gray-400"
                        }`}>
                          {indicator.subtitle}
                        </div>
                      </div>
                      
                      {/* 竖线 */}
                      <div className={`w-1 h-16 transition-all duration-500 ${
                        currentSlide === index
                          ? "bg-gray-900 scale-110"
                          : "bg-gray-400 group-hover:bg-gray-600"
                      }`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}