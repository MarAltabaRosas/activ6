import { Component, inject } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  arrUsers: User[] = [];
  usersService = inject(UsersService);

  /* ngOnInit(){
    
    this.usersService.getAll()
      .then((response)=>{
        this.arrUsers = response.results;
        
      })
      .catch((error)=>{
        console.log(error);
      })
    
      
  } */

  async ngOnInit(): Promise<void>{
    try{
      let response = await this.usersService.getAll()
      this.arrUsers = response.results
    
    }catch (error){
      console.log(error)
    }
  }

}
