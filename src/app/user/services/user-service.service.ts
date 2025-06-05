import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserRequest } from '../models/CreateUserRequest';
import { UserRequest } from '../models/UserRequest';
import { PageResponse } from '../models/PageResponse';

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

  getUserById(id: string): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
      const url = `${this.API_URL}/users/${id}`;

      return this.http.get(url, { headers });
  }

  updateUser(id: string, data: any): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
      const url = `${this.API_URL}/users/${id}`;
      return this.http.put(url, data, { headers });
  }

  deleteUser(id: string): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
      const url = `${this.API_URL}/users/${id}`;
      return this.http.delete(url, { headers });
  }

  updateUserRole(id: string, role: string): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
      const body = { role };
      const url = `${this.API_URL}/users/${id}/privileges`;

      return this.http.patch(url, body, { headers });
  }

  searchUsers(search: string, page: number = 0, size: number = 20): Observable<PageResponse<UserRequest>> {
      const token = localStorage.getItem('token');

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      const params = {
        search,
        page: page.toString(),
        size: size.toString()
      };

      return this.http.get<PageResponse<UserRequest>>(`${this.API_URL}/users/search`, { headers, params });
  }




}
