import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiStudent } from '../models/api-models/student.model';
import { UpdateStudentRequest } from '../models/api-models/update-student-request.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseApiUrl = 'https://localhost:44384';

  constructor(private httpClient: HttpClient) {}

  getAllStudents(): Observable<ApiStudent[]> {
    return this.httpClient.get<ApiStudent[]>(this.baseApiUrl + '/Students');
  }

  getStudent(studentId: string): Observable<ApiStudent> {
    return this.httpClient.get<ApiStudent>(
      `${this.baseApiUrl}/Students/${studentId}`
    );
  }

  updateStudent(
    studentId: string,
    studentRequest: ApiStudent
  ): Observable<ApiStudent> {
    const updateStudentRequest: UpdateStudentRequest = {
      ...studentRequest,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress,
    };

    return this.httpClient.put<ApiStudent>(
      `${this.baseApiUrl}/Students/${studentId}`,
      updateStudentRequest
    );
  }

  deleteStudent(studentId: string): Observable<ApiStudent> {
    return this.httpClient.delete<ApiStudent>(
      `${this.baseApiUrl}/Students/${studentId}`
    );
  }
}
