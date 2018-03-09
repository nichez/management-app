import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from './user.model';

@Injectable()
export class UsersService {
  private authHeaders = new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    });

  constructor(private httpClient: HttpClient) {
  }

  url = 'http://localhost:8080';

  getAllUsers(): Observable<User[]> {
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
