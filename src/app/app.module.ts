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
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {HeaderComponent} from './navigations/header/header.component';
import {SidenavComponent} from './navigations/sidenav/sidenav.component';
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./guards/auth.guard";
import {TrainingService} from "./services/training.service";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {UiService} from "./services/ui.service";
import {AuthModule} from "./auth/auth.module";
import {TrainingModule} from "./pages/training/training.module";

@NgModule({
  declarations: [
    AppComponent,
    MypageComponent,
    ProductComponent,
    FormComponent,
    HomeComponent,

    WelcomeComponent,
    HeaderComponent,
    SidenavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
  ],
  providers: [ProductService,
    AuthService,
    AuthGuard,
    TrainingService,
    UiService,
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},],
  bootstrap: [AppComponent]
})
export class AppModule {
}
