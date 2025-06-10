'use client';

import Link from "next/link";
import Image from "next/image";
import SectionLayout from "@/layouts/sectionLayout";
import Heading from "@/ui/head";
import Text from "@/ui/text";
import Button from "@/ui/button";
import VideoPlayer from "@/components/ui/video/VideoPlayer";
import FabricLibrary from "@/components/ui/fabric/FabricLibrary";
import { ArrowRightIcon } from "@/ui/assets/svg";
import fabricLibraryData from "@/data/fabricLibrary.json";
import { useEffect, useRef, useState } from "react";

export default function FabricsPage() {
  const { fabricLibrary } = fabricLibraryData;
  const [showPlayButton, setShowPlayButton] = useState(true);

  const handlePlayButtonClick = () => {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
        setShowPlayButton(false);
      } else {
        videoElement.pause();
        setShowPlayButton(true);
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* 视频区域 - 完全铺满屏幕 */}
      <div className="relative w-full h-screen">
        <VideoPlayer
          src="/images/leoga/fabric/顶部动画.mov"
          poster="/images/leoga/fabric/18主界面面料背景图.png"
          controls={true}
          muted={true}
          className="w-full h-full object-cover"
        />
        
        {/* 中央播放按钮 */}
        {showPlayButton && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div 
              className="bg-black bg-opacity-50 rounded-full p-6 pointer-events-auto hover:bg-opacity-70 transition-all duration-300 cursor-pointer"
              onClick={handlePlayButtonClick}
            >
              <svg 
                className="w-12 h-12 text-white" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* 标题和描述文字 - 移到视频下方 */}
      <SectionLayout bg="bg-gray-50">
        <div className="py-16 px-8">
          <div className="text-center">
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
                  className="mb-4"
                >
                  2025 Spring/Summer Collection
                </Heading>
                <Text className="text-gray-600 leading-relaxed">
                  Discover our carefully curated selection of premium fabrics for the upcoming season. Each piece represents the perfect balance of innovation, sustainability, and timeless elegance.
                </Text>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <Text className="text-gray-600">Sustainable materials sourced from certified suppliers</Text>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <Text className="text-gray-600">Innovative weaving techniques for enhanced durability</Text>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <Text className="text-gray-600">Exclusive patterns designed by renowned textile artists</Text>
                  </div>
                </div>
                <Button variant="primary" className="mt-6">
                  Explore Collection
                </Button>
              </div>

              {/* 右侧图片网格 */}
              <div className="grid grid-cols-2 gap-4">
                {fabricLibrary.slice(0, 4).map((fabric, index) => (
                  <div 
                    key={fabric.id} 
                    className={`relative overflow-hidden rounded-lg shadow-lg group ${
                      index === 0 ? 'row-span-2' : 'aspect-square'
                    }`}
                  >
                    <Image
                      src={fabric.image}
                      alt={fabric.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <Text className="font-semibold text-sm">{fabric.name}</Text>
                        <Text className="text-xs opacity-90">{fabric.category}</Text>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionLayout>

      {/* 面料库部分 - 使用新的组件 */}
      <FabricLibrary />
    </div>
  );
}