import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
      first_name: new FormControl("", []),
      last_name: new FormControl("", []),
      email: new FormControl("", []),
      username: new FormControl("", []),
      password: new FormControl("", [])
    },[])
    
  }

  ngOnInit(): void{
    this.activatedRoute.params.subscribe(async(params:any)=>{
      let id: string = String(params.iduser);
      let response = await this.userService.getById(id)

      this.userForm = new FormGroup({
        _id: new FormControl(response._id,[]),
        first_name: new FormControl(response.first_name, []),
        last_name: new FormControl(response.last_name, []),
        email: new FormControl(response.email, []),
        username: new FormControl(response.username, []),
        password: new FormControl(response.password, [])
      },[])
      })
  }

  async getDataForm(): Promise<void> {
    
    if(this.userForm.value._id){
      let response = await this.userService.update(this.userForm.value._id, this.userForm.value);
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

}
