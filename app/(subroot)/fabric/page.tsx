'use client';

import Link from "next/link";
import Image from "next/image";
import SectionLayout from "@/layouts/sectionLayout";
import Heading from "@/ui/head";
import Text from "@/ui/text";
import Button from "@/ui/button";
import VideoPlayer from "@/components/ui/video/VideoPlayer";
import { ArrowRightIcon } from "@/ui/assets/svg";
import fabricLibraryData from "@/data/fabricLibrary.json";

export default function FabricsPage() {
  const { fabricLibrary } = fabricLibraryData;

  return (
    <div className="min-h-screen">
      {/* 视频区域 */}
      <SectionLayout bg="bg-gray-50">
        <div className="py-16 px-8">
          <div className="text-center mb-12">
            <Heading
              as="h1"
              intent="base-section"
              className="mb-4"
            >
              Premium Fabric Collection
            </Heading>
            <Text className="text-gray-600 max-w-4xl mx-auto">
              Explore our exquisite selection of the world's finest fabrics. From luxurious Italian wools to innovative performance blends, discover the materials that define exceptional tailoring and timeless elegance.
            </Text>
          </div>
          
          {/* 视频容器 */}
          <div className="max-w-4xl mx-auto">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              {/* 16:9 宽高比容器 */}
              <div className="absolute inset-0 bg-black rounded-lg shadow-2xl overflow-hidden">
                <VideoPlayer
                  src="/images/leoga/fabric/顶部动画.mov"
                  poster="/images/leoga/fabric-video-poster.jpg"
                  controls={true}
                  muted={true}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </SectionLayout>

      {/* 2025春夏推荐面料展示区域 - 左右布局 */}
      <SectionLayout bg="bg-white">
        <div className="py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* 左侧文字内容 */}
              <div className="space-y-6">
                <Heading
                  as="h2"
                  intent="base-section"
                  className="text-left"
                >
                  2025 Spring Summer Recommended Fabrics
                </Heading>
                <Text className="text-gray-600 text-lg leading-relaxed">
                  Discover our carefully curated selection of premium fabrics for the 2025 Spring Summer season. Each fabric represents the perfect blend of contemporary style, comfort, and sophistication.
                </Text>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <Text className="text-gray-700">Lightweight Wool - Perfect for transitional weather</Text>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <Text className="text-gray-700">Linen Blend - Natural comfort meets refined style</Text>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <Text className="text-gray-700">Performance Fabric - Innovation meets tradition</Text>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <Text className="text-gray-700">Silk Blend - Luxurious texture with natural sheen</Text>
                  </div>
                </div>
                <Link href="/products?category=fabrics">
                  <Button 
                    variant="primary" 
                    fontSize="lg"
                    className="group inline-flex items-center space-x-2 mt-6"
                  >
                    <span>Explore Full Collection</span>
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              
              {/* 右侧四个小图片 */}
              <div className="grid grid-cols-2 gap-6">
                {/* 轻量羊毛面料 */}
                <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48 w-full">
                    <Image
                      src="/images/leoga/product/1产品页新品1.png"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* 亚麻混纺面料 */}
                <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48 w-full">
                    <Image
                      src="/images/leoga/product/13产品页上装3.PNG"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* 性能面料 */}
                <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48 w-full">
                    <Image
                      src="/images/leoga/product/16产品页下装1.PNG"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* 丝绸混纺面料 */}
                <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48 w-full">
                    <Image
                      src="/images/leoga/product/21产品页配饰1.png"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionLayout>

      {/* 2024秋冬主推面料展示区域 - 左图右文字 */}
      <SectionLayout bg="bg-white">
        <div className="py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* 左侧四个小图片 */}
              <div className="grid grid-cols-2 gap-6">
                {/* 图片1 */}
                <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48 w-full">
                    <Image
                      src="/images/leoga/product/1产品页新品1.png"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* 图片2 */}
                <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48 w-full">
                    <Image
                      src="/images/leoga/product/13产品页上装3.PNG"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* 图片3 */}
                <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48 w-full">
                    <Image
                      src="/images/leoga/product/16产品页下装1.PNG"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* 图片4 */}
                <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48 w-full">
                    <Image
                      src="/images/leoga/product/21产品页配饰1.png"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              
              {/* 右侧文字内容 */}
              <div className="space-y-6">
                <Heading
                  as="h2"
                  intent="base-section"
                  className="text-left"
                >
                  2024 Autumn Winter Featured Fabrics
                </Heading>
                <Text className="text-gray-600 text-lg leading-relaxed">
                  Embrace the elegance of our 2024 Autumn Winter collection, featuring luxurious fabrics that combine warmth, sophistication, and timeless style. Each fabric is carefully selected to provide comfort and refinement for the cooler seasons.
                </Text>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <Text className="text-gray-700">Premium wool and cashmere blends</Text>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <Text className="text-gray-700">Rich tweed and herringbone patterns</Text>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <Text className="text-gray-700">Luxurious velvet and corduroy textures</Text>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <Text className="text-gray-700">Thermal performance fabrics</Text>
                  </div>
                </div>
                <Link href="/products?category=fabrics">
                  <Button 
                    variant="primary" 
                    fontSize="lg"
                    className="group inline-flex items-center space-x-2 mt-6"
                  >
                    <span>Explore Autumn Collection</span>
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SectionLayout>

      {/* 面料库部分 - 25宫格展示 */}
      <SectionLayout bg="bg-gray-50">
        <div className="py-16 px-8">
          <div className="max-w-7xl mx-auto">
            {/* 标题部分 */}
            <div className="text-center mb-12">
              <Heading
                as="h2"
                intent="base-section"
                className="mb-4"
              >
                Fabric Library
              </Heading>
              <Text className="text-gray-600 max-w-3xl mx-auto">
                Browse our comprehensive fabric library featuring premium materials from around the world. Each fabric is carefully selected for its quality, texture, and versatility.
              </Text>
            </div>

            {/* 25宫格图片展示 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {fabricLibrary.map((fabric) => (
                <div 
                  key={fabric.id} 
                  className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={fabric.image}
                      alt={fabric.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    />
                    {/* 悬停时显示的遮罩层 */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Text className="text-sm font-medium">{fabric.name}</Text>
                        <Text className="text-xs mt-1">{fabric.category}</Text>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 底部按钮 */}
            <div className="text-center mt-12">
              <Link href="/products">
                <Button 
                  variant="primary" 
                  fontSize="lg"
                  className="group inline-flex items-center space-x-2"
                >
                  <span>View All Products</span>
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </SectionLayout>

    </div>
  );
}