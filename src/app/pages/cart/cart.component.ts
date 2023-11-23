import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  private cart: Cart = {
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

  private constructor(private cartService: CartService) {}

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
}
