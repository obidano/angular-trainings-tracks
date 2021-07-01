import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {WelcomeComponent} from "../pages/welcome/welcome.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {LoginComponent} from "./login/login.component";
import {TrainingComponent} from "../pages/training/training.component";

const routes: Routes = [
  {path: 'signup', component: SignUpComponent},
  {path: 'login', component: LoginComponent},
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRouteModule{

}
