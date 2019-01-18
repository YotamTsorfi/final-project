import { Component, OnInit } from '@angular/core';
import { Ranger } from '../ranger';
import { RangerService } from '../ranger.service';

@Component({
  selector: 'app-rangers',
  templateUrl: './rangers.component.html',
  styleUrls: ['./rangers.component.css']
})
export class RangersComponent implements OnInit {
  rangers: Ranger[];

  constructor(private rangerService: RangerService) { }

  ngOnInit() {
    this.getRangers();
  }

  getRangers(): void {
    this.rangerService.getRangers()
      .subscribe(rangers => this.rangers = rangers);
  }

  addTree(ranger: Ranger){
    ranger.numOfTrees++;
  }
    
  reportTrees(ranger: Ranger) {
    this.rangerService.reportTrees(ranger).subscribe(param =>{
      console.log('test', param);
    });
    ranger.numOfTrees = 0;
    console.log(ranger.img);
  }
}
