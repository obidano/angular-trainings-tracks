import {Injectable} from '@angular/core';
import {Subject} from 'rxjs'
import {global} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = ['A book']
  productsUpdated = new Subject()

  addProduct(name: string) {
    this.products.push(name)
    this.productsUpdated.next()
  }

  getProducts() {
    return [...this.products]
  }

  constructor() {
  }

  deleteProduct(name: string) {
    this.products = this.products.filter(i => i != name)
    console.log('DELETE', name)
  }
}
