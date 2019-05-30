import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';

import { Project } from '../../project';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  projectForm: FormGroup;

  private sub: Subscription;
  projects:  Project[] = [];
  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.projectForm = this.fb.group({
      projectName: [, [Validators.required, Validators.minLength(3)]],
      leadDeveloper: '',
      projectScope: '',
      dueDate: null,
    });

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.apiService.getProject(id).subscribe((projects: Project[]) => {
          this.projects = projects;
          console.log(this.projects);
        });
      }
    );

  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  createProject(form) {
    this.apiService.createProject(this.projectForm.value).subscribe((project: Project) => {
      this.projectForm.reset();
    });
  }

}
