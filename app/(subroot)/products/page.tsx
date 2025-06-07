"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
// 移除 PageLayout 导入
// import PageLayout from '@/layouts/pageLayout';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { ProductFilter } from '@/components/ui/filters/ProductFilter';

interface CategoryItem {
  id: string;
  name: string;
  image: string;
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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [highlightedItem, setHighlightedItem] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [categoryMapping, setCategoryMapping] = useState<Record<string, string>>({});

  // 所有可用的分类
  const categories = ['all', '新品', '套装', '上装', '下装', '配饰'];

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    // 从URL参数获取分类和高亮项目
    const categoryParam = searchParams.get('category');
    const itemParam = searchParams.get('item');
    
    if (categoryParam) {
      // 根据categoryKey找到对应的中文分类名
      const categoryName = Object.keys(categoryMapping).find(
        key => categoryMapping[key] === categoryParam
      ) || 'all';
      setSelectedCategory(categoryName);
    }
    
    if (itemParam) {
      setHighlightedItem(itemParam);
      // 3秒后取消高亮
      setTimeout(() => setHighlightedItem(null), 3000);
    }
  }, [searchParams, categoryMapping]);

  useEffect(() => {
    // 根据选中的分类过滤产品
    if (selectedCategory === 'all') {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(product => {
        // 根据产品的来源分类进行筛选
        return product.categoryKey === categoryMapping[selectedCategory];
      });
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, allProducts, categoryMapping]);

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

  const handleProductClick = (product: CategoryItem) => {
    // 处理产品点击事件
    console.log('Product clicked:', product);
    // 这里可以添加跳转到产品详情页的逻辑
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

      {/* 分类筛选器 */}
      <ProductFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* 产品网格 */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">暂无产品</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={cn(
                "group cursor-pointer transition-all duration-300 transform",
                "hover:scale-105 hover:shadow-xl",
                "bg-white rounded-lg overflow-hidden shadow-md border",
                highlightedItem === product.id && "ring-4 ring-blue-500 ring-opacity-50 shadow-2xl scale-105"
              )}
              onClick={() => handleProductClick(product)}
            >
              {/* 产品图片 */}
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image
                  src={product.image}
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
              </div>
              
              {/* 产品信息 */}
              <div className="p-4">
                {/* <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {product.description}
                </p> */}
                
                {/* 分类标签 */}
                {/* <div className="flex items-center justify-between">
                  <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    {Object.keys(categoryMapping).find(key => categoryMapping[key] === product.categoryKey) || '其他'}
                  </span>
                  <span className="text-blue-600 text-sm font-medium group-hover:underline">
                    查看详情 →
                  </span>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;