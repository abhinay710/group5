import { Injectable } from '@angular/core';
import { Dessert } from '../models/dessert';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: any[] = [];

  getCartItems(): any[] {
    return this.cartItems;
  }

  addToCart(item: any): void {
    const existingItem = this.cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }
  }

  removeFromCart(item: any): void {
    const existingItemIndex = this.cartItems.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      const existingItem = this.cartItems[existingItemIndex];
      if (existingItem.quantity > 1) {
        existingItem.quantity--;
      } else {
        this.cartItems.splice(existingItemIndex, 1);
      }
    }
  }

  incrementCartItem(item: any): void {
    const existingItem = this.cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity++;
    }
  }

  decrementCartItem(item: any): void {
    const existingItem = this.cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity--;
    } else {
      this.removeFromCart(item);
    }
  }

  calculateTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  clearCart(): void {
    this.cartItems = [];
  }
}
