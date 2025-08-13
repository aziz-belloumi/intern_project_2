import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-user-info-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-info-card.component.html',
  styleUrls: ['./user-info-card.component.css']
})
export class UserInfoCardComponent{
  @Input() user: User | null = null;
}
