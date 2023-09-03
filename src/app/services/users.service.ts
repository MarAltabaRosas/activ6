import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpClient = inject(HttpClient)
  private baseUrl: string = "https://peticiones.online/api/users";

  constructor() { }

  getAll(page: number): Promise<any> {
      return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}?page=${page}`))     
  }

  getById(id: string): Promise<any>{

    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/${id}`))
  }

  create(formValue: any): Promise<any>{
    return lastValueFrom(this.httpClient.post<any>(this.baseUrl, formValue))
  }

 update(formValue: any): Promise<any>{

    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}/${formValue._id}`, formValue))
  }

  delete(id: String): Promise<any>{
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/${id}`))
  }


}
