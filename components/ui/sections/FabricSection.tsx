'use client';

import Link from "next/link";
import Image from "next/image";
import SectionLayout from "@/layouts/sectionLayout";
import Heading from "@/ui/head";
import Text from "@/ui/text";
import Button from "@/ui/button";
import { ArrowRightIcon } from "@/ui/assets/svg";

export default function FabricSection() {
  return (
    <SectionLayout bg="bg-gray-50">
      <div className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 左侧图片 */}
            <div className="relative order-2 lg:order-1">
              <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/leoga/18主界面面料背景图.png"
                  alt="Premium Fabrics"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              {/* 装饰元素 */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-500 rounded-full opacity-10"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gray-800 rounded-full opacity-10"></div>
            </div>
            
            {/* 右侧文字内容 */}
            <div className="space-y-6 order-1 lg:order-2">
              <Heading
                as="h2"
                intent="base-section"
                className="text-left"
              >
                Premium Fabrics
              </Heading>
              <Text className="text-gray-600 text-lg leading-relaxed">
                Discover our curated collection of the world's finest fabrics. From luxurious 
                Italian wools to innovative performance blends, each material is carefully 
                selected for its quality, durability, and elegance. Our fabric library features 
                exclusive patterns and textures that elevate your wardrobe to new heights.
              </Text>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <Text className="text-gray-700">Italian and British luxury fabrics</Text>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <Text className="text-gray-700">Sustainable and eco-friendly options</Text>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <Text className="text-gray-700">Exclusive patterns and textures</Text>
                </div>
              </div>
              <Link href="/shop">
                <Button 
                  variant="primary" 
                  fontSize="lg"
                  className="group inline-flex items-center space-x-2 mt-6"
                >
                  <span>Explore Fabrics</span>
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}