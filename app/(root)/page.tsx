'use client';
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
import VerticalImageSlider from "@/ui/sections/VerticalImageSlider";
import CustomizationSection from "@/ui/sections/CustomizationSection";
import FabricSection from "@/ui/sections/FabricSection";

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
              The Art of Tailored Excellence
            </Heading>
            <Text className="text-gray-600 max-w-4xl mx-auto">
              Discover the timeless elegance and sophisticated craftsmanship behind our premium suit collection. From classic business attire to contemporary formal wear, experience how traditional tailoring meets modern innovation. Our suits embody the perfect fusion of heritage techniques and cutting-edge design, creating garments that define professional excellence and personal style.
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

      {/* 新增垂直图片滑动组件 */}
      <VerticalImageSlider />

      {/* 新增定制section */}
      <CustomizationSection />

      {/* 新增面料section */}
      <FabricSection />
      
      {/* 其余内容保持不变 */}
    </>
  );
}
