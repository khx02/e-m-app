import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Package } from '../models/package.model';
import { WeightConverterPipe } from '../pipe/weight-converter.pipe';
import { Driver } from '../models/driver.model';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-list-packages',
  standalone: true,
  imports: [WeightConverterPipe, UpperCasePipe],
  templateUrl: './list-packages.component.html',
  styleUrl: './list-packages.component.css'
})
export class ListPackagesComponent {

  packagesDb: Package[] = [];
  driversDb: Driver[] = [];
  currentDisplayedDriver: any = null;
  currentDisplayedPackage: any = null;

  constructor(protected db: DatabaseService) { }

  ngOnInit() {
    this.getPackages();
    this.getDrivers();
    this.currentDisplayedDriver = null;
  }

  getPackages(){
    this.db.getPackages().subscribe((data: any) => {
      this.packagesDb = data;
    });
  }

  getDrivers(){
    this.db.getDrivers().subscribe((data: any) => {
      this.driversDb = data;
    });
  }

  getDriverIdByMongoId(mongo_id: string): string | undefined {
    const driver = this.driversDb.find(driver => driver._id === mongo_id);
    return driver ? driver.driver_id : undefined;
  }

  listDrivers(p: Package){ 
    this.currentDisplayedDriver = this.driversDb.find(d => d._id === p.driver_id);
    this.currentDisplayedPackage = p;
  }
}
