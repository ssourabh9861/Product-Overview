import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import { MigrateButtonComponent } from '../migrate-button/migrate-button.component';

@Component({
  selector: 'orders',
  styleUrls: ['./orders.component.scss'],
  templateUrl: './orders.component.html',
})
export class OrdersComponent {


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
      id: {
        title: 'ID',
        type: 'string',
      },
      subtotal_price: {
        title: 'Subtotal',
        type: 'number',
      },
      total_price: {
        title: 'Total',
        type: 'number',
      },
      deskera_id: {
        title: 'Deskera ID',
        type: 'custom',
        renderComponent: MigrateButtonComponent,
        valuePrepareFunction: (cell, row) => {
          return "INVOICE"
        },
        onComponentInitFunction: (instance) => {
          instance.updateResult.subscribe((rowData) => {
            this.handleUpdatedUser(rowData);
          });
        }
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: SmartTableData
  ) {
    const data = this.service.getOrderData().subscribe(
      (data: any) => {
        this.source.load(data.orders);
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
}
