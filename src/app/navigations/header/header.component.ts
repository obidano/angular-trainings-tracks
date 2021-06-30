import {EventEmitter, Output} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggle = new EventEmitter()

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
  }

  onToggle() {
    this.toggle.emit()
  }

  onLogout() {
    this.auth.logout()
  }
}
