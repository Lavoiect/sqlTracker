import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Project } from '../../project';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  projects:  Project[];


  constructor(private apiService: ApiService ) { }

  ngOnInit() {
  }

  createProject(form) {
    this.apiService.createProject(form.value).subscribe((project: Project) => {
      form.reset();
    });
  }
}
