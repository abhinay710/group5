import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dessert } from 'src/app/shared/models/dessert';
import { DessertService } from 'src/app/shared/service/dessert.service';
import { DessertDialogComponent } from '../dessert-dialog/dessert-dialog.component';
import { CartService } from 'src/app/shared/service/cart.service';
import { OrderItem } from 'src/app/shared/models/order';
import { LoginService } from 'src/app/shared/service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  desserts: Dessert[] = [];
  filteredDesserts?: Dessert[] = [];
  constructor(private dessertService: DessertService, private modalService: NgbModal, private cartService: CartService,
        private loginService: LoginService, private router: Router, private activatedRoute: ActivatedRoute, 
        private toastr: ToastrService) { }
  
  ngOnInit(): void {
    if (this.loginService.isCustomerLoggedIn()) {
      this.getDesserts();
    } else {
      this.router.navigate([`/orders`], { relativeTo: this.activatedRoute });
    }
  }

  getDesserts() {
    this.dessertService.getDesserts().subscribe({
      next: ((resp: Dessert[]) => {
        this.desserts = resp;
        this.collectionSize = resp.length;
        this.filterDesserts();
      }),
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      }
    });
  }

  filterDesserts() {
    this.filteredDesserts = this.desserts.map((dessert, i) => ({ id: i + 1, ...dessert })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }

  addToCart(dessert: Dessert) {
    this.cartService.addToCart(dessert);
    this.toastr.success('Item Added to cart', 'Success');
  }
  getDessertImage(dessert: Dessert): string {
    // Placeholder URLs, replace with actual URLs
    const dessertImages: { [key: string]: string } = {
      'ice cream': 'https://handletheheat.com/wp-content/uploads/2021/06/homemade-vanilla-ice-cream.jpg',
      'apple pie': 'https://www.inspiredtaste.net/wp-content/uploads/2022/11/Apple-Pie-Recipe-Video.jpg',
      'orange pie': 'https://www.inspiredtaste.net/wp-content/uploads/2022/11/Apple-Pie-Recipe-Video.jpg',
      'chocolate cookies': 'https://handletheheat.com/wp-content/uploads/2020/10/BAKERY-STYLE-CHOCOLATE-CHIP-COOKIES-9-637x637-1.jpg',
      'pumpkin pie': 'https://www.inspiredtaste.net/wp-content/uploads/2022/11/Apple-Pie-Recipe-Video.jpg',
      'macarons': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXSFvnE-EHI06wqh-Wqe5NFJkIDmowHEN2Eg&usqp=CAU',
      'vanilla ice cream': 'https://handletheheat.com/wp-content/uploads/2021/06/homemade-vanilla-ice-cream.jpg',
      'pistachio ice cream': 'https://cdn.foodaciously.com/static/recipes/2e4920d8-43ea-4efe-9e67-f0a4caa6b2ef/pistachio-nice-cream-526180ae01e2204241dbf2320f0f2511-2560-q60.jpg',
      'chocolate macarons': 'https://chelsweets.com/wp-content/uploads/2022/04/chocolate-macarons-stacked-v3-819x1024.jpg.webp',
      // 'chocolate cake': 'URL_FOR_CHOCOLATE_CAKE_IMAGE',
      // 'mango ice cream': 'URL_FOR_MANGO_ICE_CREAM_IMAGE',
      // 'chocolate cupcakes': 'URL_FOR_CHOCOLATE_CUPCAKES_IMAGE',
      // 'brownies': 'URL_FOR_BROWNIES_IMAGE',
      // 'strawberry cake': 'URL_FOR_STRAWBERRY_CAKE_IMAGE',
      // 'vanilla cupcakes': 'URL_FOR_VANILLA_CUPCAKES_IMAGE',
      // 'gelato cupcakes': 'URL_FOR_GELATO_CUPCAKES_IMAGE',
      // 'pie': 'https://www.inspiredtaste.net/wp-content/uploads/2022/11/Apple-Pie-Recipe-Video.jpg',
      // 'croissant': 'URL_FOR_CROISSANT_IMAGE',
      // 'strudel': 'URL_FOR_STRUDEL_IMAGE',
      // 'chocolate dark chocolate cake': 'URL_FOR_CHOCOLATE_DARK_CHOCOLATE_CAKE_IMAGE',
      // 'cookies': 'URL_FOR_COOKIES_IMAGE',
      // Add more dessert-image mappings
    };
  
    const dessertName = dessert.name?.toLowerCase() || 'default';
  
    return dessertImages[dessertName] || 'https://images.immediate.co.uk/production/volatile/sites/30/2022/05/Chocolate-sandwich-cupcakes-4b30ada.jpg?quality=90&resize=556,505';
  }
  

}
