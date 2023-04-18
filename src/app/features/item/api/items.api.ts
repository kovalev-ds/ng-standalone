import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ItemInterface } from '../interfaces/item.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.api_url + 'items';

@Injectable({ providedIn: 'root' })
export class ItemsApiService {
  private readonly http = inject(HttpClient);

  public findByCellId(id: number): Observable<ItemInterface[]> {
    return this.http.get<ItemInterface[]>(API_URL, {
      params: { cellId: id },
    });
  }

  public findById(id: number): Observable<ItemInterface> {
    return this.http.get<ItemInterface>(API_URL + `/${id}`);
  }

  public createOne(data: Omit<ItemInterface, 'id'>): Observable<ItemInterface> {
    return this.http.post<ItemInterface>(API_URL, data);
  }

  public removeOne(id: number) {
    return this.http.delete(API_URL + `/${id}`);
  }
}
