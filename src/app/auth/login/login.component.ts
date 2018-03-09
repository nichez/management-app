import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  uName: string;
  pw: string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    this.uName = form.value.username;
    this.pw = form.value.password;
    console.log('username: ', this.uName);
    console.log('password: ', this.pw);

    return this.authService.login(this.uName, this.pw).subscribe(
      response => {
        console.log('User is loged in');
        console.log('response: ', response);
        console.log('response token: ', response.valueOf());
        // this.authService.setUser(response);
        this.router.navigate(['/users']);
      }, error => {
        console.log(error);
      }
    );
  }

}
