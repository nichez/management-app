import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response } from '@angular/http';
import * as jwt_decode from 'jwt-decode';

// Reactive JS
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';

import { User } from '../users/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export const TOKEN_NAME: string = 'jwt_token';

@Injectable()
export class AuthService {
  private _username: string;
  private _token: string;
  private _password: string;

  private url = 'http://localhost/8080/auth';
  private headers = new HttpHeaders(
    {
      'Content-Type': 'application/json'
    });
  private authHeaders = new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    });

  constructor(private http: Http, private httpClient: HttpClient) {
  }

  // Register User
  registerUser(user: any): Observable<any> {
    return this.httpClient.patch<any>('http://localhost:8080/ims/users/registerUser', user);
  }

  login(username: string, password: string) {
    this._username = username;
    this._password = password;
    const dataBody = {  username: username, password: password }

    return this.httpClient.post('http://localhost:8080/ims/auth/login', dataBody, {headers: this.headers});
  }

  setUser(user) {
    localStorage.setItem('currentUserToken', JSON.stringify(user));
    localStorage.setItem('currentUserName', this._username);
    localStorage.setItem('currentUserPassword', this._password);
  }

  setToken(value: string) {
    this._token = value;
  }

  getUser() {
    return {
      username: localStorage.getItem('currentUserName'),
      password: localStorage.getItem('currentUserPassword'),
      token: localStorage.getItem('currentUserToken'),
    };
  }

  getToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
    return currentUser.token;
  }

  isAuthenticated() {
    return localStorage.getItem('currentUserToken') != null;
  }

}
