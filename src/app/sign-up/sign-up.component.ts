import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  user: any = { username: '', password: '', con_password: '' };

  constructor(private auth: AuthService, private router: Router) { }

  signUp() {
    this.auth.registerUser(this.user).subscribe({
      next: (res) => {
        this.router.navigate(['login']);
      },
      error: (err) => {
        this.router.navigate(['invalid-data']);
      }
    });
  }
}
