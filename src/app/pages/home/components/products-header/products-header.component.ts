import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css'],
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  public sort: string = 'desc';
  public itemsShowCount: number = 12;

  public onSortUpdated(sortValue: string): void {
    this.sort = sortValue;
  }
  public onItemsCountUpdated(showCount: number): void {
    this.itemsShowCount = showCount;
  }
  public onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }
}
