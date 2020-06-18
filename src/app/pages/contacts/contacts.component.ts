import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import { MigrateButtonComponent } from '../migrate-button/migrate-button.component';

@Component({
  selector: 'contacts',
  styleUrls: ['./contacts.component.scss'],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent {


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
      first_name: {
        title: 'First Name',
        type: 'string',
      },
      last_name: {
        title: 'Last Name',
        type: 'string',
      },
      deskera_id: {
        title: 'Deskera ID',
        type: 'custom',
        renderComponent: MigrateButtonComponent,
        valuePrepareFunction: (cell, row) => {
          return "CONTACT"
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
    const data = this.service.getContactData().subscribe(
      (data: any) => {
        this.source.load(data.customers);
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
