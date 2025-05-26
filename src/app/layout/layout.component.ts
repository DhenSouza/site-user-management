import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InitialMenuComponent } from '../menu/initial-menu/initial-menu.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, InitialMenuComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

}
