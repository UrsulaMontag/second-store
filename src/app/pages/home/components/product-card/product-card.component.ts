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
  @Output() addToCart = new EventEmitter();

  product: Product = {
    id: 1,
    title: 'sneakers',
    price: 150,
    category: 'shoes',
    description: 'Description',
    image: 'https://via.placeholder.com/150',
  };

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
