import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender } from '../models/api-models/gender.model';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private baseApiURL = 'https://localhost:44389';

  constructor(private httpClient: HttpClient) { }

    getGendersList(): Observable < Gender[]>{
      return this.httpClient.get<Gender[]>(this.baseApiURL + '/genders')
    }

}
