

import { defineAction } from "astro:actions"
import { db, eq, Product, ProductImage } from "astro:db";
import { z } from "astro:schema"

export const getProductBySlugAction = defineAction({
  accept: 'json',
  input: z.string(),
  handler: async (slug) => {
    const [product] = await db.select().from(Product).where(eq(Product.slug, slug));
    if (!product) {
      throw new Error('Product not found');
    }
    const images = await db.select().from(ProductImage).where(eq(ProductImage.productID, product.id));


    return { product: product, images: images.map(img => img.image) };
  }
})