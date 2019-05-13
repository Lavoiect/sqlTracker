import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';




@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
}
}
