

import type { ProductWithImage } from "@/interfaces";
import { defineAction } from "astro:actions"
import { count, db, eq, Product, ProductImage, sql } from "astro:db";
import { z } from "astro:schema"

export const getProductsByPageAction = defineAction({
  accept: 'json',
  input: z.object({
    page: z.number().default(1),
    limit: z.number().default(12)
  }),
  handler: async ({ page, limit }) => {

    page = page <= 0 ? 1 : page;
    const [totalRecords] = await db.select({ count: count() }).from(Product);
    const totalPages = Math.ceil(totalRecords.count / limit);

    if (page > totalPages) {

      return {
        products: [],
        totalPages,
        currentPage: page,
        totalRecords: totalRecords.count
      }
    }
    // const products = await db.select().from(Product).innerJoin(ProductImage,eq(Product.id,ProductImage.productID)).limit(limit).offset((page - 1) * limit);
    //raw querie
    const productsQuery = sql.raw(`select a.*,
( select GROUP_CONCAT(image,',') from 
	( select * from ProductImage where productId = a.id limit 2 )
 ) as images
from Product a
LIMIT ${limit} OFFSET ${page - 1 * limit};`)

    const { rows } = await db.run(productsQuery);

    return {
      products: rows as unknown as ProductWithImage,
      totalPages,
      currentPage: page,
      totalRecords: totalRecords.count
    };
  }
})