import { Component, OnInit } from '@angular/core';
import { Ranger } from '../ranger';
import { RangerService } from '../ranger.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  rangers: Ranger[] = [];

  constructor(private rangerService: RangerService) { }

  ngOnInit() {
    this.getRangers();
  }

  getRangers(): void {
    this.rangerService.getRangers()
      .subscribe(rangers => this.rangers = rangers.slice(1, 5));
  }
}
