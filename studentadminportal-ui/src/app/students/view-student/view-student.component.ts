import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UiGender } from 'src/app/models/ui-models/gender.model';
import { UiStudent } from 'src/app/models/ui-models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss'],
})
export class ViewStudentComponent implements OnInit {
  studentId: string | null | undefined;
  student: UiStudent = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    profileImageUrl: '',
    genderId: '',
    gender: { id: '', description: '' },
    address: { id: '', physicalAddress: '', postalAddress: '' },
  };
  genderList: UiGender[] = [];
  isNewStudent: boolean = false;

  constructor(
    private readonly studentService: StudentService,
    private readonly route: ActivatedRoute,
    private readonly genderService: GenderService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  get headerText(): string {
    return this.isNewStudent ? 'Add New Student' : 'Edit Student';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.studentId = params.get('id');

      if (this.studentId) {
        this.isNewStudent = !!this.studentId.toLowerCase().match(/add/);

        if (!this.isNewStudent) {
          this.studentService.getStudent(this.studentId).subscribe({
            next: (successResponse) => {
              this.student = successResponse;
            },
            error: (errorResponse) => {
              console.error(errorResponse);
            },
          });
        }
      }

      this.genderService.getGenderList().subscribe({
        next: (successResponse) => {
          this.genderList = successResponse;
        },
        error: (errorResponse) => {
          console.error(errorResponse);
        },
      });
    });
  }

  onUpdate(): void {
    this.studentService.updateStudent(this.student.id, this.student).subscribe({
      next: (successResponse) => {
        if (successResponse) {
          this.snackBar.open('Student updated successfully', undefined, {
            duration: 2000,
          });
        }
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      },
    });
  }

  onDelete(): void {
    if (
      confirm(
        'Do you really want to delete this student? This operation is irreversible.'
      )
    ) {
      this.studentService.deleteStudent(this.student.id).subscribe({
        next: (successResponse) => {
          this.snackBar
            .open('Student deleted successfully', undefined, {
              duration: 2000,
            })
            .afterDismissed()
            .subscribe(() => {
              this.router.navigateByUrl('students');
            });
        },
        error: (errorResponse) => {
          console.error(errorResponse);
        },
      });
    }
  }

  onAdd(): void {
    this.studentService.addStudent(this.student).subscribe({
      next: (successResponse) => {
        if (successResponse) {
          this.snackBar
            .open('Student added successfully', undefined, {
              duration: 2000,
            })
            .afterDismissed()
            .subscribe(() => {
              this.router.navigateByUrl(`students/${successResponse.id}`);
            });
        }
      },
      error: (errorResponse) => {
        console.error(errorResponse);
      },
    });
  }
}
