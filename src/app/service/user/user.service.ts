import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private readonly baseUrl = 'http://localhost:3001/api';
  databaseName: string = 'users';

  constructor(private http: HttpClient) { }

  createDocument(document: any): Observable<any> {
    const createUrl = `${this.baseUrl}/${this.databaseName}`;
    return this.http.post(createUrl, document);
  }

  searchDocumentsByPhone(phoneNumber: number): Observable<any> {
    const searchUrl = `${this.baseUrl}/${this.databaseName}/checkexistinguser`;
    return this.http.post(searchUrl, { phone: phoneNumber});
  }

  readDocument(id: string): Observable<any> {
    const readUrl = `${this.baseUrl}/${id}`;
    return this.http.get(readUrl);
  }

}