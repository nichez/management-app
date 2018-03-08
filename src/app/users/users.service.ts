import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from './user.model';

@Injectable()
export class UsersService {

  constructor(private httpClient: HttpClient) {
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:8080/ims/users');
  }

  addUser(user: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/ims/users', user);
  }

  deleteUser(id: number): Observable<{}> {
    const url = `http://localhost:8080/ims/users/${id}`;
    return this.httpClient.delete(url);
  }

  getUserRole(): Observable<any[]> {
    return this.httpClient.get<any[]>('http://localhost:8080/ims/usersRole');
  }
}
