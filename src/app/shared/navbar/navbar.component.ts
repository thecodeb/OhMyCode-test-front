import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username: any;

  constructor(
    private router: Router
  ) {
    this.username = '';
  }

  ngOnInit(): void {
    this.router.events.subscribe((res: any) => {
      if (res instanceof NavigationEnd){
        this.username = this.checkUser();
      }
    });
  }

  /**
   * Función para saber si hay un usuario logado o no y así adaptar el navbar
   * @return
   */

  checkUser(){
    if (localStorage.getItem('auth')){
      return localStorage.getItem('username');
    } else {
      return '';
    }
  }

  /**
   * Función para cerrar sesión
   */

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
