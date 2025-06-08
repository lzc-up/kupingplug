"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  images?: string[]; // 新增：支持多张图片
  description: string;
  categoryKey?: string;
}

interface CategoryDisplayProps {
  category: string;
  onViewMore?: () => void;
}

interface CategoryDisplayData {
  categoryDisplayData: Record<string, CategoryItem[]>;
  categoryMapping: Record<string, string>;
}

const CategoryDisplay: React.FC<CategoryDisplayProps> = ({ category, onViewMore }) => {
  const router = useRouter();
  const [categoryData, setCategoryData] = useState<CategoryItem[]>([]);
  const [categoryMapping, setCategoryMapping] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  // 新增：每个产品的当前图片索引
  const [currentImageIndexes, setCurrentImageIndexes] = useState<Record<string, number>>({});
  // 新增：图片切换定时器
  const [imageTimers, setImageTimers] = useState<Record<string, NodeJS.Timeout>>({});
  
  // 每页显示的产品数量
  const itemsPerPage = 4;
  
  useEffect(() => {
    fetchCategoryData();
  }, [category]);

  useEffect(() => {
    // 当分类数据变化时重置页码和图片索引
    setCurrentPage(0);
    setCurrentImageIndexes({});
    // 清理所有定时器
    Object.values(imageTimers).forEach(timer => clearInterval(timer));
    setImageTimers({});
  }, [categoryData]);

  // 清理定时器
  useEffect(() => {
    return () => {
      Object.values(imageTimers).forEach(timer => clearInterval(timer));
    };
  }, [imageTimers]);

  const fetchCategoryData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/category-display');
      const data: CategoryDisplayData = await response.json();
      
      setCategoryMapping(data.categoryMapping);
      
      // 根据分类获取对应的数据
      const items = data.categoryDisplayData[category] || [];
      setCategoryData(items);
    } catch (error) {
      console.error('Failed to fetch category display data:', error);
      setCategoryData([]);
    } finally {
      setLoading(false);
    }
  };

  // 新增：处理图片悬停开始
  const handleImageMouseEnter = (itemId: string, images: string[]) => {
    if (!images || images.length <= 1) return;
    
    // 清除现有定时器
    if (imageTimers[itemId]) {
      clearInterval(imageTimers[itemId]);
    }
    
    // 设置新的定时器
    const timer = setInterval(() => {
      setCurrentImageIndexes(prev => {
        const currentIndex = prev[itemId] || 0;
        const nextIndex = (currentIndex + 1) % images.length;
        return { ...prev, [itemId]: nextIndex };
      });
    }, 500); // 每800ms切换一张图片
    
    setImageTimers(prev => ({ ...prev, [itemId]: timer }));
  };

  // 新增：处理图片悬停结束
  const handleImageMouseLeave = (itemId: string) => {
    // 清除定时器
    if (imageTimers[itemId]) {
      clearInterval(imageTimers[itemId]);
      setImageTimers(prev => {
        const newTimers = { ...prev };
        delete newTimers[itemId];
        return newTimers;
      });
    }
    
    // 重置图片索引
    setCurrentImageIndexes(prev => {
      const newIndexes = { ...prev };
      delete newIndexes[itemId];
      return newIndexes;
    });
  };

  // 新增：获取当前显示的图片
  const getCurrentImage = (item: CategoryItem) => {
    if (!item.images || item.images.length === 0) {
      return item.image;
    }
    const currentIndex = currentImageIndexes[item.id] || 0;
    return item.images[currentIndex] || item.image;
  };

  // 处理单个产品项点击
  const handleItemClick = (item: CategoryItem) => {
    const categoryKey = item.categoryKey || categoryMapping[category] || 'all';
    router.push(`/products?category=${categoryKey}&item=${item.id}`);
  };

  // 处理"查看更多"点击
  const handleViewMore = () => {
    // 关闭导航下拉菜单
    if (onViewMore) {
      onViewMore();
    }
    
    // 跳转到产品页面
    const categoryKey = Object.values(categoryMapping).find(
      key => Object.keys(categoryMapping).find(name => categoryMapping[name] === key) === category
    ) || category.toLowerCase();
    
    router.push(`/products?category=${categoryKey}`);
  };

  // 计算总页数
  const totalPages = Math.ceil(categoryData.length / itemsPerPage);
  
  // 获取当前页的数据
  const getCurrentPageData = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return categoryData.slice(startIndex, endIndex);
  };

  // 上一页
  const handlePrevPage = () => {
    setCurrentPage(prev => prev > 0 ? prev - 1 : totalPages - 1);
  };

  // 下一页
  const handleNextPage = () => {
    setCurrentPage(prev => prev < totalPages - 1 ? prev + 1 : 0);
  };

  if (loading) {
    return (
      <div className="w-full h-48 flex items-center justify-center text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (categoryData.length === 0) {
    return (
      <div className="w-full h-48 flex items-center justify-center text-gray-500">
        暂无{category}数据
      </div>
    );
  }

  const currentPageData = getCurrentPageData();
  const showNavigation = categoryData.length > itemsPerPage;

  return (
    <div className="w-full">
      {/* 轮播容器 */}
      <div className="relative">
        {/* 左箭头 */}
        {showNavigation && (
          <button
            onClick={handlePrevPage}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border"
            aria-label="上一页"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}
        
        {/* 右箭头 */}
        {showNavigation && (
          <button
            onClick={handleNextPage}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border"
            aria-label="下一页"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        )}

        {/* 产品网格 */}
        <div className="grid grid-cols-4 gap-6 transition-all duration-300">
          {currentPageData.map((item) => (
            <div
              key={item.id}
              className={cn(
                "group cursor-pointer transition-all duration-300 transform",
                "hover:scale-105 hover:shadow-lg"
              )}
              onClick={() => handleItemClick(item)}
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
                <div 
                  className="aspect-[4/5] relative overflow-hidden"
                  onMouseEnter={() => handleImageMouseEnter(item.id, item.images || [])}
                  onMouseLeave={() => handleImageMouseLeave(item.id)}
                >
                  <Image
                    src={getCurrentImage(item)}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 25vw"
                  />
                  {/* 新增：图片切换指示器 */}
                  {item.images && item.images.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      {item.images.map((_, index) => (
                        <div
                          key={index}
                          className={cn(
                            "w-1.5 h-1.5 rounded-full transition-all duration-200",
                            (currentImageIndexes[item.id] || 0) === index
                              ? "bg-white"
                              : "bg-white/50"
                          )}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 页码指示器 */}
      {showNavigation && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                currentPage === index
                  ? "bg-gray-800 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              )}
              aria-label={`第${index + 1}页`}
            />
          ))}
        </div>
      )}
      
      {/* 底部提示 - 改为可点击的按钮 */}
      <div className="text-center mt-6">
        <button
          onClick={handleViewMore}
          className="text-sm text-gray-500 hover:text-gray-700 hover:underline transition-colors duration-200 cursor-pointer"
        >
          点击查看更多{category}系列
        </button>
      </div>
    </div>
  );
};

export default CategoryDisplay;