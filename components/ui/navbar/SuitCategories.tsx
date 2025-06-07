"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SuitCategory {
  id: string;
  name: string;
  image: string;
  description: string;
}

const SuitCategories: React.FC = () => {
  const suitCategories: SuitCategory[] = [
    {
      id: "daily",
      name: "日常",
      image: "/images/leoga/product/1产品页新品1.png",
      description: "日常休闲系列"
    },
    {
      id: "professional",
      name: "职业",
      image: "/images/leoga/product/13产品页上装3.PNG",
      description: "职业精英系列"
    },
    {
      id: "formal",
      name: "礼服",
      image: "/images/leoga/product/16产品页下装1.PNG",
      description: "正式礼服系列"
    },
    {
      id: "custom",
      name: "特别定制",
      image: "/images/leoga/product/21产品页配饰1.png",
      description: "专属定制系列"
    }
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-6">
        {suitCategories.map((category) => (
          <div
            key={category.id}
            className={cn(
              "group cursor-pointer transition-all duration-300 transform",
              "hover:scale-105 hover:shadow-lg"
            )}
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 25vw"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {category.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 底部提示 */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">
          点击查看更多套装系列
        </p>
      </div>
    </div>
  );
};

export default SuitCategories;