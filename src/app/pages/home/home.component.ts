import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ViewService } from 'src/app/services/view.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  cols: number = 3;
  rowHeight: number = 335;
  category: string | undefined;
  sideNavVisibility: boolean = true;

  constructor(
    private cartService: CartService,
    private viewService: ViewService,
  ) {
    this.viewService.isMobile().subscribe((result) => {
      this.sideNavVisibility = !result;
    });
  }

  onColumnsUpdated(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }
  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }
  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  toggleSideNavVisibility(): void {
    this.sideNavVisibility = !this.sideNavVisibility;
  }
}
