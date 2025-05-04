import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';

export const routes: Routes = [
  { path: '', title: 'Shopzo - Login', component: LoginComponent },
  {
    path: 'orders',
    title: 'Admin - Orders',
    component: OrderDetailsComponent,
  },
];
