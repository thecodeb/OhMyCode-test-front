import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UsersService
  ) {
    this.loginForm = this.initLoginForm();
  }

  ngOnInit(): void {}

  /**
   * Función para inicializar el formulario
   */

  initLoginForm(){
    return this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  /**
   * Función para iniciar sesión
   */

  login(){
    const {username, password} = this.loginForm.value;
    this.userService.login(username, password).subscribe((res: any) => {
      if(res.jwt){
        localStorage.setItem('username', username);
        localStorage.setItem('uid', res.uid);
        localStorage.setItem('auth', res.jwt);
        this.router.navigate(['/registers']);
      } else{
        console.error(res);
      }
    });
  }

}
