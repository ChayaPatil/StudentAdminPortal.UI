import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from '../../models/ui-models/gender.model';
import { Student } from '../../models/ui-models/student.model';
import { GenderService } from '../../services/gender.service';
import { StudentServiceService } from '../student-service.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  studentId: string | undefined | null;
  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    genderId: '',
    profileImageUrl: '',
    gender: {
      id: '',
      description: ''
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: ''
    }
  };
  genderList: Gender[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private readonly studentService: StudentServiceService,
    private readonly route: ActivatedRoute,
    private genderService: GenderService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  isNewStudent = true;
  header = '';
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get('id');

        if (this.studentId) {
          this.genderService.getGendersList()
            .subscribe(
              (successResponse) => {
                this.genderList = successResponse;
              },
              (errorResponse) => {
                console.log(errorResponse)
              }
            )
          if (this.studentId.toLowerCase() === 'Add'.toLowerCase()) {
            this.isNewStudent = true;
            this.header = 'Add New Student';
          } else {
            this.isNewStudent = false;
            this.header = 'Edit Student';
            this.studentService.getStudent(this.studentId)
              .subscribe(
                (successResponse) => {
                  this.student = successResponse;
                },
                (errorResponse) => {
                  console.log(errorResponse);
                }
              );            
          }
          
        }
      }
    )
  };

  onUpdate(): void {
    this.studentService.updateStudent(this.student.id, this.student)
      .subscribe(
        (successResponse) => {
          this.snackbar.open('Student updated successfully', undefined, {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
          });
        },
        errorResponse => {
          console.log(errorResponse);
        }
      )
  };
  onDelete() {
    this.studentService.deleteStudent(this.student.id)
      .subscribe(
        (successResponse) => {
          this.snackbar.open('Student Deleted successfully', undefined, {
            duration:2000
          });
          setTimeout(() => {
            this.router.navigateByUrl('students');
          }, 2000);
        },
        errorResponse => {
          console.log(errorResponse);
        }
      )
  };

  onAdd() {
    this.studentService.addStudent(this.student)
      .subscribe(
        (successResponse) => {
          this.snackbar.open('Student created successfully', undefined, {
            duration:2000
          });
          setTimeout(() => {
            this.router.navigateByUrl(`students/${successResponse.id}`);
          }, 2000);
        },
        errorResponse => {
          console.log(errorResponse);
        }
      )
  }
}
