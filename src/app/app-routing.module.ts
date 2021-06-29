import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MypageComponent} from "./pages/mypage/mypage.component";
import {FormComponent} from "./pages/form/form.component";

const routes: Routes = [
  {path: '', component: MypageComponent},
  {path: 'form', component: FormComponent},
]

@NgModule({
  imports:[
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule {

}
