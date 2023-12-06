import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  private readonly baseUrl = 'http://localhost:5984';
  databaseName: string = 'users';
  databaseName1: string = 'products';
  couchUserName: string = 'vasanth';
  couchPassword: string = 'sivasiva';

  constructor(private http: HttpClient) { }


  deleteProduct (id: string, rev: string) {
    const deleteUrl = `${this.baseUrl}/${this.databaseName1}/${id}?rev=${rev}`
    return this.http.delete(deleteUrl, {
      headers: {
        'Authorization': 'Basic ' + btoa(this.couchUserName + ':' + this.couchPassword)
      }
    });
  }

  updateProduct(id: string, updateDocument: any) {
    const updateUrl = `${this.baseUrl}/${this.databaseName1}/${id}`;
    return this.http.put(updateUrl, updateDocument, {
      headers: {
        'Authorization': 'Basic ' + btoa(this.couchUserName + ':' + this.couchPassword)
      }
    });
  }

  createProduct(document: any): Observable<any> {
    const createUrl = `${this.baseUrl}/${this.databaseName1}`;
    return this.http.post(createUrl, document, {
      headers: {
        'Authorization': 'Basic ' + btoa(this.couchUserName + ':' + this.couchPassword)
      }
    });
  }

  getAllproducts() :Observable<any> {
    const getAllUrl = `${this.baseUrl}/${this.databaseName1}/_all_docs?include_docs=true`;
    return this.http.get(getAllUrl, {
      headers: {
        'Authorization': 'Basic ' + btoa(this.couchUserName + ':' + this.couchPassword)
      }
    });
  }

  createDocument(document: any): Observable<any> {
    const createUrl = `${this.baseUrl}/${this.databaseName}`;
    return this.http.post(createUrl, document, {
      headers: {
        'Authorization': 'Basic ' + btoa(this.couchUserName + ':' + this.couchPassword)
      }
    });
  }

  searchDocumentsByPhone(phoneNumber: number): Observable<any> {
    const searchUrl = `${this.baseUrl}/${this.databaseName}/_find`;

    const query = {
      selector: {
        phone: phoneNumber
      }
    };

    return this.http.post(searchUrl, query, {
      headers: {
        'Authorization': 'Basic ' + btoa(this.couchUserName + ':' + this.couchPassword)
      }
    });
  }

  readDocument(id: string): Observable<any> {
    const readUrl = `${this.baseUrl}/${id}`;
    return this.http.get(readUrl, {
      headers: {
        'Authorization': 'Basic ' + btoa(this.couchUserName + ':' + this.couchPassword)
      }
    });
  }

}
