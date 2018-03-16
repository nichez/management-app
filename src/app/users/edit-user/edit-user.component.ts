import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  currentUser = this.authService.getUser().username;
  user: {
    id: any,
    email: any,
    username: any,
    firstname: any,
    lastname: any,
    img: any
  };
  user_id: any;
  user_email: any;
  user_username: any;
  user_firstname: any;
  user_lastname: any;
  user_image: any;
  userForm: NgForm;

  constructor(private authService: AuthService, private usersService: UsersService) {}

  ngOnInit() {
    console.log('CURRENT: ', this.currentUser);
    this.usersService.getUserByUsername(this.currentUser).subscribe(
      (data: any) => {
        console.log('data: ', data);
        console.log('dataMAIL: ', data.email);
        this.user = data;
        console.log('USEEEEEER : ', this.user);
        this.user_id = data.id;
        this.user_email = data.email;
        this.user_username = data.username;
        this.user_firstname = data.firstname;
        this.user_lastname = data.lastname;
        console.log('email: ', this.user.email);
      }
    );
  }

  onSubmit(form: NgForm) {
    console.log('FORMA: ', form.value);
    form.value.email = this.user.email;
    form.value.username = this.user.username;
    form.value.firstname = this.user.firstname;
    form.value.lastname = this.user.lastname;
    console.log('form valid: ', form.valid);
    console.log('req ID: ', this.user.id);
    console.log('req USER: ', form.value);
    console.log('current form user username: ', form.value.username);
    console.log('current THIS user username: ', this.user.username);
    console.log('current Image: ', this.user.img);
    console.log('current Image Name: ', this.user.img.name);

    if (form.valid) {
      this.usersService.updateUser(this.user).subscribe(
        data => {
          data = this.user;
          console.log('inside data.username: ', data);
          console.log('inside this.username: ', this.user_username);
          console.log('inside: ', this.user);
          console.log('inside data: ', data);
        }, error => {
          console.log(error);
        }
      );
    }
  }

}
