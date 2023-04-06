import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AuthResponseInterface,
  SignInInterface,
  SignUpInterface,
} from '../interfaces';

const API_URL = 'http://localhost:3001/auth/';

@Injectable({ providedIn: 'root' })
export class AuthApi {
  private readonly http = inject(HttpClient);

  public me(): Observable<AuthResponseInterface> {
    return this.http.get<AuthResponseInterface>(API_URL + 'me');
  }

  public signin(data: SignInInterface): Observable<AuthResponseInterface> {
    return this.http.post<AuthResponseInterface>(API_URL + 'signin', data);
  }

  public signup(data: SignUpInterface): Observable<AuthResponseInterface> {
    return this.http.post<AuthResponseInterface>(API_URL + 'signup', data);
  }

  public signout(): Observable<void> {
    return this.http.get<void>(API_URL + 'signout');
  }
}
