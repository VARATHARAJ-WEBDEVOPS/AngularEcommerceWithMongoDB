import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private readonly baseUrl = 'https://nodeapiv1.onrender.com/api';
  databaseName: string = 'product';

  constructor(private http: HttpClient) { }

  getAllproducts() :Observable<any> {
    const getAllUrl = `${this.baseUrl}/${this.databaseName}`;
    return this.http.get(getAllUrl);
  }

  updateProduct(id: string, updateDocument: any) {
    const updateUrl = `${this.baseUrl}/${this.databaseName}/${id}`;
    return this.http.put(updateUrl, updateDocument);
  }

  deleteProduct (id: string, rev: string) {
    const deleteUrl = `${this.baseUrl}/${this.databaseName}/${id}`
    return this.http.delete(deleteUrl);
  }

  createProduct(document: any): Observable<any> {
    const createUrl = `${this.baseUrl}/${this.databaseName}`;
    return this.http.post(createUrl, document);
  }

}
