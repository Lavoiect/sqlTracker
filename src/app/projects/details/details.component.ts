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
  readTasks:  Task[] = [];
  project;
  tasks: Task;
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

    this.fetchTasks();

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
  this.taskForm.value.projectId = this.project.id;
  if (this.taskForm.valid) {
    if (this.taskForm.dirty) {
      const t = { ...this.tasks, ...this.taskForm.value };
      console.log(t);

      if (t.projectId === this.project.id) {
        this.apiService.createTask(t)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      } else {
        this.apiService.updateProject(t)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    } else {
      this.onSaveComplete();
    }
  } else {
    this.errorMessage = 'Please correct the validation errors.';
  }
  }
  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.taskForm.reset();
    console.log('????');
  }

  fetchTasks() {
    this.apiService.getTasks().subscribe((readTasks: Task[]) => {
      this.readTasks = readTasks;
      console.log(this.tasks);
    });
  }

}
