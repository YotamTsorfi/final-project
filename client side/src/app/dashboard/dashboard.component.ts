import { Component, OnInit } from '@angular/core';
import { Bike } from '../objects/bike';
import { BikesService } from '../bikes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  bikes: Bike[] = [];

  constructor(private bikesService: BikesService) { }

  ngOnInit() {
    this.getBikes();
  }

  getBikes(): void {
    this.bikesService.getBikes()
      .subscribe(bikes => this.bikes = bikes.slice(1, 5));
  }
}
