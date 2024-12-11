import type { CartItem } from '@/interfaces';
import Cookies from 'js-cookie'


export class CartCookiesClient {
  static getCart(): CartItem[] {
    const cart = JSON.parse(Cookies.get('cart') ?? '[]')
    return cart
  }

  static addToCart(cartItem: CartItem): CartItem[] {
    const cart = CartCookiesClient.getCart();
    const itemInCart = cart.find(item => item.id === cartItem.id && item.size === cartItem.size);
    if (itemInCart) {
      itemInCart.quantity += cartItem.quantity;
    } else {
      cart.push(cartItem);
    }
    Cookies.set('cart', JSON.stringify(cart));
    return cart;
  }

  static removeFromCart(productId: string, size: string): CartItem[] {
    const cart = CartCookiesClient.getCart();
    const newCart = cart.filter(item => !(item.id === productId && item.size === size));
    Cookies.set('cart', JSON.stringify(newCart));
    return newCart;

  }
}