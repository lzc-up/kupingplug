import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Story - Kupingplug",
  description: "Discover the story behind Kupingplug brand",
};

export default function BrandStoryPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
            品牌故事
          </h1>
          <div className="text-center text-gray-600">
            <p className="text-lg">
              内容即将更新，敬请期待...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}