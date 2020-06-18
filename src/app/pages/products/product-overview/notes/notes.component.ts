import { Component, OnInit,ViewChild } from '@angular/core';
import {NotesService} from './notes.service';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {Notes} from "../../data-variables/overview/notes";
@Component({
  selector: 'ngx-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  ELEMENT_DATA : Notes[];
  displayedColumns: string[] = ['creator_name','description','date'];
  dataSource  = new MatTableDataSource<Notes>(this.ELEMENT_DATA);

  constructor(private _notesService:NotesService) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this._notesService.getData().subscribe(data=>this.dataSource.data=data as Notes[]);
    this.dataSource.sort = this.sort;
  }

}

