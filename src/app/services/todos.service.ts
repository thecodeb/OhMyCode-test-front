import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
//import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';
import { Register } from '../shared/clases/register';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  headerOptions: any;
  token: any;

  constructor(
    private http: HttpClient
  ) {
    this.token = localStorage.getItem('auth');
    if(this.token !== null){
      this.headerOptions = {
        'Content-Type': 'application/json',
        'Authorization': this.token
      };
    }
  }

  /**
   * Función para obtener todos los registros
   * @return
   */

  getAllRegisters(){
    return this.http.get(`${environment.liveApi}/api/todos`, {headers: this.headerOptions});
  }

  /**
   * Función para obtener todos los registros de un usuario determinado
   * @param id
   * @return
   */

   getAllRegistersByUser(id: any){
    return this.http.get(`${environment.liveApi}/api/todos/user/${id}`, {headers: this.headerOptions})
    .pipe(
      map((res: any) => {
        return res.data? res.data : res;
      })
    )
  }

    /**
   * Función para obtener un registro determinado
   * @param id
   * @return
   */

     getRegisterById(id: any){
     return this.http.get(`${environment.liveApi}/api/todos/${id}`, {headers: this.headerOptions})
     .pipe(
       map((res: any) => {
         return res.data[0]? res.data[0] : res;
       })
     )
   }

   /**
   * Función para crear un nuevo registro
   * @param register
   * @return
   */

    createNewRegister(register: Register){
      return this.http.post(`${environment.liveApi}/api/todos/new`, register, {headers: this.headerOptions});
    }

  /**
   * Función para modificar un registro
   * @param id
   * @param register
   * @returns
   */

   updateRegister(id: any, register: Register){
    return this.http.put(`${environment.liveApi}/api/todos/modificar/${id}`, register, {headers: this.headerOptions});
  }

  /**
   * Función para borrar todos los registros
   * @param id
   * @return
   */

  removeRegisterById(id: string){
    return this.http.delete(`${environment.liveApi}/api/todos/${id}`, {headers: this.headerOptions});
  }


}


