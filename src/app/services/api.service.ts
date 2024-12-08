import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:7002/api'

  getSalespersons(): Observable<any> {
    return this.http.get(`${this.apiUrl}/SalesPersons`);
  }

  updateSalesperson(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/SalesPersons/${id}`, data);
  }

  // Products APIs
  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Products`);
  }

  updateProduct(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Products/${id}`, data);
  }

  // Customers APIs
  getCustomers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Customer`);
  }

  // Sales APIs
  getSales(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Sales`);
  }

  createSale(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Sales`, data);
  }

  // Reports API
  getQuarterlyReport(year: number, quarter: number): Observable<any> {
  
    return this.http.get(`${this.apiUrl}/SalesPersons/${year}/${quarter}`);
  }
}
