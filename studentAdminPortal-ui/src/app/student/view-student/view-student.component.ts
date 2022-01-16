import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
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
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get('id');

        if (this.studentId) {
          this.studentService.getStudent(this.studentId)
            .subscribe(
              (successResponse) => {
                console.log(successResponse);
                this.student = successResponse;
              },
              (errorResponse) => {
                console.log(errorResponse);
              }
          );

          this.genderService.getGendersList()
            .subscribe(
              (successResponse) => {
                this.genderList = successResponse;
              },
              (errorResponse) => {
                console.log(errorResponse)
              }
            )
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
  onDelete() { };
}
