import { Injectable } from '@angular/core';
import { Product } from '../../type';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = 'http://localhost:2000/shopping-cart-service/v1';

  async getProducts(category?: string): Promise<Product[]> {
    const data = await fetch(
      category
        ? `${this.url}/products/category/${category}`
        : `${this.url}/products`
      // `${this.url}/products`
    );
    return (await data.json()) ?? [];
  }

  async getProductsWithLimit(
    limit: number,
    category?: string
  ): Promise<Product[]> {
    const data = await fetch(
      // category
      //   ? `${this.url}/products/category/${category}?limit=${limit}`
      //   : `${this.url}/products?limit=${limit}`
       `${this.url}/products`
    );
    return (await data.json()) ?? [];
  }

  async getProductById(id: string): Promise<Product | null> {
    const data = await fetch(`${this.url}/products/${id}`);
    return (await data.json()) ?? null;
  }
}
