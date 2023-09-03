import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  userForm: FormGroup
  userService = inject(UsersService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  constructor(){
    this.userForm = new FormGroup({
      first_name: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[A-zÀ-ú]+$/)
      ]),
      last_name: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[A-zÀ-ú\s]+$/)
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,6}$/)
      ]),
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(5)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(/^((?=\S*?[a-z])(?=\S*?[0-9]).{5,12})\S$/)
      ]),
      image: new FormControl("",[
        Validators.required
      ])

    },[])
    
  }

  ngOnInit(): void{
    this.activatedRoute.params.subscribe(async(params:any)=>{
      let id: string = String(params.iduser);
      let response = await this.userService.getById(id)

      this.userForm = new FormGroup({
        _id: new FormControl(response._id,[]),
        first_name: new FormControl(response.first_name, [
          Validators.required,
          Validators.pattern(/^[A-zÀ-ú]+$/)
        ]),
        last_name: new FormControl(response.last_name, [
          Validators.required,
          Validators.pattern(/^[A-zÀ-ú\s]+$/)
        ]),
        email: new FormControl(response.email, [
          Validators.required,
          Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,6}$/)
        ]),
        username: new FormControl(response.username, [
          Validators.required,
          Validators.minLength(5)
        ]),
        password: new FormControl(response.password, [
          Validators.required,
          Validators.pattern(/^((?=\S*?[a-z])(?=\S*?[0-9]).{5,12})\S$/)
        ]),
        image: new FormControl(response.image,[
          Validators.required
        ])
      },[])
      })
  }

  async getDataForm(): Promise<void> {
    
    if(this.userForm.value._id){
      let response = await this.userService.update(this.userForm.value);
      console.log(response)
      if(response.id){
        alert("Usuario actualizado correctamente")
        this.router.navigate(['/home'])
      }else{
        alert("Se ha producido un error, usuario no actualizado")
      }

    }else{
      let response = await this.userService.create(this.userForm.value);
        if(response.id){
          alert("Usuario creado correctamente")
          this.router.navigate(['/home'])
        }else{
          alert("Se ha producido un error, usuario no creado")
        }
      }    
  }

  checkControl(formcontrolName: string, validator: string): boolean | undefined{
    return this.userForm.get(formcontrolName)?.hasError(validator) && this.userForm.get(formcontrolName)?.touched
  }
}
