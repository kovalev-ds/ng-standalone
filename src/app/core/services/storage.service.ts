import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  public set(key: string, data: unknown): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  public get<T>(key: string): T | null {
    const data = localStorage.getItem(key);

    if (data) {
      return JSON.parse(data) as T;
    }

    return null;
  }
}
