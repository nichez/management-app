import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  _user: any;
  _activationKey: string;
  _email: string;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    // const snapshot: RouterStateSnapshot = router.routerState.snapshot;
    // console.log(snapshot);
  }

  ngOnInit() {
    const snapshot: RouterStateSnapshot = this.router.routerState.snapshot;
    console.log(snapshot.root.firstChild.queryParams);
    console.log(snapshot.root.firstChild.queryParams.activationKey);
    this._activationKey = snapshot.root.firstChild.queryParams.activationKey;
    this._email = snapshot.root.firstChild.queryParams.email;
    console.log('act Key: ', this._activationKey);
    console.log('email: ', this._email);
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    form.value.email = this._email;
    form.value.activationKey = this._activationKey;
    if (form.valid) {
      this.router.navigate(['/login']);
      this.authService.registerUser(form.value).subscribe(
        data => {
          this._user = data;
          console.log('data subscribed: ', data);
        }, error => {
          console.log(error);
        }
      );
    }
  }
}
