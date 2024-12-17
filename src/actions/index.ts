import { loginUser, logout, registerUser } from './auth';
import { createUpdateProductAction } from './products/create-update-product.action';
import { getProductBySlugAction } from './products/get-product-by-slug.action';
import { getProductsByPageAction } from './products/get-products-by-page.action';

export const server = {
  // actions
  getProductsByPageAction,
  getProductBySlugAction,
  // Auth
  loginUser,
  logout,
  registerUser,
  //Product
  createUpdateProductAction
};
