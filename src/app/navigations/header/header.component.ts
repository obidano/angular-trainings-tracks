import {EventEmitter, Output} from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggle=new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onToggle(){
    this.toggle.emit()
  }

}
