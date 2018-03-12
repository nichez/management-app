import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from './user.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {

  token = this.authService.getUser().token.replace(/['"]+/g, '');

  private authHeaders = new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  url = 'http://localhost:8080';

  getAllUsers(): Observable<User[]> {
    console.log('users.service.ts token: ', this.authService.getUser().token);
    return this.httpClient.get<User[]>(this.url + '/ims/users', {headers: this.authHeaders});
  }

  addUser(user: any): Observable<any> {
    return this.httpClient.post<any>(this.url + '/ims/users', user);
  }

  deleteUser(id: number): Observable<{}> {
    const deleteUrl = `http://localhost:8080/ims/users/${id}`;
    return this.httpClient.delete(deleteUrl);
  }

  getUserRole(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url + '/ims/usersRole');
  }
}
