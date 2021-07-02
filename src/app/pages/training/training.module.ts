import {NgModule} from "@angular/core";
import {TrainingComponent} from "./training.component";
import {CurrentTrainingComponent} from "./current-training/current-training.component";
import {NewTrainingComponent} from "./new-training/new-training.component";
import {PastTrainingComponent} from "./past-training/past-training.component";
import {TrainingDialogComponent} from "./training-dialog/training-dialog.component";
import {SharedModule} from "../../modules/shared.module";
import {TrainingRouteModule} from "./training-route.module";
import {StoreModule} from "@ngrx/store";
import {TrainingReducer} from "../../reducers/training/training.reducer";

@NgModule({
  declarations: [TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent, TrainingDialogComponent
  ],
  imports: [
    SharedModule,
    TrainingRouteModule,
    StoreModule.forFeature('training', TrainingReducer)
  ],
  exports: [],
})

export class TrainingModule {

}
