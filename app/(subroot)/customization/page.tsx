'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import PageLayout from '@/layouts/pageLayout';

const CustomizationPage = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* 固定图片展示区域 - 全屏覆盖 */}
      <div className="relative w-full h-[800px] -mt-20 mb-8">
        <Link href="https://www.baidu.com" target="_blank" className="block w-full h-full">
          <Image
            src="/images/leoga/custom/定制页主图.png"
            fill
            className="object-cover"
            alt="Customization Background"
            priority
          />
        </Link>
        {/* 可选的覆盖层文字 */}
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-2">定制服务</h2>
          </div>
        </div>
      </div>

      {/* 品牌理念文字内容 */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 leading-relaxed">
            裁衣如裁心，敬人亦敬物
          </h2>
          
          <div className="space-y-6 text-lg md:text-xl text-gray-600 leading-relaxed">
            <p>
              LEOGA专注于为每一位客户量身定制，尊重个性，也尊重每一寸面料的价值。
            </p>
            
            <p>
              我们始终坚持适量而制，只为真正被需要的那一套西装。
            </p>
            
            <p>
              在LEOGA，我们不仅在打造合身的西装，更是在践行可持续、讲责任的制衣之道。
            </p>
          </div>
        </div>
      </div>

      {/* 图文交替展示区域 */}
      <div className="container mx-auto px-4 py-16">
        {/* 第1个：左图右文 */}
        <div className="flex flex-col lg:flex-row items-center mb-20">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
            <Image
              src="/images/leoga/custom/图1.png"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
              alt="定制服务图1"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">聆心之约｜定制之始，源于倾听</h3>
            <div className="text-lg text-gray-600 leading-relaxed space-y-4">
              <p>
                在正式开始定制前，我们将与您深入沟通，了解您的穿着场景（如商务、婚礼、休闲等）、个人喜好与风格取向。
              </p>
              <p>
                从剪裁风格到穿着习惯，我们会细致聆听，确保每一步都以您的需求为出发点，量身打造理想中的一套西装。
              </p>
            </div>
          </div>
        </div>

        {/* 第2个：左文右图 */}
        <div className="flex flex-col lg:flex-row-reverse items-center mb-20">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pl-8">
            <Image
              src="/images/leoga/custom/图2.png"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
              alt="定制服务图2"
            />
          </div>
          <div className="lg:w-1/2 lg:pr-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">甄选之艺｜千帛万纹，只为一选</h3>
            <div className="text-lg text-gray-600 leading-relaxed space-y-4">
              <p>
                结合穿着用途与季节，我们将为您从上百种面料中筛选出最合适的几款。
              </p>
              <p>
                无论是追求挺括有型的羊毛，还是注重舒适透气的混纺面料，我们都将为您提供专业建议，让您安心选择、满意落定。
              </p>
            </div>
          </div>
        </div>

        {/* 第3个：左图右文 */}
        <div className="flex flex-col lg:flex-row items-center mb-20">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
            <Image
              src="/images/leoga/custom/图3.png"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
              alt="定制服务图3"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">细节之美｜一扣一线，皆为风骨</h3>
            <div className="text-lg text-gray-600 leading-relaxed space-y-4">
              <p>
                定制西装的魅力，不仅在于合身，更在于细节的彰显。
              </p>
              <p>
                我们会与您一同挑选内里、纽扣、缝线颜色等设计元素，并根据您的喜好提出搭配建议，赋予整套西装独一无二的个性与风格。
              </p>
            </div>
          </div>
        </div>

        {/* 第4个：左文右图 */}
        <div className="flex flex-col lg:flex-row-reverse items-center mb-20">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pl-8">
            <Image
              src="/images/leoga/custom/图4.png"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
              alt="定制服务图4"
            />
          </div>
          <div className="lg:w-1/2 lg:pr-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">量体之精｜寸身如画，毫厘不差</h3>
            <div className="text-lg text-gray-600 leading-relaxed space-y-4">
              <p>
                每一位客户的体型都是独特的。我们不仅测量基本尺寸，还会观察姿态、体态特征，并做细致的补正与调整。
              </p>
              <p>
                从肩宽到袖长，每一寸尺寸都将精准把握，只为呈现最契合您的那一份剪裁之美。
              </p>
            </div>
          </div>
        </div>

        {/* 第5个：左图右文 */}
        <div className="flex flex-col lg:flex-row items-center mb-20">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
            <Image
              src="/images/leoga/custom/图5.png"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
              alt="定制服务图5"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">成衣之礼｜试于一身，悦于一心</h3>
            <div className="text-lg text-gray-600 leading-relaxed space-y-4">
              <p>
                西装制作完成后，欢迎您前来试穿，我们将与您一同确认成品的合身度与穿着体验。
              </p>
              <p>
                如有需要，我们也可提供微调服务，直到您满意为止。因为在LEOGA，我们相信，真正的完成，是您穿上那一刻的自信与从容。
              </p>
            </div>
          </div>
        </div>

        {/* 第6个：左文右图 */}
        <div className="flex flex-col lg:flex-row-reverse items-center mb-20">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pl-8">
            <Image
              src="/images/leoga/custom/图6.jpg"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
              alt="定制服务图6"
            />
          </div>
          <div className="lg:w-1/2 lg:pr-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">匠履随行｜贴身之物，步步皆心</h3>
            <div className="text-lg text-gray-600 leading-relaxed space-y-4">
              <p>
                LEOGA承接皮鞋、皮带、名片夹等男士皮具的全手工定制服务。我们根据您的使用场景与习惯，量脚裁型、择皮配色，从皮面、缝线到五金细节，皆可按需而设。
              </p>
              <p>
                定制鞋履结合亚洲足型研究，穿着合脚、久走不累，皮具亦随时间养出独特光泽。每一件贴身之物，都将成为陪伴您步步从容的风格之选。
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomizationPage;