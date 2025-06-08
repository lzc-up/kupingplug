"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import ProductCarousel from "./ProductCarousel";
import SuitCategories from "./SuitCategories";
import CategoryDisplay from "./CategoryDisplay";

interface NavLinkItem {
  href: string;
  label: string;
  subLinks?: NavLinkItem[];
}

interface NavLinksProps {
  isTransparent: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ isTransparent }) => {
  const { t } = useTranslation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const productCategories = [
    { key: "newArrivals", category: "新品" },
    { key: "suits", category: "套装", isSpecial: true },
    { key: "tops", category: "上装" },
    { key: "bottoms", category: "下装" },
    { key: "accessories", category: "配饰" }
  ];

  const links: NavLinkItem[] = [
    { href: "/", label: t("nav.home") },
    {
      href: "/products",
      label: t("nav.products"),
      subLinks: productCategories.map(cat => ({
        href: `/products/${cat.key}`,
        label: t(`nav.productCategories.${cat.key}`)
      }))
    },
    { href: "/fabric", label: t("nav.fabric") },
    { href: "/customization", label: t("nav.customization") },
    { href: "/brand-story", label: t("nav.brandStory") },
    { href: "/contact-us", label: t("nav.contact") },
  ];

  // 添加关闭下拉菜单的方法
  const handleCloseDropdown = () => {
    setActiveDropdown(null);
    setSelectedCategory(null);
  };

  const handleMouseEnter = (href: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    if (href === "/products") {
      setActiveDropdown(href);
      // 默认显示第一个分类
      if (!selectedCategory) {
        setSelectedCategory(productCategories[0].category);
      }
    }
  };

  const handleMouseLeave = () => {
    // 添加延迟，给用户时间移动到下拉菜单
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setSelectedCategory(null);
    }, 150);
  };

  const handleDropdownEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
    setSelectedCategory(null);
  };

  // 新增：处理分类悬停事件
  const handleCategoryHover = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <ul className="flex items-start gap-9">
        {links.map((link) => {
          const isProductsActive = link.href === "/products" && activeDropdown === "/products";
          
          return (
            <li 
              key={link.href}
              className="relative"
              onMouseEnter={() => handleMouseEnter(link.href)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-all duration-200 px-3 py-2 rounded-md whitespace-nowrap",
                  isProductsActive ? "underline" : "hover:underline",
                  isTransparent 
                    ? "!text-white hover:!text-black active:!text-black" 
                    : "text-gray-700 hover:text-black active:text-black"
                )}
                style={isTransparent ? {
                  color: '#ffffff !important',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                } : {}}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* 二级导航下拉菜单 */}
      {activeDropdown === "/products" && (
        <div 
          className={cn(
            "absolute left-0 w-full bg-white shadow-lg border-t z-50",
            "transform transition-all duration-300 ease-out",
            "animate-in slide-in-from-top-2 fade-in-0"
          )}
          style={{ 
            top: '100%',
            left: 'calc(-50vw + 50%)',
            width: '100vw'
          }}
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleDropdownLeave}
        >
          <div className="max-w-[1440px] mx-auto px-8 py-6">
            {/* 二级导航栏 - 左对齐，改为悬停触发 */}
            <div className="flex gap-8 mb-6">
              {productCategories.map((category) => (
                <button
                  key={category.key}
                  onMouseEnter={() => handleCategoryHover(category.category)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap",
                    "transition-all duration-300 ease-out",
                    "transform hover:scale-105 hover:-translate-y-0.5",
                    selectedCategory === category.category
                      ? "bg-gray-900 text-white shadow-lg scale-105"
                      : "text-gray-700 hover:text-black hover:bg-gray-100 active:text-black"
                  )}
                >
                  {t(`nav.productCategories.${category.key}`)}
                </button>
              ))}
            </div>

            {/* 内容区域 - 添加滑动效果 */}
            {selectedCategory && (
              <div className={cn(
                "mt-4 transition-all duration-500 ease-out",
                "animate-in slide-in-from-left-4 fade-in-0"
              )}>
                <CategoryDisplay 
                  category={selectedCategory} 
                  onViewMore={handleCloseDropdown}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NavLinks;
