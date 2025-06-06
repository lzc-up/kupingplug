'use client';

import Link from "next/link";
import Image from "next/image";
import SectionLayout from "@/layouts/sectionLayout";
import Heading from "@/ui/head";
import Text from "@/ui/text";
import Button from "@/ui/button";
import { ArrowRightIcon } from "@/ui/assets/svg";

export default function CustomizationSection() {
  return (
    <SectionLayout bg="bg-white">
      <div className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 左侧文字内容 */}
            <div className="space-y-6">
              <Heading
                as="h2"
                intent="base-section"
                className="text-left"
              >
                Customization
              </Heading>
              <Text className="text-gray-600 text-lg leading-relaxed">
                Experience the art of bespoke tailoring with our premium customization service. 
                From selecting the finest fabrics to perfecting every detail, create a suit that 
                reflects your unique style and personality. Our master craftsmen work with you 
                to design garments that fit perfectly and express your individual taste.
              </Text>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <Text className="text-gray-700">Personal consultation with master tailors</Text>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <Text className="text-gray-700">Premium fabric selection</Text>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <Text className="text-gray-700">Perfect fit guarantee</Text>
                </div>
              </div>
              <Link href="/shop">
                <Button 
                  variant="primary" 
                  fontSize="lg"
                  className="group inline-flex items-center space-x-2 mt-6"
                >
                  <span>Explore Customization</span>
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            {/* 右侧图片 */}
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/leoga/17主界面定制背景图.png"
                  alt="Custom Tailoring"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              {/* 装饰元素 */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-600 rounded-full opacity-10"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gray-800 rounded-full opacity-10"></div>
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}