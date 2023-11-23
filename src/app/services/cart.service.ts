import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart$ = new BehaviorSubject<Cart>({ items: [] });

  private constructor(private _snackBar: MatSnackBar) {}

  public addToCart(item: CartItem): void {
    const items = [...this.cart$.value.items];
    const itemsInCart = items.find((_item) => _item.id === item.id);

    if (itemsInCart) {
      itemsInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart$.next({ items });
    this._snackBar.open('1 Artikel wurde in den Warenkorb gelegt.', 'Ok', {
      duration: 3000,
    });
    console.log(this.cart$.value);
  }

  public getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  public clearCart(): void {
    this.cart$.next({ items: [] });
    this._snackBar.open('Warenkorb wurde geleert', 'Ok', { duration: 3000 });
  }

  public removeQuantity(item: CartItem): void {
    let itemForRemoval: CartItem | undefined;

    let filteredItems: CartItem[] = this.cart$.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;

        if (_item.quantity < 1) {
          itemForRemoval = _item;
        }
      }
      return _item;
    });

    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }

    this.cart$.next({ items: filteredItems });
    this._snackBar.open('Ein Artikel wurde aus dem Warenkorb entfernt.', 'Ok', {
      duration: 3000,
    });
  }

  private removeFromCart(item: CartItem, update = true): Array<CartItem> {
    const filteredItems: CartItem[] = this.cart$.value.items.filter(
      (_item) => _item.id !== item.id,
    );
    if (update) {
      this.cart$.next({ items: filteredItems });
      this._snackBar.open(
        'Der Artikel wurde aus dem Warenkorb entfernt.',
        'Ok',
        {
          duration: 3000,
        },
      );
    }

    return filteredItems;
  }
}
