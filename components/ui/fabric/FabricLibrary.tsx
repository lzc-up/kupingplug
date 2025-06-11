'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionLayout from '@/layouts/sectionLayout';
import Heading from '@/ui/head';
import { Filter } from 'lucide-react';
import Text from '@/ui/text';
import Button from '@/ui/button';
import { ArrowRightIcon } from '@/ui/assets/svg';
import actualFabricData from '@/data/fabricData.json';

interface FabricLibraryProps {
  className?: string;
}

export default function FabricLibrary({ className }: FabricLibraryProps) {
  const { fabricData } = actualFabricData;
  
  // 筛选状态 - 改为单条件筛选
  const [activeFilter, setActiveFilter] = useState('');
  const [activeSubFilter, setActiveSubFilter] = useState('');
  const [hoveredFilter, setHoveredFilter] = useState(''); // 控制悬停显示哪个二级导航
  const [filteredFabrics, setFilteredFabrics] = useState(fabricData);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredButtonRef, setHoveredButtonRef] = useState<HTMLButtonElement | null>(null);
  
  // 使用 ref 来管理延迟隐藏的定时器
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 筛选选项配置
  const filterOptions: Record<string, string[]> = {
    '成分': ['棉', '麻', '羊毛', '丝绸'],
    '颜色': ['黑色', '白色', '蓝色', '棕色'],
    '图案': ['格子', '千鸟格', '条纹', '纯色'],
    '重量': ['超轻', '轻便', '中等', '重'],
    '季节': ['春季', '夏季', '秋季', '冬季'],
    '场合': ['职业', '婚礼', '宴会', '毕业式']
  };

  // 清除隐藏定时器
  const clearHideTimeout = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  // 处理鼠标悬停
  const handleMouseEnter = (filterType: string, buttonElement: HTMLButtonElement) => {
    clearHideTimeout(); // 清除任何现有的隐藏定时器
    setHoveredFilter(filterType);
    setHoveredButtonRef(buttonElement);
  };

  // 处理鼠标离开一级导航
  const handlePrimaryMouseLeave = () => {
    // 设置延迟隐藏
    hideTimeoutRef.current = setTimeout(() => {
      setHoveredFilter('');
      setHoveredButtonRef(null);
    }, 300); // 增加延迟时间给用户更多时间移动到二级导航
  };

  // 处理鼠标进入二级导航
  const handleSubFilterMouseEnter = () => {
    clearHideTimeout(); // 清除隐藏定时器，保持二级导航显示
  };

  // 处理鼠标离开二级导航
  const handleSubFilterMouseLeave = () => {
    // 立即隐藏二级导航
    setHoveredFilter('');
    setHoveredButtonRef(null);
  };

  // 处理二级导航选择
  const handleSubFilterClick = (filterType: string, subFilter: string) => {
    clearHideTimeout();
    setActiveFilter(filterType);
    setActiveSubFilter(subFilter);
    setHoveredFilter(''); // 选择后隐藏二级导航
    setHoveredButtonRef(null);
    
    // 应用筛选
    const newFilteredFabrics = fabricData.filter(fabric => 
      fabric.properties[filterType as keyof typeof fabric.properties] === subFilter
    );
    setFilteredFabrics(newFilteredFabrics);
  };

  // 重置筛选
  const resetFilters = () => {
    clearHideTimeout();
    setActiveFilter('');
    setActiveSubFilter('');
    setHoveredFilter('');
    setHoveredButtonRef(null);
    setFilteredFabrics(fabricData);
  };

  // 计算二级导航的位置
  const getSubFilterPosition = () => {
    if (!hoveredButtonRef) return {};
    
    const buttonRect = hoveredButtonRef.getBoundingClientRect();
    const containerRect = hoveredButtonRef.closest('.max-w-4xl')?.getBoundingClientRect();
    
    if (!containerRect) return {};
    
    const buttonCenterX = buttonRect.left + buttonRect.width / 2 - containerRect.left;
    
    return {
      left: `${buttonCenterX}px`,
      transform: 'translateX(-50%)'
    };
  };

  // 清理定时器
  useEffect(() => {
    return () => {
      clearHideTimeout();
    };
  }, []);

  useEffect(() => {
    setFilteredFabrics(fabricData);
    setIsLoading(false);
  }, []);

  return (
    <SectionLayout bg="bg-gray-50" className={className}>
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
          {/* 筛选导航栏 */}
          <div className="mb-16 relative"> {/* 增加底部间距从mb-8改为mb-16 */}
            {/* 一级导航 - 将筛选按钮移到最前面 */}
            <div className="flex flex-row flex-wrap justify-center gap-4 mb-6 max-w-4xl mx-auto relative">
              {/* 筛选提示标签 - 移到最前面 */}
              <button 
                onClick={resetFilters}
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 cursor-pointer"
              >
                <Filter className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700 font-medium">清除</span>
                {/* {(activeFilter || activeSubFilter) && (
                  <span className="ml-1 text-xs text-gray-500">(点击清除)</span>
                )} */}
              </button>
              
              {/* 一级导航按钮 */}
              {Object.keys(filterOptions).map((filterType) => (
                <button
                  key={filterType}
                  ref={(el) => {
                    if (hoveredFilter === filterType && el) {
                      setHoveredButtonRef(el);
                    }
                  }}
                  onMouseEnter={(e) => handleMouseEnter(filterType, e.currentTarget)}
                  onMouseLeave={handlePrimaryMouseLeave}
                  className={`px-6 py-3 rounded-full transition-all duration-300 text-center text-sm sm:text-base ${
                    activeFilter === filterType
                      ? 'bg-black text-white shadow-lg'
                      : hoveredFilter === filterType
                      ? 'bg-gray-200 text-gray-800 shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                >
                  {filterType}
                  {activeFilter === filterType && activeSubFilter && (
                    <span className="ml-2 text-xs bg-white text-black px-2 py-1 rounded-full">
                      {activeSubFilter}
                    </span>
                  )}
                </button>
              ))}
              
              {/* 二级导航 */}
              {hoveredFilter && filterOptions[hoveredFilter] && hoveredButtonRef && (
                <div 
                  className="absolute top-full mt-2 z-10 transition-all duration-300 ease-in-out"
                  style={getSubFilterPosition()}
                  onMouseEnter={handleSubFilterMouseEnter}
                  onMouseLeave={handleSubFilterMouseLeave}
                >
                  <div className="flex justify-center">
                    <div className="flex flex-wrap gap-2 justify-center min-w-max">
                      {filterOptions[hoveredFilter].map((subOption) => (
                        <button
                          key={subOption}
                          onClick={() => handleSubFilterClick(hoveredFilter, subOption)}
                          className={`px-4 py-2 rounded-full transition-all duration-300 text-center text-xs sm:text-sm whitespace-nowrap ${
                            activeFilter === hoveredFilter && activeSubFilter === subOption
                              ? 'bg-gray-800 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {subOption}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          </div>

          {/* 25宫格图片展示 */}
          {isLoading ? (
            <div className="text-center py-10">
              <Text>加载面料中...</Text>
            </div>
          ) : filteredFabrics.length > 0 ? (
            <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto">
              {filteredFabrics.slice(0, 16).map((fabric) => (
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
                      priority={fabric.id <= 10}
                    />
                    {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center p-2">
                      <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Text className="text-sm font-semibold">{fabric.name}</Text>
                      </div>
                    </div> */}
                  </div>
                  {/* 图片下方的文字 */}
                  <div className="p-3">
                    <Text className="text-sm text-gray-700 text-center font-medium">
                      {fabric.name}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Text>没有找到符合条件的面料</Text>
            </div>
          )}

      </div>
    </SectionLayout>
  );
}