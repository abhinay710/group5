import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/service/cart.service';
import { Dessert } from '../shared/models/dessert';
import { CheckoutModalComponent } from '../checkout-modal/checkout-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  

  constructor(private cartService: CartService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  incrementItem(item: any): void {
    this.cartService.incrementCartItem(item);
  }

  decrementItem(item: any): void {
    this.cartService.decrementCartItem(item);
  }

  calculateTotalPrice(): number {
    return this.cartService.calculateTotalPrice();
  }

  checkout() {
    const modalRef = this.modalService.open(CheckoutModalComponent);
    modalRef.result.then(
      (result: any) => {
        console.log(result); 
      },
      (reason: any) => {
        console.log(`Modal dismissed with: ${reason}`);
      }
    );
  }

}
