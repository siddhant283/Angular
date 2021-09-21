import { Component, OnInit, AfterContentInit, ViewChild} from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatGridList } from '@angular/material/grid-list';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterContentInit {

 opened: boolean = false;

 @ViewChild('grid') grid: MatGridList;
 @ViewChild('internalGrid') internalGrid: MatGridList;

 gridByBreakpoint = {
   xl: {cols: 2, rowHeight: "300px", rowHeightInternal: "150px"},
   lg: {cols: 2, rowHeight: "300px", rowHeightInternal: "150px"},
   md: {cols: 2, rowHeight: "300px", rowHeightInternal: "150px"},
   sm: {cols: 1, rowHeight: "400px", rowHeightInternal: "200px"},
   xs: {cols: 1, rowHeight: "400px", rowHeightInternal: "200px"}
 }
 
 tiles: Tile[] = [
  {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
  {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
  {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
  {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
];
  
  constructor(private observableMedia: MediaObserver) {}

  ngAfterContentInit() {
    this.observableMedia.media$.subscribe((change: any) => {
      this.grid.cols = this.gridByBreakpoint[change.mqAlias].cols;
      this.grid.rowHeight = this.gridByBreakpoint[change.mqAlias].rowHeight;
      this.internalGrid.rowHeight = this.gridByBreakpoint[change.mqAlias].rowHeight;
      console.log("Alias Size", change);
      console.log("I am changing size" + this.grid.cols);
    });
  }

}
