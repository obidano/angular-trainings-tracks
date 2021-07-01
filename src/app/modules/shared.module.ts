import {NgModule} from "@angular/core";
import {MaterialModule} from "./material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,

  ]
})
export class SharedModule {

}
