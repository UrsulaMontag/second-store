import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css'],
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsShowCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  public sort: string = 'desc';
  public itemsShowCount: number = 12;
  public isMobile: boolean = false;

  constructor(private viewService: ViewService) {}
  ngOnInit(): void {
    this.viewService.isMobile$().subscribe((_result) => {
      this.isMobile = _result;
    });
  }

  public onSortUpdated(sortValue: string): void {
    this.sort = sortValue;
    this.sortChange.emit(sortValue);
  }
  public onItemsCountUpdated(showCount: number): void {
    this.itemsShowCount = showCount;
    this.itemsShowCountChange.emit(showCount);
  }
  public onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }
}
