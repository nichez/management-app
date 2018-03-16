import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { UsersService } from './users.service';
import { User } from './user.model';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns = ['id', 'email', 'firstname', 'role', 'status', 'remove'];
  dataSource = new MatTableDataSource<User>();
  // private changedSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private usersService: UsersService, private httpClient: HttpClient, private authService: AuthService) { }

  token = this.authService.getUser().token.replace(/['"]+/g, '');

  private authHeaders = new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

  ngOnInit() {
    console.log('IS AUTHENTICATED: ', this.authService.isAuthenticated());
    console.log('users ngOnInit: ', localStorage.getItem('currentUserToken'));
    console.log('users ngOnInit u token: ', this.authService.getUser().token);
    console.log('this.token: ', this.token);
    this.usersService.getAllUsers().subscribe(
      (users: User[]) => {
        console.log('users.components.ts', users);
        console.log('users STATUS', users);
        this.dataSource.data = users;
      }, error => {
        console.log('users.components.ts', error);
      }
    );

    // this.httpClient.get<User[]>('http://localhost:8080/ims/users', {headers: this.authHeaders}).subscribe(
    //   data => {
    //     console.log('data subs: ', data);
    //     return data;
    //   }
    // );

  }

  onDeleteUser(id: number) {
    console.log('user id: ', id);
    this.usersService.deleteUser(id).subscribe();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
