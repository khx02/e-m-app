import { Component } from '@angular/core';
import { ListPackagesComponent } from '../list-packages/list-packages.component';
import { DatabaseService } from '../services/database.service';
import { WeightConverterPipe } from '../pipe/weight-converter.pipe';

@Component({
  selector: 'app-delete-package',
  standalone: true,
  imports: [WeightConverterPipe],
  templateUrl: './delete-package.component.html',
  styleUrl: './delete-package.component.css'
})
export class DeletePackageComponent extends ListPackagesComponent{

  constructor(db: DatabaseService) {
    super(db);
  }
  
  deletePackage(package_id: string) {
    this.db.deletePackage(package_id).subscribe(() => {
      this.getPackages();
    });
  }

}
