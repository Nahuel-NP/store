

import type { CartItem } from "@/interfaces";
import { defineAction } from "astro:actions"
import { db, eq, inArray, Product, ProductImage } from "astro:db";


export const LoadProductFromCartAction = defineAction({
  accept: 'json',
  // input: z.string(),
  handler: async (_, { cookies }) => {

    const cart = JSON.parse(cookies.get('cart')?.value ?? '[]') as CartItem[];

    if (cart.length === 0) {
      return [];
    }
    const ids = cart.map(item => item.id);

    const dbProducts = await db.select().from(Product).innerJoin(ProductImage, eq(Product.id, ProductImage.productID)).where(
      inArray(Product.id, ids)
    )

    return cart.map(item => {
      const dbProduct = dbProducts.find(p => p.Product.id === item.id)
      if (!dbProduct) {
        throw new Error(`Product with id ${item.id} not found`);
      }
      const { title, price, slug } = dbProduct.Product;
      const image = dbProduct.ProductImage.image;

      return {
        id: item.id,
        title,
        price,
        size: item.size,
        slug,
        image: image.startsWith('http') ? image : `${import.meta.env.PUBLIC_URL}/images/products/${image}`,
        quantity: item.quantity
      }
    })
  }
})