import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Función para hacer login
   * @param username
   * @param password
   * @return
   */

  login(username: string, password: string){
    return this.http.post(`${environment.localHost}/api/usuarios/login`, {username: username, password: password});
  }

  /**
   * Función para obtener sólo los nombres de los usuarios
   * @param id
   * @return
   */

  getUserName(id: any){
    return this.http.get(`${environment.localHost}/api/usuarios/${id}`)
    .pipe(
      map((res: any) => {
        return res.user? res.user.name : res;
      })
    )
  }

}
