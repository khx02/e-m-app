import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Package } from '../models/package.model';

const api = '/33491968/hong/api/v1';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  addDriver(driver: any) {
    return this.http.post(`${api}/drivers/add`, driver);
  }

  updateDriver(b: any) {
    return this.http.put(`${api}/drivers`, b);
  }

  getDrivers() {
    return this.http.get(`${api}/drivers`);
  }

  deleteDriver(driver_id: string) {
    return this.http.get(`${api}/drivers/delete?id=${driver_id}`);
  }

  getPackages() {
    return this.http.get(`${api}/packages`);
  }

  updatePackage(b: any) {
    return this.http.put(`${api}/packages`, b);
  }

  deletePackage(package_id: string) {
    return this.http.get(`${api}/packages/delete/${package_id}`);
  }

  addPackage(newPackage: Package) {
    return this.http.post(`${api}/packages/add`, newPackage);
  }
}
