import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './projects/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './projects/create/create.component';
import { DetailsComponent } from './projects/details/details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'projects', component: DashboardComponent },
  { path: 'create', component: CreateComponent },
  { path: 'projects/:id', component: DetailsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
