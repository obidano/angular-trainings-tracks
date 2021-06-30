import {EventEmitter, OnDestroy, Output} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggle = new EventEmitter()
  authListener = new Subscription()
  isAuth?: boolean


  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.authListener = this.auth.isAuthChanged.subscribe(status => {
      this.isAuth = status;
    });
  }

  onToggle() {
    this.toggle.emit()
  }

  onLogout() {
    this.auth.logout()
  }

  ngOnDestroy(){
    this.authListener.unsubscribe();
  }
}
