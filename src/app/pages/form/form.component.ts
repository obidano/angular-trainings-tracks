import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  input = ''
  productSubscription: Subscription = new Subscription();
  products: string[] = []


  constructor(private ps: ProductService) {
  }

  ngOnInit(): void {
    this.products = this.ps.getProducts()
    this.productSubscription = this.ps.productsUpdated.subscribe(() => {
      this.products = this.ps.getProducts()
    })
  }

  onSubmit(form: any) {
    console.log('FORM', form)
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }
}
