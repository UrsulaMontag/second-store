import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public cols: number = 3;
  public category: string | undefined;

  public onColumnsUpdated(colsNum: number): void {
    this.cols = colsNum;
  }
  public onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }
}
