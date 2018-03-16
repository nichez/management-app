import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  user: any;
  roles: any[];
  userForm: FormGroup;

  constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router, private uiService: UIService) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      firstname: new FormControl('',  Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      userRoleId: new FormControl('', Validators.required)
    });

    this.usersService.getUserRole().subscribe(
      (data: any[]) => {
        this.roles = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );

  }

  onSubmit() {
    console.log('userForm: ', this.userForm.value);
    console.log('userRoleId: ', this.userForm.value.userRoleId);
    if (this.userForm.valid) {
      this.usersService.addUser(this.userForm.value).subscribe(
        data => {
          this.user = data;
          console.log('inside: ', this.user);
          console.log('inside data: ', data);
          this.router.navigate(['/users']);
        }, error => {
          console.log(error);
          this.uiService.showSnackbar(error.message, null, 5000);
        }
      );
    }

  }

}
