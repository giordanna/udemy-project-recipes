import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>();

  constructor(private dataService: DataStorageService,
              private auth: AuthService) { }

  ngOnInit() {
  }

  onSaveData() {
    this.dataService.saveData().subscribe();
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  onFetchData() {

    this.dataService.fetchData();
  }

  logout() {
    this.auth.logoutUser();
  }

}
