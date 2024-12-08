import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-customers-dialog',
  imports: [MatFormFieldModule,CommonModule, MatInputModule,MatButtonModule, MatDialogModule ,ReactiveFormsModule],
  templateUrl: './customers-dialog.component.html',
  styleUrl: './customers-dialog.component.scss'
})
export class CustomersDialogComponent {
  customerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CustomersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize form with existing data if available (for editing)
    this.customerForm = new FormGroup({
      firstName: new FormControl(data?.firstName || '', Validators.required),
      lastName: new FormControl(data?.lastName || '', Validators.required),
      address: new FormControl(data?.address || '', Validators.required),
      phone: new FormControl(data?.phone || '', Validators.required),
      startDate: new FormControl(data?.startDate || '', Validators.required),
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.dialogRef.close(this.customerForm.value); // Close dialog and pass form data back to the parent component
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without submitting
  }
}
