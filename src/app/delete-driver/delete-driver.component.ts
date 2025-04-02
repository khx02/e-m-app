import { Component } from '@angular/core';
import { ListDriversComponent } from '../list-drivers/list-drivers.component';
import { DatabaseService } from '../services/database.service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-delete-driver',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './delete-driver.component.html',
  styleUrl: './delete-driver.component.css'
})
export class DeleteDriverComponent extends ListDriversComponent{

  constructor(db: DatabaseService) {
    super(db);
  }
  
  deleteDriver(driver_id: string) {
    this.db.deleteDriver(driver_id).subscribe(() => {
      this.getDrivers();
    });
  }
}
