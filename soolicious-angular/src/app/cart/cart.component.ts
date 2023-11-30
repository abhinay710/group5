import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/service/cart.service';
import { Dessert } from '../shared/models/dessert';
import { CheckoutModalComponent } from '../checkout-modal/checkout-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderItem } from '../shared/models/order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: OrderItem[] = [];

  constructor(private cartService: CartService, private modalService: NgbModal,
    private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  incrementItem(item: OrderItem): void {
    this.cartItems = this.cartService.incrementCartItem(item);
  }

  decrementItem(item: OrderItem): void {
    this.cartItems = this.cartService.decrementCartItem(item);
  }

  calculateTotalPrice(): number {
    return this.cartService.calculateTotalPrice();
  }

  checkout() {
    const modalRef = this.modalService.open(CheckoutModalComponent);
    modalRef.componentInstance.orderItems = [ ...this.cartService.getCartItems() ];
    modalRef.componentInstance.orderTotal = this.calculateTotalPrice();
    modalRef.result.then(
      (result: any) => {
        this.cartService.clearCart();
        this.router.navigate([`/orders`], { relativeTo: this.activatedRoute });
      },
      (reason: any) => {
        console.log(`Modal dismissed with: ${reason}`);
      }
    );
  }

}
