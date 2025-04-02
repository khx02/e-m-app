import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Package } from '../models/package.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-package.component.html',
  styleUrl: './update-package.component.css'
})
export class UpdatePackageComponent {

  packageDb: Package[] = [];
  b: any = {package_id: '', package_destination: '' };
  
    constructor(private db: DatabaseService, private router: Router) {}
  
    ngOnInit() {
      this.db.getPackages().subscribe((data: any) => {
        this.packageDb = data;
      });
    }
  
    updatePackage() {
      this.db.updatePackage(this.b).subscribe({
        next: () => {
          this.router.navigate(['packages']); 
        },
        error: () => {
          this.router.navigate(['invalid-data']);
        }
      });
    }
}
