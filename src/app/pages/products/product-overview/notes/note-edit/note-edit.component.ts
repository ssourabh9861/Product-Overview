import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss']
})
export class NoteEditComponent implements OnInit {

  constructor(protected windowRef: NbWindowRef) { }

  ngOnInit() {
  }
  
  close() {
    this.windowRef.close();
  }

}
