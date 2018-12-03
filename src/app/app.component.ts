import {Component, OnInit} from '@angular/core';
import { initializeApp } from 'firebase';
import {environment} from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    initializeApp({
      apiKey: environment.apiKey,
      authDomain: environment.authDomain,
    });
  }
}
