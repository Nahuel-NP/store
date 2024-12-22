

import { ImageUpload } from "@/utils/image-upload";
import { defineAction } from "astro:actions"
import { db, eq, ProductImage } from "astro:db";
import { z } from "astro:schema"
import { getSession } from "auth-astro/server";

export const DeleteProductImageAction = defineAction({
  accept: 'json',
  input: z.string(),
  handler: async (imageId, { request }) => {

    const session = await getSession(request)
    const user = session?.user;
    if (!user) {
      throw new Error('Unauthorized')
    }
    const [productImage] = await db.select().from(ProductImage).where(
      eq(ProductImage.id, imageId)
    )
    if (!productImage) {
      throw new Error('Image not found')
    }

    const deleted = await db.delete(ProductImage).where(
      eq(ProductImage.id, productImage.id)
    )

    if (productImage.image.includes('http')) {
      await ImageUpload.delete(productImage.image)
    }

    return { ok: true };
  }
})