import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public cart: Cart = {
    items: [
      {
        product: 'https://via.placeholder.com/150',
        name: 'Sneakers',
        price: 150,
        quantity: 1,
        id: 1,
      },
      {
        product: 'https://via.placeholder.com/150',
        name: 'Sneakers',
        price: 150,
        quantity: 3,
        id: 2,
      },
    ],
  };

  public dataSource: Array<CartItem> = [];
  public displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];

  public constructor(
    private cartService: CartService,
    private http: HttpClient,
  ) {}

  public ngOnInit(): void {
    this.cartService.cart$.subscribe((_cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  public getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  public onClearCart(): void {
    this.cartService.clearCart();
  }

  public onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  public onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  public onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  public onCheckOut(): void {
    this.http
      .post('http://localhost:4242/checkout', {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        const stripe = await loadStripe('process.env.STRIPE_TEST_API_KEY');
        stripe?.redirectToCheckout({ sessionId: res.id });
      });
  }
}
