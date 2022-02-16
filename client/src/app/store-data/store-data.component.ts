import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { Customer } from '../models/customer.model';
import { Transcation } from '../models/transcation.model';

@Component({
  selector: 'app-store-data',
  templateUrl: './store-data.component.html',
  styleUrls: ['./store-data.component.scss'],
  // styles: [`
  //       :host ::ng-deep .p-dialog .product-image {
  //           width: 150px;
  //           margin: 0 auto 2rem auto;
  //           display: block;
  //       }
  //   `],
  providers: [ConfirmationService]
})
export class StoreDataComponent implements OnInit {

  customers: Customer[];

  transactionDialog: boolean;

  transactions: Transcation[];

  transaction: Transcation;

  submitted: boolean;

  constructor(private dataService: DataService, private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  async ngOnInit() {
    this.transactions = await this.dataService.getTranscations().toPromise();
    this.customers = await this.dataService.getCustomers().toPromise();
  }

  openNew() {
    this.transaction = {} as Transcation;
    this.submitted = false;
    this.transactionDialog = true;
  }

  editTransaction(transaction: Transcation) {
    this.transaction = { ...transaction };
    this.transaction.customer = this.customers.find(c => c.customer_id === this.transaction.customer.customer_id)!;
    this.transactionDialog = true;
  }

  deleteTranscation(transaction: Transcation) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + transaction.sale_id + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        try {
          await this.dataService.deleteTransaction(transaction._id);

          this.transactions = this.transactions.filter(val => val.sale_id !== transaction.sale_id);
          this.transaction = {} as Transcation;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Transcation Deleted', life: 3000 });
        } catch (error: any) {
          this.messageService.add({ severity: 'error', summary: 'Failed', detail: error, life: 3000 });
        }
      }
    });
  }

  hideDialog() {
    this.transactionDialog = false;
    this.submitted = false;
  }

  async saveTranscation() {
    this.submitted = true;

    if (this.transaction.product_id.trim()) {
      try {
        if (this.transaction.sale_id) {
          await this.dataService.updateTransaction(this.transaction._id, this.transaction);
          this.transactions[this.findIndexBySaleId(this.transaction._id)] = this.transaction;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Transcation Updated', life: 3000 });
        }
        else {
          const transcation = await this.dataService.createTransaction(this.transaction);
          this.transaction = { ...transcation };
          this.transactions.push(this.transaction);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Transcation Created', life: 3000 });
        }

        this.transactions = [...this.transactions];
        this.transactionDialog = false;
        this.transaction = {} as Transcation;
      } catch (error: any) {
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: error, life: 3000 });
      }
    }
  }

  findIndexBySaleId(id: string): number {
    let index = -1;
    for (let i = 0; i < this.transactions.length; i++) {
      if (this.transactions[i]._id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
