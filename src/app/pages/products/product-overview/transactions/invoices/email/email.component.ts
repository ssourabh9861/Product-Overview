import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';


@Component({
  selector: 'ngx-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  constructor(protected windowRef: NbWindowRef) { }


  ngOnInit() {
  }

  close() {
    this.windowRef.close();
  }

}
