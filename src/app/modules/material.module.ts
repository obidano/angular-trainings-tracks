import {NgModule} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

const importsModules = [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule]

@NgModule({
  imports: importsModules,
  exports: importsModules
})
export class MaterialModule {

}
