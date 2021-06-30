import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter()
  authListener = new Subscription()
  isAuth?: boolean



  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.authListener = this.auth.isAuthChanged.subscribe(status => {
      this.isAuth = status;
    });
  }

  onClose() {
    this.close.emit()
  }

  onLogout() {
    this.onClose();
    this.auth.logout()

  }

  ngOnDestroy() {
    this.authListener.unsubscribe();
  }
}
