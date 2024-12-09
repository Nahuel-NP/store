import type { ProductWithImage } from "@/interfaces";
import { useState } from "react";

interface Props {
  product: ProductWithImage;
}

export const ProductCard = ({ product }: Props) => {
  const images = product.images.split(",").map((img) => {
    return img.startsWith("http")
      ? img
      : `${import.meta.env.PUBLIC_URL}/images/products/${img}`;
  });

  const [currentImage, setCurrentImage] = useState(images[0]);
  return (
    <a href={`/products/${product.slug}`}>
      <img
        className="h-[350px] object-contain"
        src={currentImage}
        alt={product.title}
        onMouseEnter={() => setCurrentImage(images[1] ?? images[0])
        }
        onMouseLeave={() => setCurrentImage(images[0])}
      />
      <h4>{product.title}</h4>
      <p>${product.price}</p>
    </a>
  );
};
