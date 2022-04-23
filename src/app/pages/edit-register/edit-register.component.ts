import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Register } from 'src/app/shared/clases/register';
import Swal from 'sweetalert2';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-edit-register',
  templateUrl: './edit-register.component.html',
  styleUrls: ['./edit-register.component.css']
})
export class EditRegisterComponent implements OnInit {

  editRegisterForm: FormGroup;
  registerId: any;
  registerData: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private todosService: TodosService,
  ) {
    this.registerId = 0;
    this.editRegisterForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.registerId = this.route.snapshot.paramMap.get('id');
    this.todosService.getAllRegistersById(this.registerId).subscribe((res: any) => {
      this.editRegisterForm = this.initEditForm(res);
    });
  }

  /**
   * Función para inicializar el formulario con valores predeterminados
   * @return
   */

  initEditForm(response: any){
    const { user, title, completed } = response;
    let status;
    completed === true? (status = 'completed'): (status = 'no completed');
    return this.fb.group({
      user: [user, [Validators.required]],
      title: [title, [Validators.required, Validators.maxLength(199)]],
      completed: [status, [Validators.required]]
    });
  }

  /**
   * Función para modificar el registro
   */

  editRegister(){
    let { user, title, completed } = this.editRegisterForm.value;
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
      this.todosService.updateRegister(this.registerId, newRegister).subscribe((res: any) => {
        if(res.status === 200){
          Swal.fire({
            title: 'SUCCESS',
            text: 'The register has been correctly updated',
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