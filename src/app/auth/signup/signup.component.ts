import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  activationKey: string;
  email: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    // const snapshot: RouterStateSnapshot = router.routerState.snapshot;
    // console.log(snapshot);
  }

  ngOnInit() {
    const snapshot: RouterStateSnapshot = this.router.routerState.snapshot;
    console.log(snapshot.root.firstChild.queryParams);
    console.log(snapshot.root.firstChild.queryParams.activationKey);
    this.activationKey = snapshot.root.firstChild.queryParams.activationKey;
    this.email = snapshot.root.firstChild.queryParams.email;
    console.log('act Key: ', this.activationKey);
    console.log('email: ', this.email);
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
