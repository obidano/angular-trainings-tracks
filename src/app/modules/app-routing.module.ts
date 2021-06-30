import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MypageComponent} from "../pages/mypage/mypage.component";
import {FormComponent} from "../pages/form/form.component";
import {HomeComponent} from "../pages/home/home.component";
import {WelcomeComponent} from "../pages/welcome/welcome.component";
import {SignUpComponent} from "../auth/sign-up/sign-up.component";
import {LoginComponent} from "../auth/login/login.component";
import {TrainingComponent} from "../pages/training/training.component";
import {AuthGuard} from "../guards/auth.guard";

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'training', component: TrainingComponent,
    canActivate: [AuthGuard]
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
