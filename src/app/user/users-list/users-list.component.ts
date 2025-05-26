import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserRequest } from '../models/UserRequest';
import { PageResponse } from '../models/PageResponse';
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: UserRequest[] = [];
  filterForm: FormGroup;
  page = 0;
  size = 20;
  totalElements = 0;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.filterForm = this.fb.group({ search: [''] });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.listUsers({} as UserRequest)
      .subscribe({
        next: (res: PageResponse<UserRequest>) => {
          this.users = res.content;
          this.totalElements = res.totalElements;
        },
        error: err => console.error('Erro ao carregar usuários:', err)
      });
  }

  get filteredUsers(): UserRequest[] {
    const term = this.filterForm.get('search')?.value?.toLowerCase() ?? '';
    if (!term) return this.users;
    return this.users.filter(u =>
      u.name.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      u.role.toLowerCase().includes(term)
    );
  }

  trackById(_idx: number, user: UserRequest): string {
    return user.id;
  }
}