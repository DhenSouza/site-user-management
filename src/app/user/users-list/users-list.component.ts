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

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.filterForm = this.fb.group({ search: [''] });
  }

  ngOnInit(): void {
    this.loadUsers();

      this.filterForm.get('search')?.valueChanges.subscribe(() => {
        this.page = 0; // reinicia a paginação se aplicável
      this.loadUsers();
      });
  }

  loadUsers(): void {
      const term = this.filterForm.get('search')?.value ?? '';
      this.userService.searchUsers(term, this.page, this.size).subscribe({
        next: (res: PageResponse<UserRequest>) => {
          this.users = res.content;
          this.totalElements = res.totalElements;
        },
        error: err => console.error('Erro ao buscar usuários:', err)
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

  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.successMessage = 'Usuário deletado com sucesso.';
        this.errorMessage = null;
        this.loadUsers(); // atualiza a lista se aplicável
        this.autoClearMessages();
      },
      error: (err) => {
        console.error('Erro ao deletar usuário:', err);
        this.successMessage = null;
        this.errorMessage = 'Erro ao deletar o usuário. Tente novamente.';
        this.autoClearMessages();
      }
    });
  }

  private autoClearMessages(): void {
    setTimeout(() => {
      this.successMessage = null;
      this.errorMessage = null;
    }, 3000);
  }

  trackById(_idx: number, user: UserRequest): string {
    return user.id;
  }
}
