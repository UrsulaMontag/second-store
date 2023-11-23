import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
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
export class HomeComponent implements OnInit, OnDestroy {
  cols: number = 3;
  rowHeight: number = 335;
  category: string | undefined;
  isMobile: boolean = true;
  onFilterOpen: boolean = false;

  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productsSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private viewService: ViewService,
    private storeService: StoreService,
  ) {
    this.viewService.isMobile$().subscribe((result) => {
      this.isMobile = result;
    });
  }

  ngOnInit(): void {
    this.onIsMobile();
    this.getProuducts();
  }

  ngOnDestroy(): void {
    //Avoid memory leaks by unsubscribing from the observable
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  getProuducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products;
      });
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

  onColumnsUpdated(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }
  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProuducts();
  }

  onItemsCountUpdated(showCount: number): void {
    this.count = showCount.toString();
    this.getProuducts();
  }

  onSortChange(sortValue: string): void {
    this.sort = sortValue;
    this.getProuducts();
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
