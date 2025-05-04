import { Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule, HeaderComponent, FooterComponent],
  template: `
    <app-header />
    <div class="mt-28 pb-10 px-6" [ngClass]="theme">
      <div *ngIf="orders.length === 0" class="no-orders">No orders found.</div>

      <div *ngIf="orders.length > 0" class="table-wrapper">
        <table class="responsive-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Shipping</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let order of orders">
              <td>
                <span>
                  {{ order.order_custom_id }}
                </span>
              </td>
              <td>{{ order.order_status }}</td>
              <td>\₹{{ order.order_total }}</td>
              <td>{{ order.payment_method }}</td>
              <td>{{ order.shipping_method }}</td>
              <td class="actions" >
                <button (click)="action(order,'Approve')" *ngIf="order.order_status === 'Pending'">Approve</button>
                <button (click)="action(order,'Cancel')" *ngIf="order.order_status === 'Pending'">Cancel</button>
                <button (click)="action(order,'Reject')" *ngIf="order.order_status === 'Pending'">Reject</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
   

    <dialog #checkoutSuccessDialog class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <div class="flex items-center justify-center w-full mb-4">
          <!-- <fa-icon [icon]="faCheckCircle" class="text-6xl text-emerald-500"></fa-icon> -->
        </div>
        <h3 class="text-xl font-bold text-center">{{actioned}} Successfully.</h3>
        <div class="modal-action">
          <form method="dialog">
            <button (click)="closeDialog()" class="btn btn-sm">Close</button>
          </form>
        </div>
      </div>
    </dialog>
    <app-footer />

  `,
  styles: [`
    .light .container {
      background-color: #fff;
      color: #000;
    }

    .dark .container {
      background-color: rgb(30, 30, 30);
      color: #ddd;
    }

    .no-orders {
      text-align: center;
      color: #ccc;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background-color: #fff;
      border-radius: 8px;
      overflow: hidden;
    }

    .dark table {
      background-color: #2a2a2a;
    }

    th, td {
      padding: 12px;
      border-bottom: 1px solid #333;
      text-align: left;
    }

    th {
      font-weight: 600;
    }

    .dark th {
      background-color: #2c2c2c;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    button {
      padding: 6px 10px;
      font-size: 13px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      color: #fff;
    }

    button:hover {
      opacity: 0.9;
    }

    button:nth-child(1) { background-color:rgb(163, 168, 165); }
    button:nth-child(2) { background-color:rgb(240, 202, 99); }
    button:nth-child(3) { background-color: #dc3545; }

    .light button {
      color: #000;
    }

    .light button:nth-child(1),
    .light button:nth-child(2),
    .light button:nth-child(3) {
      color: white;
    }

    .modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 50;
      background-color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow-y: auto;
      padding: 16px;
    }

    .modal-content {
      background-color: #ffffff;
      color: #000000;
      border-radius: 12px;
      padding: 24px;
      position: relative;
      max-width: 640px;
      width: 100%;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }

    .dark .modal-content {
      background-color: #2a2a2a;
      color: #ddd;
    }

    .modal-title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 16px;
    }

    .modal-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }

    .modal-table th,
    .modal-table td {
      padding: 10px;
      border-bottom: 1px solid #ccc;
    }

    .dark .modal-table th,
    .dark .modal-table td {
      border-color: #444;
    }

    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 20px;
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
    }

    .close-btn:hover {
      opacity: 0.7;
    }

    @media (max-width: 768px) {
      table, thead, tbody, th, td, tr {
        display: block;
      }

      thead {
        display: none;
      }

      tr {
        margin-bottom: 16px;
        border: 1px solid #333;
        border-radius: 8px;
        padding: 12px;
      }

      td {
        position: relative;
        padding-left: 50%;
      }

      td::before {
        position: absolute;
        top: 12px;
        left: 12px;
        width: 45%;
        font-weight: bold;
        white-space: nowrap;
      }

      td:nth-child(1)::before { content: "Order ID"; }
      td:nth-child(2)::before { content: "Status"; }
      td:nth-child(3)::before { content: "Total"; }
      td:nth-child(4)::before { content: "Payment"; }
      td:nth-child(5)::before { content: "Shipping"; }

      td.actions {
        flex-direction: column;
        padding-left: 0;
      }

      .modal-content {
        max-height: 90vh;
        overflow-y: auto;
      }

      .modal-table, .modal-table thead, .modal-table tbody, .modal-table th, .modal-table td, .modal-table tr {
        display: block;
        width: 100%;
      }

      .modal-table thead {
        display: none;
      }

      .modal-table tr {
        margin-bottom: 16px;
        border: 1px solid #444;
        border-radius: 8px;
        padding: 12px;
        background-color: inherit;
      }

      .modal-table td {
        position: relative;
        padding-left: 50%;
        border: none;
        border-bottom: 1px solid #444;
      }

      .modal-table td::before {
        position: absolute;
        top: 10px;
        left: 10px;
        width: 45%;
        font-weight: bold;
        white-space: nowrap;
      }

      .modal-table td:nth-child(1)::before { content: "Item Name"; }
      .modal-table td:nth-child(2)::before { content: "Qty"; }
      .modal-table td:nth-child(3)::before { content: "Unit Price"; }
      .modal-table td:nth-child(4)::before { content: "Total"; }
      .modal-table td:nth-child(5)::before { content: "SKU"; }
    }
  `]
})
export class OrderDetailsComponent implements OnInit {
  orders: any[] = [];
  theme: string = 'dark';
  showModal: boolean = false;
  selectedOrderItems: any[] = [];
  private readonly router = inject(Router);
  private checkoutSuccessDialog = viewChild<ElementRef<HTMLDialogElement>>('checkoutSuccessDialog');
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadThemeFromStorage();
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.http.get<any[]>('http://localhost:3000/orders')
      .subscribe({
        next: (data) => this.orders = data.filter(order => order.order_status === 'Pending'),
        error: (err) => console.error('Error fetching orders', err)
      });
  }

  loadThemeFromStorage(): void {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      this.theme = storedTheme;
      document.documentElement.setAttribute('data-theme', this.theme);
    }
  }



  actioned: string = '';
  action(order: any, action: string): void {
    const isDestructive = action === 'Cancel' || action === 'Reject';
  
    // Confirm before destructive actions
    if (isDestructive) {
      const confirmed = confirm(`Are you sure you want to ${action.toLowerCase()} this order?`);
      if (!confirmed) return;
    }
  
    this.actioned = action;
  
    const url = `http://localhost:3000/orders/${order.id}`;

    const body = {
       order_status:action,
       order_custom_id:order.order_custom_id,
       order_id:order.order_id
    }
  
    // Call API
    this.http.put(url, body).subscribe({
      next: () => {
        // Show modal if available
        const dialogRef = this.checkoutSuccessDialog()?.nativeElement;
        if (dialogRef) {
          dialogRef.showModal();
          setTimeout(() => {
            dialogRef.close();
          }, 2000);
        }
  
        // Refresh orders
        this.fetchOrders();
      },
      error: (err) => {
        console.error(`❌ Failed to ${action} order ${order.orderId}:`, err);
        alert(`Failed to ${action} the order. Please try again.`);
      }
    });
  }
  
  
  closeDialog() {
    this.checkoutSuccessDialog()?.nativeElement.close();
  }
  

  closeModal(): void {
    this.showModal = false;
  }
}
