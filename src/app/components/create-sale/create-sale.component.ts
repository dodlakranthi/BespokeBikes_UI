import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { forkJoin } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-sale',
  imports: [FormsModule, MatFormFieldModule, MatSelectModule,
    MatInputModule,
    MatButtonModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-sale.component.html',
  styleUrl: './create-sale.component.scss'
})
export class CreateSaleComponent implements OnInit {

  customers: any[] = [];
  products: any[] = [];
  salespersons: any[] = [];
  saleForm: FormGroup = new FormGroup({});

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    const today = new Date(); // Get the current date and time
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const year = today.getFullYear();

    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;

    const defaultDate = `${formattedMonth}/${formattedDay}/${year}`

    this.saleForm = new FormGroup({
      customerId: new FormControl(null, Validators.required),
      productId: new FormControl(null, Validators.required),
      salespersonId: new FormControl(null, Validators.required),
      saleDate: new FormControl(defaultDate, [Validators.required, this.dateValidator]),
    });

    forkJoin({
      customers: this.apiService.getCustomers(),
      products: this.apiService.getProducts(),
      salespersons: this.apiService.getSalespersons(),
    }).subscribe({
      next: (data) => {
        this.customers = data.customers;
        this.products = data.products;
        this.salespersons = data.salespersons;
      },
      error: (err) => {
        console.error('Error loading data:', err);
        alert('Failed to load data. Please try again later.');
      },
    });
  }

  //(mm/dd/yyyy)
  dateValidator(control: AbstractControl): ValidationErrors | null {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    return regex.test(control.value) ? null : { invalidDate: true };
  }

  createSale(): void {
    if (this.saleForm.valid) {

      const saleDateISO = new Date(this.saleForm.value.saleDate).toISOString();

      const updatedForm = {
        ...this.saleForm.value,
        saleDate: saleDateISO,
      };

      this.apiService.createSale(updatedForm).subscribe({
        next: () => {
          alert('Sale created successfully!');
          this.saleForm.reset();
        },
        error: (err) => alert('Failed to create sale: ' + err.message),
      });
    } else {
      alert('Please fix the errors in the form.');
    }
  }

}