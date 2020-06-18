import { Component, OnInit,ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import { ActivatedRoute } from '@angular/router';
import { IOrderContent } from '../../../data-variables/transactions_data/orders_content';
import { Content } from '../../../data-variables/overview/content';
import { DataClientService } from "../../dataservicesclient.service";
import { DataService } from "../../dataservice.service";

@Component({
  selector: 'ngx-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
 
  ELEMENT_DATA : IOrderContent[];
  displayedColumns : string[] = ['sno','documentSequenceCode','dueDate','totalAmount','receiptStatus','action'];
  dataSource = new MatTableDataSource<IOrderContent>(this.ELEMENT_DATA);

  public ID;
  product_Id
  public invoice_data : IOrderContent[];

  @ViewChild(MatPaginator,{static:true}) paginator : MatPaginator;
  @ViewChild(MatSort,{static:true}) sort : MatSort;

  constructor(private route:ActivatedRoute, private _dataService: DataClientService, private dataService: DataService) { }

  ngOnInit(): void {

    this.route.parent.parent.paramMap.subscribe(params => {
      this.ID = params.get('id');  
    });  

    this._dataService.getData().subscribe(data=> {
      for (let index = 0; index < data.content.length;  index++) {
        if(data.content[index].id == this.ID) {
          this.product_Id = data.content[index].productId;
          this.dataService.getOrders(this.product_Id).subscribe((data)=>{this.dataSource.data = data.content as IOrderContent[];console.log(this.dataSource.data)});
        }
      }
    })

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
