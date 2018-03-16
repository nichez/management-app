import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  uName: string;
  pw: string;
  rememberME: boolean;

  constructor(private router: Router, private authService: AuthService, private uiService: UIService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    this.uName = form.value.username;
    this.pw = form.value.password;
    this.rememberME = form.value.rememberMe;
    console.log('username: ', this.uName);
    console.log('password: ', this.pw);
    console.log('remember me: ', this.rememberME);

    return this.authService.login(this.uName, this.pw, this.rememberME).subscribe(
      response => {
        console.log('User is loged in');
        console.log('response: ', response);
        console.log('response token: ', JSON.stringify(response));
        const resp = JSON.stringify(response);
        console.log('resp json.parse: ', JSON.parse(resp));

        JSON.parse(resp, (key, value) => {
          if (typeof value === 'string') {
            console.log('value of token: ', value);
            this.authService.setUser(value);
            this.authService.setToken(value);
          }
          return null;
        });

        console.log('current Username: ', localStorage.getItem('currentUserName'));
        console.log('current token: ', localStorage.getItem('currentUserToken'));

        console.log('get user function: ', this.authService.getUser());
        console.log('get user function token: ', this.authService.getUser().token);
        console.log('get user function username: ', this.authService.getUser().username);
        console.log('get token function: ', this.authService.getToken());

        this.router.navigate(['/users']);
      }, error => {
        console.log(error);
        this.uiService.showSnackbar(error.message, null, 5000);
      }
    );
  }

}
