// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api/data'; // Change to your API endpoint
  private baseUrl = 'http://localhost:3000/api'; // Change to your API endpoint

  constructor(private http: HttpClient) {}

  getApiData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getCards(): Observable<any[]> {
    return this.getApiData().pipe(
      map((data: any) => data.cards)
    );
  }

  getSliderImages(): Observable<any[]> {
    return this.getApiData().pipe(
      map((data: any) => data.slider)
    );
  }
  getFooterrLinkes(): Observable<any[]> {
    return this.getApiData().pipe(
      map((data: any) => data.footer)
    );
  }
  getUniqueTable(): Observable<any[]> {
    return this.getApiData().pipe(
      map((data: any) => data.unique_table)
    );
  }

  getParentLinks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/parentlinks`);
  }

  getSemiLinks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/semilinks`);
  }
}
