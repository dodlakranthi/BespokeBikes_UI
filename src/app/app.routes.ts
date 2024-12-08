import { Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { ProductsComponent } from './components/products/products.component';
import { QuarterlyReportComponent } from './components/quarterly-report/quarterly-report.component';
import { SalesComponent } from './components/sales/sales.component';
import { SalespersonsComponent } from './components/salespersons/salespersons.component';
import { CreateSaleComponent } from './components/create-sale/create-sale.component';

export const routes: Routes = [

  { path: 'salespersons', component: SalespersonsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'createnew-sale', component: CreateSaleComponent },
  { path: 'quarterly-report', component: QuarterlyReportComponent },
  { path: '', redirectTo: '/salespersons', pathMatch: 'full' },
];