import { Component } from '@angular/core';
import { WeightConverterPipe } from '../pipe/weight-converter.pipe';
import { Package } from '../models/package.model';
import { DatabaseService } from '../services/database.service';
import { ListPackagesComponent } from '../list-packages/list-packages.component';
import io from 'socket.io-client';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-translate',
  standalone: true,
  imports: [WeightConverterPipe, FormsModule],
  templateUrl: './translate.component.html',
  styleUrl: './translate.component.css'
})
export class TranslateComponent extends ListPackagesComponent {

  socket: any;
  target: string = 'en';
  translation: string[] = [];

  constructor(db: DatabaseService) {
    super(db);
    this.socket = io();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }
  
  translatePackage(p: Package): void {
    this.socket.emit('translate', p, this.target);
    this.socket.on('translate', (translation: string[]) => {
      this.translation = translation;
    })
  };
}
