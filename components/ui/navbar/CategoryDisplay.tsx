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
  
  // 每页显示的产品数量
  const itemsPerPage = 4;
  
  useEffect(() => {
    fetchCategoryData();
  }, [category]);

  useEffect(() => {
    // 当分类数据变化时重置页码
    setCurrentPage(0);
  }, [categoryData]);

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
                "group transition-all duration-300 transform",
                "hover:scale-105 hover:shadow-lg"
              )}
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 25vw"
                  />
                </div>
                
                {/* 修改产品信息区域 - 移除查看详情，文字居中 */}
                <div className="p-4 text-center">
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
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