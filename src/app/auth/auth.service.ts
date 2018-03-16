import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Reactive JS
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  private _username: string;
  private _token: string;
  private _password: string;
  private _rememberMe: boolean;

  private url = 'http://localhost:8080/ims';
  private headers = new HttpHeaders(
    {
      'Content-Type': 'application/json'
    });
  public authHeaders = new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getUser().token
    });

  constructor(private httpClient: HttpClient) {
  }

  // Register User
  registerUser(user: any): Observable<any> {
    return this.httpClient.patch<any>(this.url + '/users/registerUser', user, {headers: this.headers});
  }

  login(username: string, password: string, rememberMe: boolean) {
    this._username = username;
    this._password = password;
    this._rememberMe = rememberMe;
    const dataBody = {  username: username, password: password };
    this.setRemember(rememberMe);
    this.setPassword();

    return this.httpClient.post(this.url + '/auth/login', dataBody, {headers: this.headers});
  }

  logout() {
    this.removeUser();
    this.setToken(null);
    this.setRememberValue(null);
  }

  setUser(user) {
    localStorage.setItem('currentUserToken', JSON.stringify(user));
    localStorage.setItem('currentUserName', this._username);
    localStorage.setItem('currentUserPassword', this._password);
    localStorage.setItem('currentUserRemember', this._rememberMe.toString());
  }

  getUser() {
    return {
      username: localStorage.getItem('currentUserName'),
      password: localStorage.getItem('currentUserPassword'),
      token: localStorage.getItem('currentUserToken'),
      rememberMe: localStorage.getItem('currentUserRemember')
    };
  }

  private removeUser() {
    localStorage.removeItem('currentUserName');
    localStorage.removeItem('currentUserToken');
    localStorage.removeItem('currentUserPassword');
    localStorage.removeItem('currentUserRemember');
  }

  setToken(value: string) {
    this._token = value;
  }

  getToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
    return currentUser.token;
  }

  private setPassword() {
    localStorage.setItem('currentUserPassword', this._password);
  }

  setRemember(value: boolean) {
    localStorage.setItem('currentUserRemember', value.toString());
  }

  setRememberValue(value: boolean) {
    this._rememberMe = value;
  }

  isAuthenticated() {
    return localStorage.getItem('currentUserToken') != null;
  }

  isRemembered() {
    const result = (localStorage.getItem('currentUserRemember') === 'true');
    return result;
  }

}
