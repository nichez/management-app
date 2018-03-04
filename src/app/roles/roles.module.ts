import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';
import { RolesComponent } from './roles.component';
import { RolesRoutingModule } from './roles-routing.module';
import { NewRoleComponent } from './new-role/new-role.component';

@NgModule({
  declarations: [
    RolesComponent,
    NewRoleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RolesRoutingModule
  ],
  exports: []
})
export class RolesModule {}
