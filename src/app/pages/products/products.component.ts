import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'products',
  styleUrls: ['./products.component.scss'],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      productId:{
        title: 'Number',
        type: 'string'
      },
      name: {
        title: 'Product Name',
        type: 'string',
      },
      type: {
        title: 'Category',
        type: 'string',
      },
      active: {
        title: 'Status' ,
        type: 'string' ,
      }

    },
  };

  public source: LocalDataSource = new LocalDataSource();
  public src:Promise<any> ;
  constructor(
    private service: SmartTableData,private route: ActivatedRoute,
    private router: Router  
  ) {
    const data = this.service.getProductData().subscribe(
      (data: any) => {
        this.source.load(data.content);
        this.src=this.source.getElements();
      }
    );
  }
  
  ngOnInit() {}

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  handleUpdatedUser(rowData) {
    this.source.update(rowData, rowData);  
  }

  onUserRowSelect(rowSelect:any){
    this.router.navigateByUrl('pages/products/product_overview/'+ rowSelect.data.id);
  }
}
