import type { ProductWithImage } from "@/interfaces"

interface Props {
  product:ProductWithImage;
}

export const ProductCard = ({product}:Props) => {
  return (
    <div>{product.title}</div>
  )
}
