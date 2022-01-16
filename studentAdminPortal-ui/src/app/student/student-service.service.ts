import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';
import { UpdateStudentRequest } from '../models/api-models/update-student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  private baseApiURL = 'https://localhost:44389';

  constructor(private httpClient: HttpClient) { }

  getAllStudents(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(this.baseApiURL +'/students')
  }
  getStudent(studentId: string): Observable<Student> {
    return this.httpClient.get<Student>(this.baseApiURL + '/students/' + studentId)
  }
  updateStudent(studentId: string, studentRequest: Student): Observable<Student> {
    const updateStudentRequest: UpdateStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress
    }

    return this.httpClient.put<Student>(this.baseApiURL + '/students/' + studentId, updateStudentRequest);
  } 
}
