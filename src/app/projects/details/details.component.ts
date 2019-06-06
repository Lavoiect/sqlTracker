import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/project';
import { FormControl, FormGroup } from '@angular/forms';
import { Task } from '../task';




@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private sub: Subscription;
  readTasks:  Task;
  project;
  tasks;
  errorMessage: string;
  constructor(private route: ActivatedRoute, private apiService: ApiService) {
  }

  taskForm = new FormGroup({
    id: new FormControl(''),
    projectId: new FormControl(''),
    task: new FormControl(''),
    taskDue: new FormControl(''),
  });

  ngOnInit() {


    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getProject(id);
        console.log(this.project);
      }
    );

    this.fetchTasks();

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

deleteTask(id) {
  this.apiService.deleteTask(id).subscribe((tasks: Task) => {
    this.fetchTasks();
  });
}

saveTask(): void {
  this.taskForm.value.projectId = this.project.id;
      const t = { ...this.readTasks, ...this.taskForm.value};
      console.log(t);
        this.apiService.createTask(t).subscribe(
            () => this.onSaveComplete(),
            (tasks: Task) => {
              this.onSaveComplete();
            }
          );
  }


fetchTasks() {
  this.apiService.getTasks().subscribe((tasks: Task[]) => {
    this.tasks = tasks;
    console.log(this.tasks);
  });
}


  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.taskForm.reset();
    console.log('????');
    this.fetchTasks();
  }
}
