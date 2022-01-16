import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  private baseApiURL = 'https://localhost:44389'

  constructor(private httpClient: HttpClient) { }

  getAllStudents(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(this.baseApiURL +'/students')
  }
  getStudent(studentId: string): Observable<Student> {
    return this.httpClient.get<Student>(this.baseApiURL + '/students/' + studentId)
  }

}
