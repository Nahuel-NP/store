import type { ProductWithImage } from "@/interfaces";
import { ProductCard } from "./ProductCard";

interface Props {
  products: ProductWithImage[];
}
export const ProductList = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
