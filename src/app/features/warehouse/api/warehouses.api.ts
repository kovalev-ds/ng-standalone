import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WarehouseInterface } from '../interfaces/warehouse.interface';

const API_URL = environment.api_url + 'warehouses';

@Injectable({ providedIn: 'root' })
export class WarehousesService {
  private readonly http = inject(HttpClient);

  public find(): Observable<WarehouseInterface[]> {
    return this.http.get<WarehouseInterface[]>(API_URL);
  }

  public createOne(
    data: Omit<WarehouseInterface, 'id'>
  ): Observable<WarehouseInterface> {
    return this.http.post<WarehouseInterface>(API_URL, data);
  }
}
