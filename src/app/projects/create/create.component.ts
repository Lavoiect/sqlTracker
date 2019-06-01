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
  pageTitle = 'Product Edit';
  errorMessage: string;
  projectForm: FormGroup;

  project:  Project;
  private sub: Subscription;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private apiService: ApiService
              ) { }

  ngOnInit() {
    this.projectForm = this.fb.group({
      projectName: [, [Validators.required, Validators.minLength(3)]],
      leadDeveloper: '',
      projectScope: '',
      dueDate: '',
    });

    // Read the project Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getProject(id);
      }
    );

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }




  getProject(id: number): void {
    this.apiService.getProject(id)
      .subscribe(
        (project: Project) => this.displayProject(project),
        (error: any) => this.errorMessage = <any>error
      );
  }

  displayProject(project: Project): void {
    if (this.projectForm) {
      this.projectForm.reset();
    }
    this.project = project;

    if (this.project.id === 0) {
      this.pageTitle = 'Add Project';
    } else {
      this.pageTitle = `Edit Project: ${this.project.projectName}`;
    }

    // Update the data on the form
    this.projectForm.patchValue({
      projectName: this.project.projectName,
      leadDeveloper: this.project.leadDeveloper,
      projectScope: this.project.projectScope,
      dueDate: this.project.dueDate,
    });
  }

  saveProject(): void {
    if (this.projectForm.valid) {
      if (this.projectForm.dirty) {
        const p = { ...this.project, ...this.projectForm.value };
        console.log(p);

        if (p.id === null) {
          this.apiService.createProject(p)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.apiService.updateProject(p)
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
    this.projectForm.reset();
    this.router.navigate(['/projects']);
    console.log('????');
  }

}
