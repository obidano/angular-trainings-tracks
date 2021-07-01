import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MypageComponent} from './pages/mypage/mypage.component';
import {FormsModule} from "@angular/forms";
import {ProductComponent} from './pages/product/product.component';
import {FormComponent} from './pages/form/form.component';
import {ProductService} from "./services/product.service";
import {AppRoutingModule} from "./modules/app-routing.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./modules/material.module";
import {HomeComponent} from './pages/home/home.component';
import {SignUpComponent} from './auth/sign-up/sign-up.component';
import {LoginComponent} from './auth/login/login.component';
import {TrainingComponent} from './pages/training/training.component';
import {CurrentTrainingComponent} from './pages/training/current-training/current-training.component';
import {NewTrainingComponent} from './pages/training/new-training/new-training.component';
import {PastTrainingComponent} from './pages/training/past-training/past-training.component';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {HeaderComponent} from './navigations/header/header.component';
import {SidenavComponent} from './navigations/sidenav/sidenav.component';
import {TrainingDialogComponent} from './pages/training/training-dialog/training-dialog.component';
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./guards/auth.guard";
import {TrainingService} from "./services/training.service";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";

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
    WelcomeComponent,
    HeaderComponent,
    SidenavComponent,
    TrainingDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [ProductService,
    AuthService,
    AuthGuard,
    TrainingService,
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},],
  bootstrap: [AppComponent]
})
export class AppModule {
}
