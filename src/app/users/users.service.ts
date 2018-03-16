import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from './user.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  _id: any;
  _user: any;
  _image: any;

  token = this.authService.getUser().token.replace(/['"]+/g, '');

  public authHeaders = new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

  public formAuthHeaders = new HttpHeaders(
    {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + this.token
    });

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  url = 'http://localhost:8080';

  getAllUsers(): Observable<User[]> {
    console.log('users.service.ts token: ', this.authService.getUser().token);
    return this.httpClient.get<User[]>(this.url + '/ims/users', {headers: this.authHeaders});
  }

  getUserByUsername(username: any): Observable<any> {
    console.log('users.service.ts token: ', this.authService.getUser().token);
    return this.httpClient.get<any>(this.url + '/ims/users/getUserByUsername/' + username, {headers: this.authHeaders});
  }

  addUser(user: any): Observable<any> {
    return this.httpClient.post<any>(this.url + '/ims/users', user, {headers: this.authHeaders});
  }

  updateUser(user: any): Observable<any> {
    this._user = user;
    return this.httpClient.patch<any>(this.url + '/ims/users/edit', this._user, {headers: this.authHeaders});
  }

  uploadImage(id: any, image: any): Observable<any> {
    return this.httpClient.patch<any>(this.url + '/ims/users/setUserImage/' + id, image, {headers: this.formAuthHeaders});
  }

  deleteUser(id: number): Observable<{}> {
    console.log('DELETE.ts token: ', this.token);
    const deleteUrl = `http://localhost:8080/ims/users/${id}`;
    return this.httpClient.delete(deleteUrl, {headers: this.authHeaders});
  }

  getUserRole(): Observable<any[]> {
    console.log('ROLE.ts token: ', this.token);
    return this.httpClient.get<any[]>(this.url + '/ims/usersRole', {headers: this.authHeaders});
  }
}
