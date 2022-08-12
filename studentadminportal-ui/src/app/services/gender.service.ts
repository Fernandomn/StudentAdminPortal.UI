import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiGender } from '../models/api-models/gender.model';

@Injectable({
  providedIn: 'root',
})
export class GenderService {
  private baseApiUrl = 'https://localhost:44384';

  constructor(private httpClient: HttpClient) {}

  getGenderList(): Observable<ApiGender[]> {
    return this.httpClient.get<ApiGender[]>(`${this.baseApiUrl}/genders`);
  }
}
