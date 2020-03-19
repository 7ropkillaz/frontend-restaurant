import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import {Dish} from '../models/Dish';
import Table = WebAssembly.Table;


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

  columnsToDisplay = ['id', 'name', 'price', 'category'];
  id: number;
  name: string;
  price: number;
  category: string;



  ngOnInit(): void {
    //todo посмотреть и запомнить жизненный цикл комп-ты
    let dataFromServer: Dish[] = [
      {id: 1, name: 'purump', category: 'dumdump', price:281 }
    ];
    this.listDishes=dataFromServer;

  }

  removeDishById() {
    for (let i = 0; i <this.listDishes.length ; i++) {
      if(this.listDishes[i].id==this.id){
        this.listDishes.splice(i,1);
        console.log(this.id);
        this.tableOfDishes.renderRows();
      }

    }
  }

  addDish(){
    let dish: Dish={id:this.id, name:this.name, price:this.price, category:this.category };
    this.listDishes.push(dish);
    console.log(this.listDishes);
    this.tableOfDishes.renderRows();

  }

  updateDish(){
    for (let i = 0; i <this.listDishes.length ; i++) {
      if (this.listDishes[i].id == this.id) {
        let temp: Dish = {id: this.id, name: this.name, price: this.price, category: this.category};
        this.listDishes.splice(i, 1);
        this.listDishes.push(temp);
        console.log(this.listDishes);
        this.tableOfDishes.renderRows();
      }
    }
  }

}
