import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiStudent } from '../models/api-models/student.model';

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
}
