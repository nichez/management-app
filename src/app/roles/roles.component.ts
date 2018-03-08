import { Component, OnInit } from '@angular/core';

import { RolesService } from './roles.service';
import { User } from '../users/user.model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles: Array<User>;

  constructor(private rolesService: RolesService) { }

  ngOnInit() {
    console.log('out ');
    this.rolesService.getAll().subscribe(
      data => {
        this.roles = data;
        console.log('email: ', data[0].email);
        console.log('all data: ', data);
      }
    );
  }

}
