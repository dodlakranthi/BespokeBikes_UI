import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card'; 
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'; 
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SalespersonDialogComponent } from '../../salesperson-dialog/salesperson-dialog.component';

@Component({
  selector: 'app-salespersons',
  imports: [FormsModule,MatCardModule,CommonModule, MatTableModule,
     MatButtonModule,MatFormFieldModule,MatDialogModule ],
  templateUrl: './salespersons.component.html',
  styleUrl: './salespersons.component.scss'
})
export class SalespersonsComponent {
  salespersons: any[] = [];
  editMode: number | null = null;
  displayedColumns: string[] = ['firstName', 'lastName', 'address', 'phone', 'startDate', 'terminationDate',  'manager', 'action'];
  showForm: boolean = false; 
  salespersonForm: FormGroup; 

  constructor(private apiService: ApiService ,private dialog: MatDialog) {
    this.salespersonForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      terminationDate: new FormControl('', Validators.required),
      manager: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.apiService.getSalespersons().subscribe({
      next: (data) => {
        this.salespersons = data as any[];
      },
      error: (error) => {
        console.error('Error fetching salespersons:', error);
      }
    });
  }

  openForm(): void {
    const dialogRef = this.dialog.open(SalespersonDialogComponent, {
      width: '400px', // Dialog size
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      
      }

    });
  }

  openEditForm(salesperson: any): void {
    const dialogRef = this.dialog.open(SalespersonDialogComponent, {
      width: '400px', 
      data: salesperson, 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      if (result) {
        this.apiService.updateSalesperson(result.salesPersonId, result)
        .subscribe({
          next: (response) => {
            alert('Salesperson updated successfully!');  
            this.ngOnInit();
          },
          error: (error) => {
            alert('Failed to update salesperson. Please try again later.'); 
          }
        });
      }
    });
  }

}
