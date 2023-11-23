import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

const STORE_BASE_URL = 'https://fakestoreapi.com/';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private constructor(private httpClient: HttpClient) {}

  public getAllProducts(
    limit = '12',
    sort = 'desc',
    category?: string,
  ): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(
      `${STORE_BASE_URL}products${
        category ? '/category/' + category : ''
      }?limit=${limit}&sort=${sort}`,
    );
  }

  public getAllCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(
      `${STORE_BASE_URL}products/categories`,
    );
  }
}
