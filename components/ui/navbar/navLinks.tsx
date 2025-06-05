"use client";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

interface NavLinksProps {
  isTransparent: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ isTransparent }) => {
  const { t } = useTranslation();

  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/shop", label: t("nav.shop") },
    { href: "/contact-us", label: t("nav.contact") },
  ];

  return (
    <ul className="flex items-center justify-center gap-8">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={cn(
              "text-sm font-medium transition-all duration-200 px-3 py-2 rounded-md hover:underline",
              isTransparent 
                ? "!text-white hover:!text-black" 
                : "text-gray-700 hover:text-black"
            )}
            style={isTransparent ? {
              color: '#ffffff !important',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            } : {}}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
