import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Dish} from '../models/Dish';

@Injectable()
export class HttpService{

  constructor(private http: HttpClient){ }

  getData(){
    return this.http.get('http://localhost:8080/get')
  }
  addData(dish:Dish){
    return this.http.post('http://localhost:8080/add', dish)
  }
  deleteData(id: string){
    return this.http.delete('http://localhost:8080/delete/'+ id)
  }
  updateData(dish:Dish, id: string){
    return this.http.put('http://localhost:8080/update/'+id, dish )
  }
}
