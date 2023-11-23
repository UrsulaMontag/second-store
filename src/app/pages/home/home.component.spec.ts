// FILEPATH: /d:/development/ng/second-store/src/app/pages/home/home.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Product } from 'src/app/models/product.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update columns when columnsCountChange event is emitted', () => {
    // Arrange
    const newColumnsCount = 3;

    // Act
    component.onColumnsUpdated(newColumnsCount);

    // Assert
    expect(component.cols).toEqual(newColumnsCount);
  });

  it('should handle addToCart event', () => {
    // Arrange
    const product: Product = {
      id: 1,
      title: 'Test Product',
      price: 100,
      image: 'test.jpg',
      category: 'Test Category',
      description: 'Test Description',
    };

    // Act
    component.onAddToCart(product);

    // Assert
    // Add your assertions here based on what onAddToCart should do
  });

  it('should handle showCategory event', () => {
    // Arrange
    const category = 'Test Category';

    // Act
    component.onShowCategory(category);

    // Assert
    // Add your assertions here based on what onShowCategory should do
  });
});
