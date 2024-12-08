import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-product-dialog',
  imports: [MatFormFieldModule, CommonModule, MatInputModule, MatButtonModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss'
})
export class ProductDialogComponent {

  productForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productForm = new FormGroup({
      name: new FormControl(data?.name || '', Validators.required),
      manufacturer: new FormControl(data?.manufacturer || '', Validators.required),
      style: new FormControl(data?.style || '', Validators.required),
      purchasePrice: new FormControl(data?.purchasePrice || '', [Validators.required, Validators.min(0)]),
      salePrice: new FormControl(data?.salePrice || '', [Validators.required, Validators.min(0)]),
      quantityOnHand: new FormControl(data?.quantityOnHand || '', [Validators.required, Validators.min(0)]),
      commissionPercentage: new FormControl(data?.commissionPercentage || '', [Validators.required, Validators.min(0), Validators.max(100)]),
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const updatedForm ={
        productId: this.data?.productId,  
        ...this.productForm.value  // Include the form values
      }
      this.dialogRef.close(updatedForm);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
