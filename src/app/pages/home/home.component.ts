import { Component, OnChanges, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ViewService } from 'src/app/services/view.service';

const ROWS_HEIGHT: { [id: number]: number } = {
  1: 400,
  2: 350,
  3: 335,
  4: 350,
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cols: number = 3;
  rowHeight: number = 335;
  category: string | undefined;
  isMobile: boolean = true;
  onFilterOpen: boolean = false;

  constructor(
    private cartService: CartService,
    private viewService: ViewService,
  ) {
    this.viewService.isMobile$().subscribe((result) => {
      this.isMobile = result;
    });
  }

  ngOnInit(): void {
    this.onIsMobile();
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
    this.viewService.toggleSideNavVisibility();
  }

  private onIsMobile(): void {
    if (this.isMobile) {
      this.onColumnsUpdated(2);

      this.viewService.sideNavVisibility$.subscribe((visibility: boolean) => {
        this.onFilterOpen = visibility;
      });
    } else {
      this.onColumnsUpdated(3);
    }
  }
}
