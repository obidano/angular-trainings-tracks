import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MypageComponent} from './pages/mypage/mypage.component';
import {FormsModule} from "@angular/forms";
import {ProductComponent} from './pages/product/product.component';
import {FormComponent} from './pages/form/form.component';
import {ProductService} from "./product.service";
import {AppRoutingModule} from "./modules/app-routing.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./modules/material.module";
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './pages/training/training.component';
import { CurrentTrainingComponent } from './pages/current-training/current-training.component';
import { NewTrainingComponent } from './pages/new-training/new-training.component';
import { PastTrainingComponent } from './pages/past-training/past-training.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MAT_DATE_LOCALE} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    MypageComponent,
    ProductComponent,
    FormComponent,
    HomeComponent,
    SignUpComponent,
    LoginComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [ProductService, {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},],
  bootstrap: [AppComponent]
})
export class AppModule {
}
