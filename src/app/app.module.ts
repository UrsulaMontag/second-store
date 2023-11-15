import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { StoreHeaderComponent } from './core/components/store-header/store-header.component';
import { HomeComponent } from './pages/home/home.component';
import { FiltersComponent } from './core/components/filters/filters.component';
import { ProductCardComponent } from './pages/home/components/product-card/product-card.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsHeaderComponent } from './pages/home/components/products-header/products-header.component';

import { CartService } from './services/cart.service';
import { ViewService } from './services/view.service';

@NgModule({
  declarations: [
    AppComponent,
    StoreHeaderComponent,
    HomeComponent,
    ProductsHeaderComponent,
    FiltersComponent,
    ProductCardComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatMenuModule,
  ],
  providers: [CartService, ViewService],
  bootstrap: [AppComponent],
})
export class AppModule {}
