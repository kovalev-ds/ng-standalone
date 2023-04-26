import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CellInterface } from '../interfaces/cell.interface';

const API_URL = environment.api_url + 'cells';

@Injectable({ providedIn: 'root' })
export class CellsApiService {
  private readonly http = inject(HttpClient);

  public findByWarehouseId(id: number): Observable<CellInterface[]> {
    return this.http.get<CellInterface[]>(API_URL, {
      params: { warehouseId: id },
    });
  }

  public findById(id: number): Observable<CellInterface> {
    return this.http.get<CellInterface>(API_URL + `/${id}`);
  }

  public createOne(data: Omit<CellInterface, 'id'>): Observable<CellInterface> {
    return this.http.post<CellInterface>(API_URL, data);
  }

  public removeOne(id: number) {
    return this.http.delete(API_URL + `/${id}`);
  }

  public updateOne(
    id: number,
    data: Partial<CellInterface>
  ): Observable<CellInterface> {
    return this.http.patch<CellInterface>(API_URL + `/${id}`, data);
  }
}
