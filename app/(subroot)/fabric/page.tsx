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
import actualFabricData from '@/data/fabricData.json'; // 新增：导入新的面料数据
import { useEffect, useRef, useState } from "react";

export default function FabricsPage() {
  // const { fabricLibrary } = fabricLibraryData; // 旧的假数据
  const { fabricData } = actualFabricData; // 新增：使用新的面料数据
  const [showPlayButton, setShowPlayButton] = useState(true);
  
  // 新增：筛选状态
  const [activeFilter, setActiveFilter] = useState('成分');
  // 在组件顶部的状态定义
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null); // 新增：悬停状态
  
  // 在组件中的函数定义
  const handleMouseEnter = (filterType: string) => {
    setHoveredFilter(filterType);
  };
  
  const handleMouseLeave = () => {
    setHoveredFilter(null);
  };
  
  // 决定当前显示的筛选类型（优先显示悬停的，如果没有悬停则显示激活的）
  const currentDisplayFilter = hoveredFilter || activeFilter;
  const [activeSubFilter, setActiveSubFilter] = useState('');
  const [filteredFabrics, setFilteredFabrics] = useState(fabricData);
  const [isLoading, setIsLoading] = useState(true);

  // 新增：筛选选项配置 (保持用户定义)
  const filterOptions: Record<string, string[]> = { 
    '成分': ['棉', '麻', '羊毛', '丝绸'],
    '颜色': ['黑色', '白色',  '蓝色',  '棕色'],
    '图案': ['格子', '千鸟格', '条纹', '纯色'],
    '重量': ['超轻', '轻便', '中等', '重'],
    '季节': ['春季', '夏季', '秋季', '冬季'],
    '场合': ['职业', '婚礼', '宴会', '毕业式']
  };

  // 更新：处理筛选逻辑
  const handleFilterChange = (filterType: string, subFilter?: string) => {
    setActiveFilter(filterType);
    if (subFilter) {
      setActiveSubFilter(subFilter);
      const newFilteredFabrics = fabricData.filter(fabric => 
        fabric.properties[filterType as keyof typeof fabric.properties] === subFilter
      );
      setFilteredFabrics(newFilteredFabrics);
    } else {
      setActiveSubFilter('');
      // 如果只选择了一级筛选，则显示该一级筛选下的所有面料，或者显示全部（如果希望如此）
      // 当前逻辑：如果只选一级，则显示所有面料
      setFilteredFabrics(fabricData); 
    }
  };

  // 新增：重置筛选
  const resetFilters = () => {
    setActiveFilter('成分');
    setActiveSubFilter('');
    setFilteredFabrics(fabricData);
  };

  useEffect(() => {
    // 模拟数据加载
    setFilteredFabrics(fabricData);
    setIsLoading(false);
  }, []);

  const handlePlayButtonClick = () => {
    // 查找页面中的 video 元素
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
          poster="/images/leoga/fabric/fabric-video-poster.jpg"
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
            </div>

            {/* 新增：筛选导航栏 */} 
            <div className="mb-8">
              {/* 一级导航 */}
              <div 
                className="flex flex-row flex-wrap justify-center gap-4 mb-6 max-w-4xl mx-auto"
                onMouseLeave={handleMouseLeave} // 当鼠标离开整个导航区域时隐藏二级导航
              >
                {Object.keys(filterOptions).map((filterType) => (
                  <button
                    key={filterType}
                    onClick={() => handleFilterChange(filterType)}
                    onMouseEnter={() => handleMouseEnter(filterType)} // 鼠标进入时显示对应二级导航
                    className={`px-6 py-3 rounded-full transition-all duration-300 text-center text-sm sm:text-base ${
                      activeFilter === filterType
                        ? 'bg-black text-white shadow-lg'
                        : hoveredFilter === filterType
                        ? 'bg-gray-200 text-gray-800 shadow-md' // 悬停时的样式
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {filterType}
                  </button>
                ))}
              </div>

              {/* 二级导航 - 修改显示逻辑 */} 
              {currentDisplayFilter && filterOptions[currentDisplayFilter] && (
                <div className="max-w-4xl mx-auto mb-6 transition-all duration-300 ease-in-out">
                  <div className="flex justify-center">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {filterOptions[currentDisplayFilter].map((subOption) => (
                        <button
                          key={subOption}
                          onClick={() => handleFilterChange(currentDisplayFilter, subOption)}
                          className={`px-4 py-2 rounded-full transition-all duration-300 text-center text-xs sm:text-sm ${
                            activeSubFilter === subOption && activeFilter === currentDisplayFilter
                              ? 'bg-gray-800 text-white'
                              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                          }`}
                        >
                          {subOption}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
               {/* 新增：重置筛选按钮 */}
               <div className="text-center mb-8">
                <Button 
                  onClick={resetFilters}
                  className="text-sm"
                >
                  重置筛选
                </Button>
              </div>
            </div>

            {/* 25宫格图片展示 */}
            {isLoading ? (
              <div className="text-center py-10">
                <Text>加载面料中...</Text>
              </div>
            ) : filteredFabrics.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredFabrics.map((fabric) => (
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
                        priority={fabric.id <= 10} //  优化LCP，优先加载前10张图片
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center p-2">
                        <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Text className="text-sm font-semibold">{fabric.name}</Text> 
                          {/* 可以根据需要显示更多属性 */}
                          {/* <Text className="text-xs mt-1">{fabric.properties['颜色']}</Text> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Text>没有找到符合条件的面料。</Text>
              </div>
            )}

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