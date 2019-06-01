import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/project';




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

}
