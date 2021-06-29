import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MypageComponent } from './pages/mypage/mypage.component';
import {FormsModule} from "@angular/forms";
import { ProductComponent } from './pages/product/product.component';
import { FormComponent } from './pages/form/form.component';
import {ProductService} from "./product.service";
import {AppRoutingModule} from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MypageComponent,
    ProductComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
