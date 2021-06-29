import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit, OnDestroy {
  productName = "AAAAAA"
  disabledText = 'CCCC'
  products:string[] = []
  productSubscription: Subscription = new Subscription();


  constructor(private ps: ProductService) {
    setTimeout(() => {
      this.productName = "BBBBB"
    }, 3000)
  }


  ngOnInit(): void {
    this.products = this.ps.getProducts()
    this.productSubscription = this.ps.productsUpdated.subscribe(() => {
      this.products = this.ps.getProducts()
    })

  }

  OnAddProduct = () => {
    // this.products.push(this.productName)
    this.ps.addProduct(this.productName)
  }

  productClick(value: string) {
    console.log("VAL", value)
  }


  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }

}
