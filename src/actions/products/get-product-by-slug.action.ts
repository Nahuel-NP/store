

import { defineAction } from "astro:actions"
import { db, eq, Product, ProductImage } from "astro:db";
import { z } from "astro:schema"

const newProduct = {
  id: '',
  description: 'Nueva descripción',
  gender: 'men',
  price: 12,
  sizes: 'M',
  slug: 'nuevo-producto',
  stock: 4,
  tags: 'shirt,men',
  title: 'new product',
  type: 'shirts',
}

export const getProductBySlugAction = defineAction({
  accept: 'json',
  input: z.string(),
  handler: async (slug) => {

    if (slug === 'new') {
      return { product: newProduct, images: [] };
    }

    const [product] = await db.select().from(Product).where(eq(Product.slug, slug));
    if (!product) {
      throw new Error('Product not found');
    }
    const images = await db.select().from(ProductImage).where(eq(ProductImage.productID, product.id));


    return { product: product, images };
  }
})