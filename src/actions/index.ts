import { loginUser, logout, registerUser } from './auth';
import { getProductsByPageAction } from './products/get-products-by-page.action';

export const server = {
  // actions
  getProductsByPageAction,
  // Auth
  loginUser,
  logout,
  registerUser,
};
