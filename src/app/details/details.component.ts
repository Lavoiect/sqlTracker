import { Component, OnInit } from '@angular/core';
import { Project } from '../project';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  project: Project;

  constructor() { }

  ngOnInit() {
  }

}
