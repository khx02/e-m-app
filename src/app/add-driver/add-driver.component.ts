import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Driver } from '../models/driver.model';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.css'
})
export class AddDriverComponent {

  driver: Driver = new Driver();

  constructor(private db: DatabaseService, private router: Router) { }

  // addDriver() {
  //   this.db.addDriver(this.driver).subscribe(() => {
  //     this.router.navigate(['drivers']);
  //   });
  // }
  addDriver() {
    this.db.addDriver(this.driver).subscribe({
      next: () => {
        this.router.navigate(['drivers']);
      },
      error: () => {
        this.router.navigate(['invalid-data']);
      }
    });
  }
}
