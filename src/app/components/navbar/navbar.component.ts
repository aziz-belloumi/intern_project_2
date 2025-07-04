import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {TitleComponent} from "../title/title.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

}
