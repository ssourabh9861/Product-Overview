import { Component, OnInit,ViewChild,TemplateRef  } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import { ActivatedRoute } from '@angular/router';
import { IQuoteContent } from '../../../data-variables/transactions_data/quotes_content';
import { Content } from '../../../data-variables/overview/content';
import { DataClientService } from "../../dataservicesclient.service";
import { DataService } from "../../dataservice.service";
import { NbWindowService, NbWindowRef } from '@nebular/theme';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ngx-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  ELEMENT_DATA : IQuoteContent[];
  displayedColumns : string[] = ['sno','documentSequenceCode','validTillDate','totalAmount','fulfillmentStatus','action'];
  dataSource = new MatTableDataSource<IQuoteContent>(this.ELEMENT_DATA);

  public ID;
  product_Id;
  public Code;
  windowRef : NbWindowRef;
  mailData: FormGroup;
  
  @ViewChild(MatPaginator,{static:true}) paginator : MatPaginator;
  @ViewChild(MatSort,{static:true}) sort : MatSort;
  @ViewChild('contentTemplate', {static: false}) contentTemplate: TemplateRef<any>;

  constructor( private fb: FormBuilder, private windowService: NbWindowService, private route:ActivatedRoute, private _dataService: DataClientService, private dataService: DataService) { }

  ngOnInit(): void {

    this.route.parent.parent.paramMap.subscribe(params => {
      this.ID = params.get('id');  
    });

    this._dataService.getData().subscribe(data=> {
      for (let index = 0; index < data.content.length;  index++) {
        if(data.content[index].id == this.ID) {
          this.product_Id = data.content[index].productId;
          this.dataService.getQuotes(this.product_Id).subscribe((data)=>{this.dataSource.data = data.content as IQuoteContent[];console.log(this.dataSource.data)});
        }
      }
    })

    //this._transactionService.getData().subscribe(data=>this.dataSource.data=data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.mailData = this.fb.group({
      sender: '',
      subject: '',
      body: ''
    });
    this.mailData.valueChanges.subscribe(console.log);
  }

  openWindow(element: IQuoteContent) {
    // this.windowService.open(EmailComponent, { title: `Send Email` });
     this.windowRef = this.windowService.open(
      this.contentTemplate,
      { title: 'Window content from template', context: { text: 'some text to pass into template' } },
    );
  }

  onSubmit(){
    console.log(this.mailData.value);
  }
  close(){
    this.windowRef.close();
  }
}
