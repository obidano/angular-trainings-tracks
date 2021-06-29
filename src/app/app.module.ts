import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MypageComponent } from './pages/mypage/mypage.component';
import {FormsModule} from "@angular/forms";
import { ProductComponent } from './pages/product/product.component';
import { FormComponent } from './pages/form/form.component';
import {ProductService} from "./product.service";

@NgModule({
  declarations: [
    AppComponent,
    MypageComponent,
    ProductComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
