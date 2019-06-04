import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/project';
import { FormControl, FormGroup } from '@angular/forms';




@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private sub: Subscription;
  project;
  errorMessage: string;
  constructor(private route: ActivatedRoute, private apiService: ApiService) {
  }

  taskForm = new FormGroup({
    name: new FormControl(''),
    task: new FormControl(''),
  });

  ngOnInit() {

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getProject(id);
        console.log(this.project);
      }
    );

}

getProject(id: number): void {
  this.apiService.getProject(id)
    .subscribe(
      (project: Project) => this.displayProject(project),
      (error: any) => this.errorMessage = <any>error
    );
}
displayProject(project: Project): void {
  this.project = project;
}
saveTask() {
  this.taskForm.value.name = this.project.projectName;
  console.log(this.taskForm.value);
}


}
