"use client";

// package
import React from "react";
import { default as NextImage, ImageProps as NextImageProps } from "next/image";
import { VariantProps, cva } from "class-variance-authority";

// ui
import ButtonPrimitive, { ButtonProps } from "@/ui/button";
import Text, { TextProps } from "@/ui/text";
import { StarIcon, WishlistIcon } from "@/ui/assets/svg";

// lib
import { cn, formatCurrency, formatRating } from "@/lib/utils";

// hooks
import {
  ProductCardProvider,
  useProductCardContext,
} from "@/hooks/productCardContext";
// 移除重复的 Image 导入
import { useTranslation } from '@/hooks/useTranslation';

export type ProductDataProps = {
  data: {
    id: number;
    image: {
      src: string;
      alt: string;
    };
    name: string;
    rating: number;
    description: string;
  };
};

interface RootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ProductDataProps {}

const Root: React.FC<RootProps> = ({ data, className, children, ...props }) => {
  return (
    <ProductCardProvider data={data}>
      <div className={cn("grid grid-cols-1 gap-3", className)} {...props}>
        {children}
      </div>
    </ProductCardProvider>
  );
};

type ThumbnailProps = React.PropsWithChildren<{ className?: string }>;

const Thumbnail: React.FC<ThumbnailProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "group relative flex h-[500px] w-full flex-col justify-between overflow-hidden bg-[#F3F5F7] p-3.5",
        className,
      )}
    >
      {children}
    </div>
  );
};

const ThumbnailBadge: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="z-10 flex items-start justify-between">{children}</div>
  );
};

type BadgeVariants = VariantProps<typeof badgeVariants>;

const badgeVariants = cva(
  "w-fit rounded px-3.5 py-1 font-inter text-base font-bold uppercase",
  {
    variants: {
      intent: {
        default: "bg-white text-black",
        discount: "bg-[#38CB89] text-[#FEFEFE]",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  },
);

interface BadgeProps
  extends BadgeVariants,
    React.HTMLAttributes<HTMLDivElement> {}

const Badge: React.FC<BadgeProps> = ({
  intent,
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn(badgeVariants({ intent, className }))} {...props}>
      {children}
    </div>
  );
};

type WishlistButtonProps = React.HTMLAttributes<HTMLButtonElement>;

const WishlistButton: React.FC<WishlistButtonProps> = ({
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "shadow-[rgba(15, 15, 15, 0.12)] flex h-8 w-8 items-center justify-center rounded-full bg-white opacity-0 shadow-md transition-opacity duration-100 ease-out group-hover:opacity-100",
        className,
      )}
      {...props}
    >
      <WishlistIcon className="h-5 w-5" />
    </button>
  );
};

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <ButtonPrimitive {...props}>{children}</ButtonPrimitive>;
};

type ImageProps = Omit<NextImageProps, "src" | "alt">;

const Image: React.FC<ImageProps> = ({
  width = 231,
  height = 308,
  className,
  ...props
}) => {
  const { image } = useProductCardContext();

  return (
    <NextImage
      src={image.src}
      width={width}
      height={height}
      alt={image.alt}
      className={cn(
        "absolute left-0 top-0 z-0 h-full w-full object-cover",
        className,
      )}
      {...props}
    />
  );
};

const Content: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("space-y-1", className)} {...props}>
      {children}
    </div>
  );
};

type RatingsProps = {
  className?: string;
};

const Ratings: React.FC<RatingsProps> = ({ className }) => {
  const { rating } = useProductCardContext();

  return (
    <div className="flex gap-0.5">
      {formatRating(rating).map((rating) => (
        <StarIcon key={rating} className={cn("h-4 w-4", className)} />
      ))}
    </div>
  );
};

type NameProps = Omit<TextProps, "children">;

const Name: React.FC<NameProps> = ({ className, ...props }) => {
  const { name } = useProductCardContext();

  return (
    <Text
      weight={600}
      color="black/800"
      className={cn("line-clamp-1", className)}
      {...props}
    >
      {name}
    </Text>
  );
};

type PriceProps = Omit<TextProps, "children">;

// const Price: React.FC<PriceProps> = ({ className, ...props }) => {
//   const { price } = useProductCardContext();

//   return (
//     <Text
//       size="sm"
//       weight={600}
//       color="black/800"
//       className={cn("line-clamp-1", className)}
//       {...props}
//     >
//       {formatCurrency(price)}
//     </Text>
//   );
// };

type DescriptionProps = Omit<TextProps, "children">;

const Description: React.FC<DescriptionProps> = ({ className, ...props }) => {
  const { description } = useProductCardContext();

  return (
    <Text
      size="xs"
      weight={400}
      color="gray"
      className={cn(className)}
      {...props}
    >
      {description}
    </Text>
  );
};

export {
  Root,
  Thumbnail,
  ThumbnailBadge,
  Badge,
  WishlistButton,
  Image,
  Button,
  Content,
  Ratings,
  Name,
  Description,
};


interface ProductCardProps {
  product: {
    id: number;
    image: { src: string; alt: string };
    category: string;
    name: string;
    description: string;
    nameKey: string;
    descriptionKey: string;
    featured: boolean;
  };
  variant?: 'default' | 'compact' | 'featured';
  onClick?: (productId: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  variant = 'default',
  onClick 
}) => {
  const { t } = useTranslation();
  
  return (
    <div 
      className={`group cursor-pointer transition-all duration-300 ${
        variant === 'featured' ? 'transform hover:scale-105' : 'hover:shadow-lg'
      }`}
      onClick={() => onClick?.(product.id)}
    >
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                <NextImage
                  src={product.image.src}
                  alt={product.image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
        {product.featured && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
            {t('common.featured')}
          </div>
        )}
      </div>
      
      <div className="mt-4 space-y-2">
        <h3 className="font-medium text-gray-900">
          {t(`products.names.${product.nameKey}`)}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {t(`products.descriptions.${product.descriptionKey}`)}
        </p>
        <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
          {product.category}
        </span>
      </div>
    </div>
  );
};
export default ProductCard;