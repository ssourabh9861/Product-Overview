import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Content } from '../../data-variables/overview/content';
import { DataClientService } from "../dataservicesclient.service";
import { DataService } from "../dataservice.service";

@Component({
  selector: 'ngx-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  navLinks = [
    {path:"quotes",label:"Quotes", value: null},
    {path:"invoices",label:"Invoice", value: null},
    {path:"orders",label:"Orders", value: null},
    {path:"bills",label:"Bills", value: null},
  ];
  public ID;
  product_Id;
  public Code;
  public foundData : Content;

  constructor(private route:ActivatedRoute, private _dataService: DataClientService, private dataService: DataService) { }

  ngOnInit(): void {
    this.route.parent.paramMap.subscribe(params => {
      this.ID = params.get('id');  
    });

    this._dataService.getData().subscribe(data=> {
      for (let index = 0; index < data.content.length;  index++) {
        if(data.content[index].id == this.ID) {
          this.product_Id = data.content[index].productId;
          this.dataService.getQuotes(this.product_Id).subscribe((data)=>{this.navLinks[0].value = data.content.length ;});
          this.dataService.getInvoices(this.product_Id).subscribe((data)=>{this.navLinks[1].value = data.content.length ;});
          this.dataService.getOrders(this.product_Id).subscribe((data)=>{this.navLinks[2].value = data.content.length ;});
          this.dataService.getBills(this.product_Id).subscribe((data)=>{this.navLinks[3].value = data.content.length ;});

        }
      }
    })
  }

}
