"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductCarouselProps {
  category: string;
}

interface ProductItem {
  id: number;
  image: {
    src: string;
    alt: string;
  };
  category: string;
  name: string;
  description: string;
  featured: boolean;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ category }) => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // 获取产品数据
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product-gallery');
        const allProducts: ProductItem[] = await response.json();
        
        let filteredProducts: ProductItem[] = [];
        
        if (category === 'featured') {
          filteredProducts = allProducts.filter(product => product.featured);
        } else if (category === 'all') {
          filteredProducts = allProducts;
        } else {
          filteredProducts = allProducts.filter(product => product.category === category);
        }
        
        setProducts(filteredProducts);
        setCurrentIndex(0);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    if (products.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(1, products.length - 4));
    }, 3000);

    return () => clearInterval(timer);
  }, [products.length]);

  if (products.length === 0) {
    return (
      <div className="w-full h-48 flex items-center justify-center text-gray-500">
        暂无产品数据
      </div>
    );
  }

  // 显示5个产品
  const visibleProducts = [];
  for (let i = 0; i < Math.min(5, products.length); i++) {
    const index = (currentIndex + i) % products.length;
    visibleProducts.push(products[index]);
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-5 gap-4">
        {visibleProducts.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className={cn(
              "group cursor-pointer transition-all duration-300 transform",
              "hover:scale-105 hover:shadow-lg"
            )}
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={product.image.src}
                  alt={product.image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 20vw, 20vw"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 指示器 */}
      {products.length > 5 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: Math.max(1, products.length - 4) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                index === currentIndex ? "bg-gray-900" : "bg-gray-300"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;