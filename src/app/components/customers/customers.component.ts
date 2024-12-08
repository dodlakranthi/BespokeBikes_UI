import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { CustomersDialogComponent } from '../../customers-dialog/customers-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-customers',
  imports: [FormsModule,MatCardModule,CommonModule, MatTableModule,
    MatButtonModule,MatFormFieldModule,MatDialogModule ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {

  customers: any[] = [];
  editMode: number | null = null;

  displayedColumns: string[] = ['firstName', 'lastName', 'address', 'phone', 'startDate', 'action'];


  constructor(private apiService: ApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.apiService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data as any[];
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
      }
    });
  }

  openAddForm(): void {
    const dialogRef = this.dialog.open(CustomersDialogComponent, {
      width: '400px', // Dialog width
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customers.push(result);  // Add the new customer to the list
      }
    });
  }

  // Open the dialog to edit an existing customer
  openEditForm(customer: any): void {
    const dialogRef = this.dialog.open(CustomersDialogComponent, {
      width: '400px',
      data: customer,
    });

    dialogRef.afterClosed().subscribe((result: { id: any; }) => {
      if (result) {

        const index = this.customers.findIndex(c => c.id === result.id);
        if (index !== -1) {
          this.customers[index] = result;
        }
      }
    });
  }

}
