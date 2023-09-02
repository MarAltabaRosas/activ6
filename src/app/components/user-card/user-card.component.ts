import { Component, Input, inject } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {

  usersServices = inject(UsersService);

  @Input() miUser!: User | any;

  async deleteUser(id: string): Promise<void> {
    let confirmar = confirm(`¿Deseas borrar el ususario ${this.miUser.first_name} ${this.miUser.last_name}?`)
    if (confirmar == true){
      let response = await this.usersServices.delete(this.miUser._id)
      if(response) {
      alert('Usuario borrado correctamente')      
    }
    }
  }
}
