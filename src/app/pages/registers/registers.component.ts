import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TodosService } from '../../services/todos.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.css'],
})
export class RegistersComponent implements OnInit {
  registers: any[];
  registersCopy: any;
  userList: any[];
  userSelectedId: number;

  constructor(
    private router: Router,
    private userService: UsersService,
    private todosService: TodosService
  ) {
    this.registers = [];
    this.registersCopy = [];
    this.userList = [];
    this.userSelectedId = 0;
  }

  ngOnInit(): void {
    this.getDefaultAll();
  }

  /**
   * Función privada utilizada para cargar por defecto todos los registros al iniciar el componente
   * @return
   */

  private getDefaultAll() {
    this.todosService.getAllRegisters().subscribe((res: any) => {
      res.forEach((todos: any) => {
        this.userService.getUserName(todos.user).subscribe((res: any) => {
          todos.userName = res;
        });
      });
      this.registers = res;
      this.registersCopy = res;
      this.userList = this.getOptionList(res);
    });
  }

  /**
   * Función para obtener la lista de options a crear
   * @param response
   * @return
   */

  getOptionList(response: any) {
    const optionList = [{ id: '0', value: 'All users' }];
    let idList: string[]= [];
    response.map((post: any) => {
      if (!idList.includes(post.user)){
        idList.push(post.user);
      }
    });
    for (let i = 0; i <= idList.length; i++) {
      if(idList[i] !== undefined){
        this.userService.getUserName(idList[i]).subscribe((res: any) => {
          optionList.push({ id: idList[i], value: res });
        });
      }
    }
    return optionList;
  }

  /**
   * Función para filtrar por ID
   * @param id
   * @return
   */

  filterById(event: any) {
    const value = event.value;
    value === '0'
      ? this.getDefaultAll()
      : this.todosService.getAllRegistersByUser(value).subscribe((res: any) => {
        res.forEach((todos: any) => {
          this.userService.getUserName(todos.user).subscribe((res: any) => {
            todos.userName = res;
          });
        });
          this.registers = res;
          this.registersCopy = res;
        });
  }

  /**
   * Función para filtrar por title
   * @param title
   * @return
   */

  filterByTitle(title: string) {
    clearTimeout();
    if (title.length >= 3) {
      setTimeout(() => {
        this.registers = this.registers.filter(
          (item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
        );
      }, 1000);
    } else {
      this.getDefaultAll();
    }
  }

  /**
   * Función para re-dirigir a la ventana de creación
   */

  createElement() {
    this.router.navigate(['/registers/new']);
  }

  /**
   * Función para eliminar todos los registros
   */

  editElement(id?: any) {
    this.router.navigate(['/registers/modify', id]);
  }

  /**
   * Función para desplegar la modal para eliminar o no el elemento seleccionado
   */

  askIfDelete(id: string, index: number){
    Swal.fire({
      title: 'Are you sure?',
      text: "This operation cannot be undone",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {
        this.registers.splice(index, 1);
        this.todosService.removeRegisterById(id).subscribe((res: any) => {
          Swal.fire({
            title:'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          });
        });
      }
    })
  }

}
