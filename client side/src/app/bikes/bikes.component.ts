import { Component, OnInit } from '@angular/core';
import { Bike } from '../objects/bike';
import { BikesService } from '../bikes.service';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.css']
})
export class BikesComponent implements OnInit {

  bikes: Bike[];

  constructor(private bikesService: BikesService) { }

  ngOnInit() {
    this.getBikes();
  }

  getBikes(): void {
    this.bikesService.getBikes()
      .subscribe(bikes => this.bikes = bikes);
  }

}
