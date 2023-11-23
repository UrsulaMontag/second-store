import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() fullWidthMode: boolean = false;
  @Input() isMobile: boolean = false;
  @Input() product: Product | undefined;
  @Output() addToCart: EventEmitter<Product> = new EventEmitter();

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
