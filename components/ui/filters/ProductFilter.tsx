"use client";
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface ProductFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categoryLabels?: Record<string, string>;
  isSpecial?: boolean;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  categoryLabels,
  isSpecial = false
}) => {
  const { t } = useTranslation();

  const getCategoryLabel = (category: string) => {
    // 优先使用传入的 categoryLabels
    if (categoryLabels && categoryLabels[category]) {
      return categoryLabels[category];
    }
    
    // 回退到翻译键值
    if (category === 'all') {
      return t('nav.productCategories.all') || '全部';
    }
    
    // 尝试从翻译文件获取
    const translationKey = `nav.productCategories.${category}`;
    const translated = t(translationKey);
    
    // 如果翻译不存在，直接返回原始分类名
    return translated !== translationKey ? translated : category;
  };

  return (
    <div className="flex flex-wrap gap-3 mb-8 justify-center">
      {categories.map((category) => {
        const isSelected = selectedCategory === category;
        const label = getCategoryLabel(category);
        
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              px-6 py-3 rounded-full text-sm font-medium transition-all duration-200
              border-2 min-w-[80px] relative overflow-hidden
              ${
                isSelected
                  ? isSpecial
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-lg transform scale-105'
                    : 'bg-black text-white border-black shadow-md'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400 hover:bg-gray-50 hover:shadow-sm'
              }
              hover:transform hover:scale-105 active:scale-95
            `}
          >
            {/* 特殊分类的装饰效果 */}
            {isSelected && isSpecial && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 animate-pulse" />
            )}
            <span className="relative z-10">{label}</span>
          </button>
        );
      })}
    </div>
  );
};