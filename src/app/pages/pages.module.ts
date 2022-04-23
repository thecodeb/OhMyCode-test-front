import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Custom page imports

import { RegistersComponent } from './registers/registers.component';
import { NewRegisterComponent } from './new-register/new-register.component';
import { EditRegisterComponent } from './edit-register/edit-register.component';
import { LoginComponent } from './login/login.component';
import { DocumentationComponent } from './documentation/documentation.component';


@NgModule({
  declarations: [
    RegistersComponent,
    NewRegisterComponent,
    EditRegisterComponent,
    LoginComponent,
    DocumentationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RegistersComponent,
    NewRegisterComponent,
    EditRegisterComponent,
    LoginComponent
  ]
})
export class PagesModule { }
