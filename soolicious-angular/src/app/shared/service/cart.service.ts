import { Injectable } from '@angular/core';
import { Dessert } from '../models/dessert';
import { Order, OrderItem } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  getCartItems(): OrderItem[] {
    return JSON.parse(localStorage.getItem('cartItems')!);
  }

  setCartItems(cartItems: OrderItem[]) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  addToCart(item: Dessert): void {
    let cartItems = this.getCartItems() || [];
    const existingItem = cartItems.find((cartItem) => cartItem?.dessert?.id === item.id);

    if (existingItem) {
      existingItem.quantityOrdered!++;
    } else {
      cartItems.push({ dessert: item, quantityOrdered: 1, price: item.price });
    }

    this.setCartItems(cartItems);
  }

  removeFromCart(item: OrderItem): void {
    let cartItems = this.getCartItems() || [];
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem?.dessert?.id === item?.dessert?.id);

    if (existingItemIndex !== -1) {
      const existingItem = cartItems[existingItemIndex];
      if (existingItem.quantityOrdered! > 1) {
        existingItem.quantityOrdered!--;
      } else {
        cartItems.splice(existingItemIndex, 1);
      }
    }

    this.setCartItems(cartItems);
  }

  incrementCartItem(item: OrderItem): void {
    let cartItems = this.getCartItems() || [];
    const existingItem = cartItems.find((cartItem) => cartItem.dessert?.id === item?.dessert?.id);
    if (existingItem) {
      existingItem.quantityOrdered!++;
    }
  }

  decrementCartItem(item: OrderItem): void {
    let cartItems = this.getCartItems() || [];
    const existingItem = cartItems.find((cartItem) => cartItem.dessert?.id === item?.dessert?.id);
    if (existingItem && existingItem.quantityOrdered! > 1) {
      existingItem.quantityOrdered!--;
    } else {
      this.removeFromCart(item);
    }
  }

  calculateTotalPrice(): number {
    let cartItems = this.getCartItems() || [];

    return cartItems.reduce((total, item) => total + item.price! * item.quantityOrdered!, 0);
  }

  clearCart(): void {
    localStorage.setItem('cartItems', JSON.stringify([]));
  }
}
