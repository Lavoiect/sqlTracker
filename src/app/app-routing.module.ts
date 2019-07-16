import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './projects/projectList/projectList.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './projects/create/create.component';
import { DetailsComponent } from './projects/details/details.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent,
      children: [
        { path: 'dash', component: DashboardComponent },
        { path: 'projects', component: ProjectListComponent },
        { path: 'create', component: CreateComponent },
        { path: 'projects/:id', component: DetailsComponent },
        { path: 'projects/:id/details', component: DetailsComponent },
        { path: 'projects/:id/details/edit', component: CreateComponent },
      ] },
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
