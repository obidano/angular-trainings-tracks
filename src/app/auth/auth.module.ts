import {NgModule} from "@angular/core";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {LoginComponent} from "./login/login.component";
import {SharedModule} from "../modules/shared.module";

@NgModule({
  declarations: [SignUpComponent,
    LoginComponent,],
  imports: [SharedModule],
  exports: [],
})

export class AuthModule {

}
