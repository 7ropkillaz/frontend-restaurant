import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import {Dish} from '../models/Dish';



// const ELEMENT_DATA: ListOfDish[] = [
//  {position: 1, name: 'Liquor', price: 111, category: 'Alcohol'},
//  {position: 2, name: 'Borscht', price: 222, category: 'Soup'},
//  {position: 3, name: 'Pumpkin soup', price: 333, category: 'Soup'},
//  {position: 4, name: 'Mushroom soup', price: 444, category: 'Soup'},
//  {position: 5, name: 'Pudding', price: 555, category: 'Dessert'},
//  {position: 6, name: 'Cranahan', price: 6666, category: 'Dessert'},
//  {position: 7, name: 'Tiramisu', price: 777, category: 'Dessert'},
//  {position: 8, name: 'Caesar', price: 8888, category: 'Salad'},
//  {position: 9, name: 'Olivie', price: 9999, category: 'Salad'},
//  {position: 10, name: 'The vinaigrette', price: 111, category: 'Salad'},
// ];

/**
 * @title Table dynamically changing the columns displayed
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name: string;
  price: number;
  category: string;
  dishes: Dish[] = [];
  title = 'RestaurantAngular';
  displayedColumns: string[] = ['select', 'name', 'price', 'category'];
  dataSource = new MatTableDataSource<Dish[]>([this.dishes]);
  selection = new SelectionModel<Dish[]>(true, []);
  columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(private cdr: ChangeDetectorRef) {}


  addColumn() {
    const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
  }

  remove() {
    for (let i = 0; i < this.selection.selected.length; i++) {
      const name2: string = this.selection.selected[i][0];
      let index = -1;
      for (let j = 0; j < this.dishes.length; j++) {
        if (this.dishes[j].name === name2) {
          index = j;
        }
      }
      if (index > -1) {
        this.dishes.splice(index, 1);
      }
    }

    console.log(this.dishes.length);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Dish[]): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'};`;
  }
  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addDish() {
    const dish: Dish = {
      name: this.name,
      price: this.price,
      category: this.category
  };
    this.dishes.push(dish);
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    const dish: Dish = {
      name: 'test name',
      price: 2,
      category: 'category'
    };
    this.dishes.push(dish);
    console.log(this.dishes[0].name);
  }
}
