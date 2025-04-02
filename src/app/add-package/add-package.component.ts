import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';
import { Package } from '../models/package.model';
import { Driver } from '../models/driver.model';

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-package.component.html',
  styleUrl: './add-package.component.css'
})
export class AddPackageComponent {

  package: Package;
  driversDb: Driver[] = [];

  constructor(private db: DatabaseService, private router: Router) {
    this.package = new Package();
  }

  ngOnInit() {
    this.db.getDrivers().subscribe((data: any) => {
      this.driversDb = data;
    });  
    
  }

  addPackage() {
    this.db.addPackage(this.package).subscribe({
      next: () => {
        this.router.navigate(['packages']); 
      },
      error: () => {
        this.router.navigate(['invalid-data']);
      }
    });
  }
}
