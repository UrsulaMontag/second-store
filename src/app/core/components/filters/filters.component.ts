import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() private showCategory = new EventEmitter<string>();
  private categorySubscription: Subscription | undefined;
  public categories: string[] | undefined;

  public constructor(private storeService: StoreService) {}

  public ngOnInit(): void {
    this.categorySubscription = this.storeService
      .getAllCategories()
      .subscribe((_categories) => {
        this.categories = _categories;
      });
  }

  public ngOnDestroy(): void {
    //Avoid memory leaks by unsubscribing from the observable
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }

  public onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
}
