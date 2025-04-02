import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user: any = { username: '', password: ''};

  constructor(private auth: AuthService, private router: Router) { }

  login() {
    this.auth.loginUser(this.user).subscribe({
      next: () => {
        this.auth.authenticate();
        this.router.navigate(['dashboard']);
      },
      error: () => {
        this.router.navigate(['invalid-data']);
      }
    });
  }
}
