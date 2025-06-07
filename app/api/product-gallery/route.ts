import productGallery from "@/data/productGallery.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');
  
  let filteredProducts = productGallery;
  
  // 按分类筛选
  if (category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // 按推荐状态筛选
  if (featured !== null) {
    const isFeatured = featured === 'true';
    filteredProducts = filteredProducts.filter(product => 
      product.featured === isFeatured
    );
  }
  
  return Response.json(filteredProducts);
}