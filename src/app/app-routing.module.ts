import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Custom component imports

import { RegistersComponent } from './pages/registers/registers.component';
import { NewRegisterComponent } from './pages/new-register/new-register.component';
import { EditRegisterComponent } from './pages/edit-register/edit-register.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { DocumentationComponent } from './pages/documentation/documentation.component';

const routes: Routes = [
  {
    path: 'documentation',
    component: DocumentationComponent
  },
  {
    path: 'registers',
    component: RegistersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'registers/new',
    component: NewRegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'registers/modify/:id',
    component: EditRegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'registers'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
