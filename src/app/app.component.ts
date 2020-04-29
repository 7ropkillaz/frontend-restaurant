import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {FormControl, FormsModule} from '@angular/forms';
import {Dish} from '../models/Dish';
import Table = WebAssembly.Table;
import {DataService} from '../service/data.service';
import {HttpService} from '../service/http.service';
import {error} from 'util';


/**
 * @title Table dynamically changing the columns displayed
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  @ViewChild("tableOfDishes", {static: false})
  tableOfDishes: MatTable<any>;
  listDishes: Dish[] = [];
  myControl = new FormControl();
  options: string[]=[];
  columnsToDisplay = ['id', 'name', 'price', 'category'];
  id: number;
  name: string;
  price: number;
  category: string;
  constructor(private dataService: DataService, private httpService:HttpService){}


  ngOnInit(): void {
    //todo посмотреть и запомнить жизненный цикл компоты
    let dataFromServer: Dish[] = [
      {id: 1, name: 'purump', category: 'dumdump', price:281 }
    ];
    this.options=this.dataService.getData();
    this.listDishes=dataFromServer;
    this.httpService.getData().subscribe((data:Dish[]) => {
      console.log(data);
      this.listDishes=data
    });

  }

  removeDishById() {
    for (let i = 0; i <this.listDishes.length ; i++) {
      if(this.listDishes[i].id==this.id){
        this.listDishes.splice(i,1);
        console.log(this.id);
        this.httpService.deleteData(this.id.toString()).subscribe(
          (data:Dish)=>{
            console.log(data);
          }
        )
        this.tableOfDishes.renderRows();
      }
    }
  }

  addDish(){
    let dish: Dish={id:this.id, name:this.name, price:this.price, category:this.category };
    if(this.id!=null && this.id>0 && this.price>0 && this.name!="" && this.name!=null && this.category!=null){
      for (let i = 0; i <this.listDishes.length ; i++) {
        if(this.listDishes[i].id == this.id){
          alert("Введены некорректные данные");
          return;
        }
      }
    this.listDishes.push(dish);
    this.dataService.addData(this.category);
    this.tableOfDishes.renderRows();
    this.httpService.addData(dish).subscribe(
      ()=>{console.log("OK!")},
      error1 => {alert("ERROR!!!")}
    );
    console.log(this.listDishes);
    }
    else (alert("Введены некорректные данные"))
  }

  updateDish(){
    for (let i = 0; i <this.listDishes.length ; i++) {
      if (this.listDishes[i].id == this.id) {
        let temp: Dish = {id: this.id, name: this.name, price: this.price, category: this.category};
        this.listDishes.splice(i, 1);
        this.listDishes.push(temp);
        this.httpService.updateData(temp).subscribe(
          ()=>{console.log("OK!")},
          error1 => {alert("ERROR!!!")}
        );
        console.log(this.listDishes);
        this.tableOfDishes.renderRows();
      }
    }
  }
}
