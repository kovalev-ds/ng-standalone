import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { WarehouseInterface } from '../interfaces';

const API_URL = environment.api_url + 'warehouses';

@Injectable({ providedIn: 'root' })
export class WarehouseApiService {
  private readonly http = inject(HttpClient);

  public find(): Observable<WarehouseInterface[]> {
    return this.http.get<WarehouseInterface[]>(API_URL);
  }

  public findById(id: number): Observable<WarehouseInterface> {
    return this.http.get<WarehouseInterface>(API_URL + `/${id}`);
  }

  public createOne(
    data: Omit<WarehouseInterface, 'id'>
  ): Observable<WarehouseInterface> {
    return this.http.post<WarehouseInterface>(API_URL, data);
  }

  public removeOne(id: number) {
    return this.http.delete(API_URL + `/${id}`);
  }
}
