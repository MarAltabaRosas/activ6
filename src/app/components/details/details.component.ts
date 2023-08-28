import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  oneUser!: User | any;


  /* ngOnInit(): void{
    this.activatedRoute.params.subscribe((params:any) => {
      let id = String(params.iduser);

      this.oneUser = this.usersServices.getById(id).subscribe
      ((response) => {
        console.log(response)
      });
    })
  } */

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async(params:any)=>{
      let id = String(params.iduser)
      console.log(id)

      this.oneUser = await this.usersServices.getById(id)
    })
  }

}
