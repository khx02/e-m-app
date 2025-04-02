import { Component } from '@angular/core';
import { ListPackagesComponent } from '../list-packages/list-packages.component';
import { DatabaseService } from '../services/database.service';
import { WeightConverterPipe } from '../pipe/weight-converter.pipe';
import io from 'socket.io-client';
import { Package } from '../models/package.model';


@Component({
  selector: 'app-generative-ai',
  standalone: true,
  imports: [WeightConverterPipe],
  templateUrl: './generative-ai.component.html',
  styleUrl: './generative-ai.component.css'
})
export class GenerativeAiComponent extends ListPackagesComponent{

  socket: any;
  result: string[] = [];

  constructor(db: DatabaseService) {
    super(db);
    this.socket = io();
  }

  generateAi(p: Package): void {
    this.socket.emit('generateAI', p.package_destination);
    this.socket.on('generateAI', (res: string[]) => {
      this.result = res;
    })
  }
}
