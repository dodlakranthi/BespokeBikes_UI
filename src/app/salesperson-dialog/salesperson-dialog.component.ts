import { Component, Inject } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-salesperson-dialog',
  imports: [MatFormFieldModule,CommonModule,MatInputModule,MatButtonModule, MatDialogModule ,ReactiveFormsModule],
  templateUrl: './salesperson-dialog.component.html',
  styleUrl: './salesperson-dialog.component.scss'
})
export class SalespersonDialogComponent {

  salespersonForm: FormGroup; 

  constructor(public dialogRef: MatDialogRef<SalespersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.salespersonForm = new FormGroup({
      firstName: new FormControl(data?.firstName || '', Validators.required),
      lastName: new FormControl(data?.lastName || '', Validators.required),
      address: new FormControl(data?.address || '', Validators.required),
      phone: new FormControl(data?.phone || '', Validators.required),
      manager: new FormControl(data?.manager || '', Validators.required),
    });
  }

  onSubmit(): void {
    if (this.salespersonForm.valid) {
      const updatedForm = {
        salesPersonId: this.data?.salesPersonId,  
        startDate:this.data?.startDate,
        terminationDate: this.data?.terminationDate,
        ...this.salespersonForm.value  // Include the form values
      };
      console.log('Updated form:', updatedForm); 
      this.dialogRef.close(updatedForm);
    }
  }

  onCancel(): void {
    this.dialogRef.close(); 
  }
}
