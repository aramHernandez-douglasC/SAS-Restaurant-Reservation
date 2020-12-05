import {Component, OnInit} from '@angular/core';
import {MenuItemService} from './../../service/menu-item.service';
import {MenuItem} from '../../model/MenuItem';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuTable: MenuItem[] = [];
  menuTableDataSource = new MatTableDataSource(this.menuTable);
  displayedColumns: string[] = [
    'Item',
    'Price'
  ];

  constructor(private dataService: MenuItemService) {
  }

  ngOnInit(): void {
    this.dataService.getAllItems().subscribe((result) => {
      this.menuTable = result;
      this.menuTableDataSource.data = this.menuTable;
      console.log(this.menuTableDataSource);
      console.log(this.menuTable);
    });
  }

}
