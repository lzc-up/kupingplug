"use client";
// package
import { useEffect, useState } from "react";

// ui
import Logo from "@/ui/assets/logo";
import {
  HamburgerMenu,
} from "@/ui/assets/svg";
import NavLinks from "@/ui/navbar/navLinks";
import NavMobile from "@/ui/navbar/navMobile";
import PromoSection from "@/ui/promo";
import LanguageSwitcher from "@/ui/language-switcher";
import HeroCarousel from "@/ui/slider/heroCarousel";

// hooks
import { useRootContext } from "@/hooks/rootContext";

// lib
import { cn } from "@/lib/utils";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const isRootPage = useRootContext();
  const [open, setOpen] = useState<boolean>(false);
  const [scroll, setScroll] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleOnScroll = () => {
    window.scrollY >= 32 ? setScroll(true) : setScroll(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll);

    return () => window.removeEventListener("scroll", handleOnScroll);
  }, []);

  // 背景透明状态（用于背景色）
  const isBackgroundTransparent = isRootPage && !scroll && !isHovered;
  // 文字透明状态（用于文字颜色，只考虑页面和滚动状态）
  const isTextTransparent = isRootPage && !scroll;

  console.log('Debug:', { isRootPage, scroll, isTextTransparent }); // 临时调试
  return (
    <>
      {!open && <PromoSection />}
      <div className="relative">
        {/* 背景轮播图 - 仅在首页显示 */}
        {isRootPage && (
          <div className="absolute inset-0 w-full h-[600px] z-0">
            <HeroCarousel />
          </div>
        )}
        
        {/* 导航栏 */}
        <div
          className={cn(
            "sticky top-0 z-[100] transition-colors duration-300 relative",
            isBackgroundTransparent ? "bg-transparent" : "bg-white shadow"
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-4 lg:justify-normal">
            <div className="flex items-center gap-1 lg:basis-1/4">
              <button className="lg:hidden" onClick={() => setOpen(true)}>
                <HamburgerMenu className={cn(
                  "w-6 transition-colors duration-200",
                  isTextTransparent ? "text-white" : "text-gray-800"
                )} />
              </button>

              <Logo />
            </div>

            <div className="hidden basis-2/4 lg:block">
              <NavLinks isTransparent={isTextTransparent} />
            </div>

            <div className="flex items-center gap-1 lg:basis-1/4 lg:justify-end lg:gap-4">
              <LanguageSwitcher 
                className={cn(
                  "text-sm transition-colors duration-200",
                  isTextTransparent 
                    ? "text-white hover:text-black" 
                    : "text-gray-600 hover:text-black"
                )}
              />
            </div>

            {/* mobile navbar  */}
            <NavMobile open={open} onClick={() => setOpen(false)} />
          </nav>
        </div>
        
        {/* 占位空间，确保内容不被背景图遮挡 */}
        {isRootPage && <div className="h-[500px]"></div>}
      </div>
    </>
  );
};

export default Navbar;
