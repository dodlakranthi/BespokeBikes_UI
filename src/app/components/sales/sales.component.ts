import { Component } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card'; 
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'; 
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-sales',
  imports: [FormsModule,MatCardModule,CommonModule, MatTableModule,
    MatButtonModule,MatFormFieldModule,MatDialogModule ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent {
  sales: any[] = [];
  editMode: number | null = null;
  displayedColumns: string[] = ['productName', 'customerName', 'saleDate', 'salePrice', 'discountedSalePrice', 'salesPerson',  'salesPersonCommission'];
  showForm: boolean = false; 
  salespersonForm: FormGroup | undefined;  

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.apiService.getSales().subscribe({
      next: (data) => {
        this.sales = data as any[];
      },
      error: (error) => {
        console.error('Error fetching salespersons:', error);
      }
    });
  }

}
