import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from 'src/app/projects/details/details.component';
import { ProjectListComponent } from 'src/app/projects/projectList/projectList.component';
import { CreateComponent } from 'src/app/projects/create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';





@NgModule({
  declarations: [
    DetailsComponent,
    ProjectListComponent,
    CreateComponent,


  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    NgbModule,
    NgxPaginationModule,
    Ng2SearchPipeModule

  ],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}],
  exports: [CreateComponent],
  bootstrap: [CreateComponent]
})
export class ProjectModule { }
