import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() public fullWidthMode = false;
  @Input() public isMobile = false;
  @Input() public product: Product | undefined;
  @Output() private addToCart: EventEmitter<Product> = new EventEmitter();

  public onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
