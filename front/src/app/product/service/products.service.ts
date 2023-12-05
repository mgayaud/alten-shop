import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, map, switchMap } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get('http://localhost:3000/products')
      .pipe(
        catchError(this.handleError)
      );
  }

  createNewProduct(product: Product): Observable<any> {
    return this.http.post('http://localhost:3000/products', product, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.patch(`http://localhost:3000/products/${product.id}`, product, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .pipe(
        catchError(this.handleError)
      );
  }

  removeProduct(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/products/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  removeSelectedProducts(ids: Array<number>): Observable<any> {
    return this.http.delete(`http://localhost:3000/products`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: { data: ids }
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    return throwError(error);
  }
}