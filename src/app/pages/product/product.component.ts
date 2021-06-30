import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() name: string = '';
  @Output() prodcutClicked = new EventEmitter()

  constructor(private ps:ProductService) {
  }

  ngOnInit(): void {
  }

  onClick() {
    this.prodcutClicked.emit(this.name + "jdjjd")
  }

  onDeleteClick() {
    this.ps.deleteProduct(this.name)
  }
}
