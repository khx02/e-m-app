import { Component } from '@angular/core';
import { ListDriversComponent } from '../list-drivers/list-drivers.component';
import { FormsModule } from '@angular/forms';
import { WeightConverterPipe } from '../pipe/weight-converter.pipe';
import { UpperCasePipe } from '@angular/common';
import { DatabaseService } from '../services/database.service';
import { Driver } from '../models/driver.model';
import io from 'socket.io-client';

@Component({
  selector: 'app-text-to-speech',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, WeightConverterPipe],
  templateUrl: './text-to-speech.component.html',
  styleUrl: './text-to-speech.component.css'
})
export class TextToSpeechComponent extends ListDriversComponent{

  driverSelected: Driver | null = null;
  socket: any;
  savedFileName: string = '';

  constructor(db: DatabaseService) {
    super(db);
    this.socket = io();
  }

  textToSpeech(driver: Driver): void {
    this.socket.emit('textToSpeech', driver.driver_licence);
    this.socket.on('textToSpeech', (response: any) => {
      this.savedFileName = response;
      let audio = new Audio(this.savedFileName);
      audio.play();
    });
  }
}
