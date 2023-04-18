import { Component, OnInit } from '@angular/core';
import { PositionService } from '../Services/position.service';

@Component({
  selector: 'app-parent-map',
  templateUrl: './parent-map.component.html',
  styleUrls: ['./parent-map.component.css']
})
export class ParentMapComponent implements OnInit {


  constructor(private positionService: PositionService,) {

  }


  ngOnInit(): void {

    this.positionService.getLocation().subscribe(geolocations => {
      // this.geolocations.push(geolocations)
      console.log(geolocations)
    })
  }

}
