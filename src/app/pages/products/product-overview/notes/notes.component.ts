import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { NoteEditComponent } from './note-edit/note-edit.component';

@Component({
  selector: 'ngx-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  heroes = [{
    creator_name : 'Bayside Club',
    description : 'Quotes pending',
    date : '1 Feb 2020 4:30 am'
  },
  {creator_name : 'John Doe',
    description : '2 bills partially pending',
    date : '3 Mar 2020 7 pm'
  }];
  constructor(private windowService: NbWindowService) {}

  ngOnInit(): void {
  }
  openWindow() {
    this.windowService.open(NoteEditComponent, { title: `Edit Note` });
  }
  openWindow1() {
    this.windowService.open(NoteEditComponent, { title: `Create New Note` });
  } 
}

