import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response } from '@angular/http';

// Reactive JS
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';

import { User } from '../users/user.model';

const httpOptions = {
  headers: new Headers({
    'Content-Type':  'application/json',
    'Authorization': ''
  })
};

@Injectable()
export class AuthService {
  private _email: string;
  private _token: string;
  private _rememberMe: boolean;
  private _password: string;

  constructor(private http: Http) {
  }

  private removeUser() {
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('currentUserToken');
    localStorage.removeItem('currentUserPassword');
    localStorage.removeItem('currentUserRemember');
  }

  login(email: string, password: string, rememberMe: boolean) {
    const header = new Headers({
      'Content-Type':  'application/json'
    });
    const dataBody = { email: email, password: password };
    this._email = email;
    this._rememberMe = rememberMe;
    this._password = password;
    this.setRemember(rememberMe);
    this.setPassword();

    return this.http.post('http://localhost:8080/ims/auth/login', dataBody);
  }

  logout() {
    // remove user from local storage to log user out
    this.removeUser();
    this.setToken(null);
    this.setRememberValue(null);
  }

  getUser() {
    return {
      email: localStorage.getItem('currentUserEmail'),
      password: localStorage.getItem('currentUserPassword'),
      token: localStorage.getItem('currentUserToken'),
      rememberMe: localStorage.getItem('currentUserRemember')
    };
  }
  setUser(user) {
    localStorage.setItem('currentUserToken', JSON.stringify(user));
    localStorage.setItem('currentUserPassword', this._password);
    localStorage.setItem('currentUserEmail', this._email);
    localStorage.setItem('currentUserRemember', this._rememberMe.toString());
    // console.log(localStorage.getItem('currentUserRemember'));
  }

  getToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUserToken'));
    return currentUser.token;
  }
  setToken(value: string) {
    this._token = value;
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

  private getPassword() {
    return localStorage.getItem('currentUserPassword');
  }
  private setPassword() {
    localStorage.setItem('currentUserPassword', this._password);
  }

  catchRequest(response, path, callback) {
    const data = JSON.parse(response.text());
    // tslint:disable-next-line:triple-equals
    if (data.status_code == 401) {
      this.catchUnauthorizedRequest(path, callback);
    } else {
      if (data.message === undefined) {
        return Observable.throw('Description: CONNECTION TIMED OUT');
      }
      return Observable.throw('Description: Problem in request - ' + data.message + ' , '
        + this.convertObjectToString(data.errors, 'Error'));
    }
  }

  private catchUnauthorizedRequest(path, callback) {
    const user = this.getUser();
    this.login(user.email, user.password, this.convertStringToBool(user.rememberMe)).subscribe(
      (data) => callback(path),
      (error) => {
        const errorObj = JSON.parse(error.text());
        return Observable.throw('Description: Problem in async login -> ' + errorObj.message);
      }
    );
  }

  // Helper

  isEmpty(val) {
    return (val === undefined ||  val === 'null' || val.length <= 0) ? true : false;
  }

  convertStringToBool(value) {
    return (value === 'true');
  }

  convertObjectToString(item: Object, title: string) {
    let result = title + ': ';
    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        result = result + item[key] + ' ';
      }
    }
    return result;
  }

}
