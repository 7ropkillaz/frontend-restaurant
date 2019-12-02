import {Component} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  price: number;
  category: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Liquor', price: 111, category: 'Alcohol'},
  {position: 2, name: 'Borscht', price: 222, category: 'Soup'},
  {position: 3, name: 'Pumpkin soup', price: 333, category: 'Soup'},
  {position: 4, name: 'Mushroom soup', price: 444, category: 'Soup'},
  {position: 5, name: 'Pudding', price: 555, category: 'Dessert'},
  {position: 6, name: 'Cranahan', price: 6666, category: 'Dessert'},
  {position: 7, name: 'Tiramisu', price: 777, category: 'Dessert'},
  {position: 8, name: 'Caesar', price: 8888, category: 'Salad'},
  {position: 9, name: 'Olivie', price: 9999, category: 'Salad'},
  {position: 10, name: 'The vinaigrette', price: 111, category: 'Salad'},
];

/**
 * @title Table dynamically changing the columns displayed
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'RestaurantAngular';
  displayedColumns: string[] = ['select', 'position', 'name', 'price', 'category'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: PeriodicElement[] = ELEMENT_DATA;

  addColumn() {
    const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
  }

  remove() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
