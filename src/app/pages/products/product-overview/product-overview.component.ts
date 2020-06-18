import { Component, OnInit, EventEmitter } from '@angular/core';
import { DataClientService } from "./dataservicesclient.service";
import {DataOverview} from "../data-variables/overview/data-overview";
import { Content } from "../data-variables/overview/content";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ngx-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent implements OnInit {
  product_Id;
  public data_product : Content[];
  contents: Content;
  status: boolean;
  navLinks = [
    {path:"overview",label:"Overview"},
    {path:"transactions/quotes",label:"Transactions"},
    {path:"notes",label:"Notes"},
  ];

  constructor(private _dataService: DataClientService,private route: ActivatedRoute,) { 

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.product_Id = params.get('id');  
    });

    this._dataService.getData().subscribe(data=> {
      for (let index = 0; index < data.content.length;  index++) {
        if(data.content[index].id == this.product_Id) {
          this.contents = data.content[index];
          this.status = data.content[index].active;
        }
        
      }
    })
      // this.data_product=data.content );
  }
  
  toogle(){
    this.status=!this.status;
    this._dataService.patchStatus(this.contents.id,this.status).subscribe();
  }
}

