import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../services/api.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-quarterly-report',
  imports: [FormsModule, MatCardModule, CommonModule, MatTableModule,
    MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule,ReactiveFormsModule],
  templateUrl: './quarterly-report.component.html',
  styleUrl: './quarterly-report.component.scss'
})
export class QuarterlyReportComponent {
  reportForm!: FormGroup;
  reportData: any;
  displayedColumns: string[] = ['salesPersonName', 'commissionEarned']; 

  constructor(private fb: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    this.reportForm = this.fb.group({
      year: ['', [Validators.required, Validators.min(1000), Validators.max(9999)]],
      quarter: ['', [Validators.required, Validators.min(1), Validators.max(4)]]
    });
  }

  // This function will be called when the form is valid and submitted
  generateReport(): void {
    if (this.reportForm.valid) {
      const formData = this.reportForm.value;
      const year = formData.year;
      const quarter = formData.quarter;

      this.apiService.getQuarterlyReport(year, quarter).subscribe(
        (report) => {
          this.reportData = report;
          console.log('Report data:', report);
          alert('Quarterly Report generated successfully!');
        },
        (error) => {
          console.error('Error fetching report:', error);
          alert('Failed to generate the report. Please try again later.');
        }
      );
    } else {
      alert('Please enter valid year and quarter values!');
    }
  }
}