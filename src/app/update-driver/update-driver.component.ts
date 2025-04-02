import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Driver } from '../models/driver.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-driver.component.html',
  styleUrl: './update-driver.component.css'
})
export class UpdateDriverComponent {

  driversDb: Driver[] = [];
  b: any = {id: '', driver_licence: '', driver_department: ''};
  
    constructor(private db: DatabaseService, private router: Router) {}
  
    ngOnInit() {
      this.db.getDrivers().subscribe((data: any) => {
        this.driversDb = data;
      });
    }
  
    updateDriver() {
      this.db.updateDriver(this.b).subscribe({
        next: () => {
          this.router.navigate(['drivers']);
        },
        error: () => {
          this.router.navigate(['invalid-data']);
        }
      });
    }

}
