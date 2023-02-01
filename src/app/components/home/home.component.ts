import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../../_models/user';
import { AuthenticationService } from '../../_services/authentication.service';

import { UserService } from '../../_services/user.service';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class HomeComponent implements OnInit {
  user?: User | null;

  constructor(private authenticationService: AuthenticationService, private userService: UserService) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    this.getProjects();
  }

  async getProjects() {
    const data = await lastValueFrom(this.userService.getProjects());
    console.log("data is", data);
  }

  logout() {
    this.authenticationService.logout();
  }

}
