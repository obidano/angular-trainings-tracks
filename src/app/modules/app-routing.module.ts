import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {WelcomeComponent} from "../pages/welcome/welcome.component";
import {AuthGuard} from "../guards/auth.guard";

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  /*{path: 'signup', component: SignUpComponent},
  {path: 'login', component: LoginComponent},*/
  {
    path: 'training', loadChildren: () => import('../pages/training/training.module').then(m => m.TrainingModule),
    canLoad: [AuthGuard]
    // canActivate: [AuthGuard]
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
