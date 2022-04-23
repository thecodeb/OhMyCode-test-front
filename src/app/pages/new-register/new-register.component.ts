import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Register } from 'src/app/shared/clases/register';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-new-register',
  templateUrl: './new-register.component.html',
  styleUrls: ['./new-register.component.css'],
})
export class NewRegisterComponent implements OnInit {
  newRegisterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private todosService: TodosService
  ) {
    this.newRegisterForm = this.initForm();
  }

  ngOnInit(): void {}

  /**
   * Función para inicializar el formulario
   * @return
   */

  initForm() {
    const userId = localStorage.getItem('uid');
    return this.fb.group({
      user: [userId, [Validators.required]],
      title: ['', [Validators.required, Validators.maxLength(199)]],
      completed: ['default', [Validators.required]],
    });
  }

  /**
   * Función para crear un nuevo registro
   */

  newRegister() {
    let { user, title, completed } = this.newRegisterForm.value;
    if (completed === 'no completed') {
      completed = false;
    } else if (completed === 'completed') {
      completed = true;
    } else {
      Swal.fire({
        title: 'ERROR',
        text: 'Please, check and provide correctly all the required information',
        icon: 'error',
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    if (title !== '') {
      const newRegister = new Register(user, title, completed);
      this.todosService.createNewRegister(newRegister).subscribe((res: any) => {
        if(res.status === 200){
          Swal.fire({
            title: 'SUCCESS',
            text: 'The register has been correctly created',
            icon: 'success',
            timer: 1999,
            showConfirmButton: false
          });
          setTimeout(() => {
            this.router.navigate(['/registers']);
          }, 2000);
        } else if(res.status !== 200) {
          Swal.fire({
            title: 'ERROR',
            text: res.msg || 'Oops, something was wrong during the process',
            icon: 'error',
            timer: 2000,
            showConfirmButton: false
          });
        }
      });
    } else {
      Swal.fire({
        title: 'ERROR',
        text: 'Please, check and provide correctly all the required information',
        icon: 'error',
        timer: 2000,
        showConfirmButton: false
      });
    }
  }
}
