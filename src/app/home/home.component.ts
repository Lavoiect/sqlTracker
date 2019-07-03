import { Component, OnInit } from '@angular/core';
import { Project } from '../project';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  projects:  Project[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.fetchProjects();
  }
  fetchProjects() {
    this.apiService.getProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
      console.log(this.projects);
    });
  }
}
