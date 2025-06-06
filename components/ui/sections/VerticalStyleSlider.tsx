"use client";

// package
import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";

// ui
import * as ProductCard from "@/ui/card/productCard";
import Heading from "@/ui/head";
import Text from "@/ui/text";
import SectionLayout from "@/layouts/sectionLayout";

// data
import summerStyleProducts from "@/data/summerStyle.json";

// css
import "keen-slider/keen-slider.min.css";
import { ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function VerticalStyleSlider() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [slideRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    vertical: true, // 启用垂直滑动
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    slides: {
      spacing: 16,
      perView: 2, // 垂直显示2个项目
    },
    mode: "snap",
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 3,
          spacing: 20,
        },
        mode: "free-snap",
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 4,
          spacing: 24,
        },
        mode: "free-snap",
      },
    },
    renderMode: "performance",
  });

  return (
    <SectionLayout>
      <div className="space-y-8 p-8">
        <Heading
          as="h2"
          intent="base-section"
          className="text-center"
        >
          FEATURED COLLECTIONS
        </Heading>
        
        <Text className="text-center text-gray-600 max-w-4xl mx-auto">
          Explore our curated selection of premium garments, each piece carefully crafted to embody timeless elegance and contemporary sophistication.
        </Text>

        <div className="relative">
          {loaded && instanceRef.current && (
            <>
              <button
                onClick={() => instanceRef.current?.prev()}
                className="absolute top-2 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow hover:bg-gray-50 transition-colors"
              >
                <ChevronUp className="h-6 w-6" />
              </button>
              <button
                onClick={() => instanceRef.current?.next()}
                className="absolute bottom-2 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow hover:bg-gray-50 transition-colors"
              >
                <ChevronDown className="h-6 w-6" />
              </button>
            </>
          )}
          
          {/* 垂直滑动容器 */}
          <div className="h-[600px] overflow-hidden"> {/* 固定高度容器 */}
            <div ref={slideRef} className="keen-slider h-full">
              {summerStyleProducts.map((product) => (
                <div key={product.id} className="keen-slider__slide">
                  <ProductCard.Root data={product}>
                    <ProductCard.Thumbnail>
                      <ProductCard.ThumbnailBadge>
                        <ProductCard.WishlistButton />
                      </ProductCard.ThumbnailBadge>

                      <Link href="/product">
                        <ProductCard.Image />
                      </Link>
                    </ProductCard.Thumbnail>

                    <Link href="/product">
                      <ProductCard.Content>
                        <ProductCard.Ratings />
                        <ProductCard.Name />
                      </ProductCard.Content>
                    </Link>
                  </ProductCard.Root>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}