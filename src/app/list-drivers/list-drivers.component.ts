import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Driver } from '../models/driver.model';
import { UpperCasePipe } from '@angular/common';
import { Package } from '../models/package.model';
import { WeightConverterPipe } from '../pipe/weight-converter.pipe';

@Component({
  selector: 'app-list-drivers',
  standalone: true,
  imports: [UpperCasePipe, WeightConverterPipe],
  templateUrl: './list-drivers.component.html',
  styleUrl: './list-drivers.component.css'
})
export class ListDriversComponent {

  protected driversDb: Driver[] = [];
  private packagesDb: Package[] = [];
  currentDisplayedDriver: any = {};
  currentDisplayedPackages: Package[] = [];
  emptyFlag = false;

  constructor(protected db: DatabaseService) { }

  ngOnInit() {
    this.getDrivers();
    this.getPackages();
    this.emptyFlag = false;
  }

  getDrivers() {
    this.db.getDrivers().subscribe((data: any) => {
      this.driversDb = data;
    });
  }

  getPackages() {
    this.db.getPackages().subscribe((data: any) => {
      this.packagesDb = data;
    });
  }

  listPackages(driver_id: string) {
    this.currentDisplayedDriver = this.driversDb.find(d => d._id === driver_id);
    this.currentDisplayedPackages = this.packagesDb.filter(p => p.driver_id === driver_id);
    this.emptyFlag = this.currentDisplayedPackages.length === 0;
  }
}
