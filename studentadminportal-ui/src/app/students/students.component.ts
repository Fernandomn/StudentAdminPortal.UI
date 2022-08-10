import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UiStudent } from '../models/ui-models/student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  students: UiStudent[] = [];
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'dateOfBirth',
    'email',
    'mobile',
    'gender',
    'edit'
  ];
  dataSource: MatTableDataSource<UiStudent> = new MatTableDataSource<UiStudent>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString: string = '';

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe({
      next: (successResponse) => {
        this.students = successResponse;
        this.dataSource = new MatTableDataSource<UiStudent>(this.students);

        if (this.matPaginator) {
          this.dataSource.paginator = this.matPaginator;
        }
        if (this.matSort) {
          this.dataSource.sort = this.matSort;
        }
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      },
    });
  }

  filterStudents() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }
}
