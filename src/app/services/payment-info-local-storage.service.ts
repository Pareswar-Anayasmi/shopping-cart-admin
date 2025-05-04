import { Injectable, signal } from '@angular/core';
import { PaymentInfoData } from '../../type';

@Injectable({
  providedIn: 'root',
})
export class PaymentInfoLocalStorageService {
  private readonly key = 'ng_e_commerce_payment_info';

  paymentInfoData = signal<PaymentInfoData | null>(this.loadData());

  private loadData(): PaymentInfoData | null {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : null;
  }

  saveData(item: PaymentInfoData) {
    localStorage.setItem(this.key, JSON.stringify(item));
    this.paymentInfoData.set(item); // Update the signal
  }

  clearItem() {
    localStorage.removeItem(this.key);
    this.paymentInfoData.set(null);
  }
}
