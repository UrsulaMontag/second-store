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
  private cols = 3;
  private category: string | undefined;
  private isMobile = true;
  public onFilterOpen = false;
  public rowHeight = 335;

  public products: Array<Product> | undefined;
  private sort = 'desc';
  private count = '12';
  private productsSubscription: Subscription | undefined;

  private constructor(
    private cartService: CartService,
    private viewService: ViewService,
    private storeService: StoreService,
  ) {
    this.viewService.isMobile$().subscribe((result) => {
      this.isMobile = result;
    });
  }

  public ngOnInit(): void {
    this.onIsMobile();
    this.getProuducts();
  }

  public ngOnDestroy(): void {
    //Avoid memory leaks by unsubscribing from the observable
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  private getProuducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  public onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  public toggleSideNavVisibility(): void {
    this.viewService.toggleSideNavVisibility();
  }

  public onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProuducts();
  }

  public onItemsCountUpdated(showCount: number): void {
    this.count = showCount.toString();
    this.getProuducts();
  }

  public onSortChange(sortValue: string): void {
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

  private onColumnsUpdated(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }
}
