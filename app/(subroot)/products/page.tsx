"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  images?: string[]; // 新增：支持多张图片
  description: string;
  categoryKey?: string;
}

interface CategoryDisplayData {
  categoryDisplayData: Record<string, CategoryItem[]>;
  categoryMapping: Record<string, string>;
}

const ProductsPage = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const [allProducts, setAllProducts] = useState<CategoryItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<CategoryItem[]>([]);
  const [highlightedItem, setHighlightedItem] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [categoryMapping, setCategoryMapping] = useState<Record<string, string>>({});
  // 新增：图片切换相关状态
  const [currentImageIndexes, setCurrentImageIndexes] = useState<Record<string, number>>({});
  const [imageTimers, setImageTimers] = useState<Record<string, NodeJS.Timeout>>({});

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    // 从URL参数获取分类和高亮项目
    const categoryParam = searchParams.get('category');
    const itemParam = searchParams.get('item');
    
    // 根据URL参数筛选产品
    if (categoryParam && categoryParam !== 'all') {
      const filtered = allProducts.filter(product => {
        return product.categoryKey === categoryParam;
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
    
    if (itemParam) {
      setHighlightedItem(itemParam);
      // 3秒后取消高亮
      setTimeout(() => setHighlightedItem(null), 3000);
    }
  }, [searchParams, allProducts]);

  // 清理定时器
  useEffect(() => {
    return () => {
      Object.values(imageTimers).forEach(timer => clearInterval(timer));
    };
  }, [imageTimers]);

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/category-display');
      const data: CategoryDisplayData = await response.json();
      
      setCategoryMapping(data.categoryMapping);
      
      // 将所有分类的产品合并到一个数组中
      const allItems: CategoryItem[] = [];
      Object.entries(data.categoryDisplayData).forEach(([category, items]) => {
        items.forEach(item => {
          allItems.push({
            ...item,
            // 添加分类信息用于筛选
            categoryKey: item.categoryKey || data.categoryMapping[category]
          });
        });
      });
      
      setAllProducts(allItems);
    } catch (error) {
      console.error('Failed to fetch products:', error);
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
    }, 800); // 每800ms切换一张图片
    
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
  const getCurrentImage = (product: CategoryItem) => {
    if (!product.images || product.images.length === 0) {
      return product.image;
    }
    const currentIndex = currentImageIndexes[product.id] || 0;
    return product.images[currentIndex] || product.image;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <span className="ml-4 text-gray-600">加载中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 产品网格 */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">暂无产品</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={cn(
                "group transition-all duration-300 transform",
                "hover:scale-105 hover:shadow-xl",
                "bg-white rounded-lg overflow-hidden shadow-md border",
                highlightedItem === product.id && "ring-4 ring-blue-500 ring-opacity-50 shadow-2xl scale-105"
              )}
            >
              {/* 产品图片 */}
              <div 
                className="aspect-[4/5] relative overflow-hidden"
                onMouseEnter={() => handleImageMouseEnter(product.id, product.images || [])}
                onMouseLeave={() => handleImageMouseLeave(product.id)}
              >
                <Image
                  src={getCurrentImage(product)}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                
                {/* 高亮标识 */}
                {highlightedItem === product.id && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    推荐
                  </div>
                )}
                
                {/* 新增：图片切换指示器 */}
                {product.images && product.images.length > 1 && (
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {product.images.map((_, index) => (
                      <div
                        key={index}
                        className={cn(
                          "w-1.5 h-1.5 rounded-full transition-all duration-200",
                          (currentImageIndexes[product.id] || 0) === index
                            ? "bg-white"
                            : "bg-white/50"
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;