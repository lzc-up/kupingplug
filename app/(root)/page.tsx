"use client";
import Link from "next/link";
import Image from "next/image";

// layouts
import SectionLayout from "@/layouts/sectionLayout";

// ui
import SummerStyleSlider  from "@/ui/sections/SummerStyleSlider";
import Button from "@/ui/button";
import Heading from "@/ui/head";
import Text from "@/ui/text";
import CatalogSlider from "@/ui/slider/catalogSlider";
import VideoPlayer from "@/components/ui/video/VideoPlayer";
import * as ProductCard from "@/ui/card/productCard";
import {
  ArrowRightIcon,
  CallIcon,
  DeliveryIcon,
  LockIcon,
  MoneyIcon,
} from "@/ui/assets/svg";

// data
import products from "@/data/product.json";

export default function Home() {
  return (
    <>
      {/* 移除原有的 HeroCarousel section，现在它在导航栏中作为背景 */}
      
      <SummerStyleSlider />

      {/* Video Section */}
      <SectionLayout bg="bg-gray-50">
        <div className="py-16 px-8">
          <div className="text-center mb-12">
            <Heading
              as="h2"
              intent="base-section"
              className="mb-4"
            >
              体验我们的产品
            </Heading>
            <Text className="text-gray-600 max-w-2xl mx-auto">
              通过视频了解我们产品的卓越品质和创新设计
            </Text>
          </div>
          
          {/* Video Container */}
          <div className="max-w-4xl mx-auto">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              {/* 16:9 Aspect Ratio Container */}
              <div className="absolute inset-0 bg-black rounded-lg shadow-2xl overflow-hidden">
                <VideoPlayer
                  src="/images/leoga/tie.mp4"
                  controls={true}
                  muted={true}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </SectionLayout>

      {/* Product section */}
      <SectionLayout>
        <div className="space-y-10 p-8">
          <Heading
            as="h2"
            intent="base-section"
            className="text-center md:text-left"
          >
            New Arrivals
          </Heading>

          {/* catalog product slider */}
          <CatalogSlider />
        </div>
      </SectionLayout>
      
      {/* 其余内容保持不变 */}
    </>
  );
}
