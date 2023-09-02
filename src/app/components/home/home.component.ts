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
  totalPages = 1;
  currentPage = 1;

  async ngOnInit(currentPage: number): Promise<void>{
    try{
      let response = await this.usersService.getAll(currentPage)
      this.arrUsers = response.results;
      this.totalPages = response.total_pages;
      this.currentPage = response.page;
          
    }catch (error){
      console.log(error)
    }
  }

  nextPage(){
    document.getElementById("prevPage")?.classList.remove("disabled")
    if (this.currentPage<this.totalPages){
      this.currentPage = this.currentPage + 1;
      this.ngOnInit(this.currentPage)
      if(this.currentPage==this.totalPages){
        document.getElementById("nextPage")?.classList.add("disabled")
      }   
    }
  }

  prevPage(){
    document.getElementById("nextPage")?.classList.remove("disabled")
      if (this.currentPage=this.totalPages){
        this.currentPage = this.currentPage - 1;
        this.ngOnInit(this.currentPage)
        if(this.currentPage ==1){
          document.getElementById("prevPage")?.classList.add("disabled")     
        }
        
      }
  }

}
