import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RolesComponent } from './roles.component';
import { NewRoleComponent } from './new-role/new-role.component';

const routes: Routes = [
  { path: '', component: RolesComponent },
  { path: 'new', component: NewRoleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule {}
