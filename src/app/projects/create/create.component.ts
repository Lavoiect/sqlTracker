import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormGroup, FormControl } from '@angular/forms';

import { Project } from '../../project';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  projectForm: FormGroup;
  projects = new Project();


  constructor(private apiService: ApiService ) { }

  ngOnInit() {
    this.projectForm = new FormGroup({
      leadDeveloper: new FormControl(),
      projectName: new FormControl(),
      projectScope: new FormControl(),
      dueDate: new FormControl(),
    });
  }

  createProject(form) {
    this.apiService.createProject(form.value).subscribe((project: Project) => {
      form.reset();
    });
  }

  save() {
    console.log(this.projectForm);
    console.log('Saved:' + JSON.stringify(this.projectForm.value));
  }
}
