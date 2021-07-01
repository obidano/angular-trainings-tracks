import {NgModule} from "@angular/core";
import {TrainingComponent} from "./training.component";
import {CurrentTrainingComponent} from "./current-training/current-training.component";
import {NewTrainingComponent} from "./new-training/new-training.component";
import {PastTrainingComponent} from "./past-training/past-training.component";
import {TrainingDialogComponent} from "./training-dialog/training-dialog.component";
import {SharedModule} from "../../modules/shared.module";

@NgModule({
  declarations: [TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent, TrainingDialogComponent
  ],
  imports: [SharedModule],
  exports: [],
})

export class TrainingModule {

}
