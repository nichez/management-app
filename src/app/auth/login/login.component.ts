import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onLogin() {
    console.log('User is logged in with mail: ', this.loginForm.value.email);

      console.log('User is already logged in!', this.loginForm.value.email);
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password, this.loginForm.value.rememberMe).subscribe(
        (data) => {
          console.log(localStorage.getItem('currentUserEmail'));
          console.log('User is com auth logged in!', this.loginForm.value.email);
          this.router.navigate(['/users']);
        }
      );

  }
}
