import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ProductDialogComponent } from '../../product-dialog/product-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-products',
  imports: [FormsModule,MatCardModule,CommonModule, MatTableModule,
    MatButtonModule,MatFormFieldModule,MatDialogModule ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products: any[] = [];
  editMode: number | null = null;

  displayedColumns: string[] = ['name', 'manufacturer','style', 'purchasePrice', 'salePrice', 'quantityOnHand', 'commissionPercentage' ,'action'];

  constructor(private apiService:ApiService, private dialog :MatDialog) {}

  ngOnInit(): void {
    this.apiService.getProducts().subscribe({
      next: (data) => {
        this.products =  data as any[];
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  openAddForm(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '450px', 
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.products.push(result);  
      }
    });
  }

  // Open the dialog to edit an existing product
  openEditForm(product: any): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '450px', 
      data: product, 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.updateProduct(result.productId, result)
        .subscribe({
          next: (response) => {
            alert('Product updated successfully!');  
            this.ngOnInit();
          },
          error: (error) => {
            alert('Failed to update product. Please try again later.'); 
          }
        });
      }
    });
  }
}
