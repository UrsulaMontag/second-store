import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  @Output() showCategory = new EventEmitter<string>();
  public categories: string[] = ['Kleidung', 'Schuhe', 'Assecoires'];

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
}
