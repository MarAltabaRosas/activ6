import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  activatedRoute = inject(ActivatedRoute)
  usersServices = inject(UsersService);
  router = inject(Router);
  oneUser!: User | any;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async(params:any)=>{
      let id = String(params.iduser)

      this.oneUser = await this.usersServices.getById(id)
    })
  }

  async deleteUser(id: string): Promise<void> {
    let confirmar = confirm(`¿Deseas borrar el ususario ${this.oneUser.first_name} ${this.oneUser.last_name}?`)
    if (confirmar==true){
      let response = await this.usersServices.delete(this.oneUser._id)
        if(response) {
        alert('Usuario borrado correctamente')
        this.router.navigate(['/home'])
        }
    }
  }

}
