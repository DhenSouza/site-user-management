import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-initial-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './initial-menu.component.html',
  styleUrls: ['./initial-menu.component.scss']
})
export class InitialMenuComponent {

    constructor(private router: Router){}

    logout(): void {
      localStorage.clear(); 
      this.router.navigate(['/login']);
    }

}
