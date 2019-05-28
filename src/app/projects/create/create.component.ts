import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';

import { Project } from '../../project';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  projectForm: FormGroup;
  projects = new Project();

  constructor(private apiService: ApiService , private fb: FormBuilder) { }

  ngOnInit() {
    this.projectForm = this.fb.group({
      leadDeveloper: ['', [ Validators.required, Validators.minLength(3)]],
      projectName: '',
      projectScope: '',
      dueDate: '',
    });

  }

  createProject(form) {
    this.apiService.createProject(this.projectForm.value).subscribe((project: Project) => {
      this.projectForm.reset();
    });
  }

}
