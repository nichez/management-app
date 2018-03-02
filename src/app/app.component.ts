import { Component } from '@angular/core';
import { MatList } from '@angular/material/list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  links = [ 'Users', 'Teams', 'Roles', 'Departments', 'HR' ];
}
