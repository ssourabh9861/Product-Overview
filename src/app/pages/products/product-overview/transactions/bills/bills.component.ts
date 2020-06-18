
import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Content } from '../../../data-variables/overview/content';
import { DataClientService } from "../../dataservicesclient.service";
import { DataService } from "../../dataservice.service";
import { IBillContent } from '../../../data-variables/transactions_data/bills_content';


@Component({
  selector: 'ngx-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {

  ELEMENT_DATA : IBillContent[];
  displayedColumns : string[] = ['sno','purchaseInvoiceCode','purchaseInvoiceDate','totalAmount','paymentStatus','action'];
  dataSource = new MatTableDataSource<IBillContent>(this.ELEMENT_DATA);

  constructor(private route:ActivatedRoute, private _dataService: DataClientService, private dataService: DataService) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  public ID;
  product_Id;

  ngOnInit(): void {

    this.route.parent.parent.paramMap.subscribe(params => {
      this.ID = params.get('id');  
    });

    this._dataService.getData().subscribe(data=> {
      for (let index = 0; index < data.content.length;  index++) {
        if(data.content[index].id == this.ID) {
          this.product_Id = data.content[index].productId;
          this.dataService.getBills(this.product_Id).subscribe((data)=>{this.dataSource.data = data.content as IBillContent[];console.log(this.dataSource.data)});
        }
      }
    })
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
