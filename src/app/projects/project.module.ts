import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from 'src/app/projects/details/details.component';
import { DashboardComponent } from 'src/app/projects/dashboard/dashboard.component';
import { CreateComponent } from 'src/app/projects/create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DetailsComponent,
    DashboardComponent,
    CreateComponent

  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ]
})
export class ProjectModule { }
