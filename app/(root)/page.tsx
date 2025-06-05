// package
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
                {/* 这里可以放置您的视频组件 */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium">点击播放视频</p>
                    <p className="text-sm text-gray-300 mt-2">在这里嵌入您的视频组件</p>
                  </div>
                </div>
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
