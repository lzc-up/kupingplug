import { ProductCard } from '@/components/ui/card/productCard';

interface ProductGridProps {
  products: any[];
  columns?: 2 | 3 | 4;
  variant?: 'default' | 'compact' | 'featured';
  onProductClick?: (productId: number) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  columns = 3,
  variant = 'default',
  onProductClick
}) => {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  return (
    <div className={`grid gap-6 ${gridCols[columns]}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          variant={variant}
          onClick={onProductClick}
        />
      ))}
    </div>
  );
};

export default ProductGrid;