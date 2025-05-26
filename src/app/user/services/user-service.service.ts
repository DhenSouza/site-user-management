import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserRequest } from '../models/CreateUserRequest';
import { UserRequest } from '../models/UserRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  createUser(data: CreateUserRequest): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    console.log("header: ", headers)
    console.log("data: ", data)

    var url = this.API_URL + "/users"

    return this.http.post(url, data, { headers });
  }

  listUsers(data: UserRequest): Observable<any>{
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    var url = this.API_URL + "/users"

    return this.http.get(url, { headers });
  }
}
