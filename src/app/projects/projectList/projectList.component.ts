import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Project } from '../../project';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectList.component.html',
  styleUrls: ['./projectList.component.scss']
})
export class ProjectListComponent implements OnInit {

    showTableView = true;
    showCardView = false;
    projects:  Project[] = [];
    _filterTerm: string;
    filteredProjects: Project[];
itemsPerPage =  5;
private popped = [];
  constructor(private apiService: ApiService) {
  }

  get filterTerm(): string {
    return this._filterTerm;
  }
  set filterTerm(value: string) {
    this._filterTerm = value;
    this.filteredProjects = this.filterTerm ? this.performFilter(this.filterTerm) : this.projects;
  }

  ngOnInit() {
    this.fetchProjects();
  }
  performFilter(filterBy: string): Project[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.projects.filter((project: Project) =>
    project.projectName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }


  deleteProject(id) {
    this.apiService.deleteProject(id).subscribe((project: Project) => {
      this.popped.push(this.projects.pop());
    });
  }


  fetchProjects() {
    this.apiService.getProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
      this.filteredProjects = this.projects;
      console.log(this.projects);
    });
  }

  toggleCards() {
    this.showTableView = false;
    this.showCardView = true;
  }

  toggleTable() {
    this.showTableView = true;
    this.showCardView = false;
  }


}
