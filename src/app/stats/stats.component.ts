import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {

  stats: any = { Create: 0, Read: 0, Update: 0, Delete: 0 };

  constructor(private http: HttpClient) {
    this.http.get('/33491968/hong/api/v1/stats').subscribe((data) => {
      this.stats = data;
    });
  }
}
