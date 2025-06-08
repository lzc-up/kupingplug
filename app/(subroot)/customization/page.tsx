'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import PageLayout from '@/layouts/pageLayout'; // 假设您有这样的布局组件

const CustomizationPage = () => {
  const { t } = useTranslation();

  return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">{t('customizationPage.header')}</h1>
        <p>{t('customizationPage.content')}</p>
        {/* 在这里添加定制页面的具体内容 */}
      </div>
  );
};

export default CustomizationPage;