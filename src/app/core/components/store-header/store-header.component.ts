import { Component, Input, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'store-header',
  templateUrl: './store-header.component.html',
  styleUrls: ['./store-header.component.css'],
})
export class StoreHeaderComponent implements OnInit {
  private _cart: Cart = { items: [] };
  public itemsQuantity = 0;
  public isMobile = false;
  public sideNavVisibility = false;

  @Input()
  public get cart(): Cart {
    return this._cart;
  }
  public set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  private constructor(
    private cartService: CartService,
    private viewService: ViewService,
  ) {
    this.cartService.cart$.subscribe((cart) => (this.cart = cart));
    this.viewService
      .isMobile$()
      .subscribe((isMobile: boolean): boolean => (this.isMobile = isMobile));
  }

  public ngOnInit(): void {
    this.viewService.sideNavVisibility$.subscribe(
      (visibility: boolean): boolean => (this.sideNavVisibility = visibility),
    );
  }

  public toggleSideNavVisibility(): void {
    this.viewService.toggleSideNavVisibility();
  }

  public getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  public onClearCart(): void {
    this.cartService.clearCart();
  }
}
