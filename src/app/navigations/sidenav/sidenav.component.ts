import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() close = new EventEmitter()


  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
  }

  onClose() {
    this.close.emit()
  }

  onLogout() {
    this.onClose();
    this.auth.logout()

  }
}
