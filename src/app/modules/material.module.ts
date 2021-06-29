import {NgModule} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

const importsModules = [MatButtonModule, MatIconModule, MatFormFieldModule,
  MatInputModule, MatDatepickerModule, MatNativeDateModule]

@NgModule({
  imports: importsModules,
  exports: importsModules
})
export class MaterialModule {

}
