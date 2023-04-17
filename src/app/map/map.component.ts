import { Component, OnInit } from '@angular/core';
import { PositionService } from '../Services/position.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


  
  constructor(private positionService: PositionService) { 


  }
  
  ngOnInit(): void {
      this.positionService.getLocationService().then(resp=>{
        console.log(resp.lng);
        console.log(resp.lat);

      })
  }
  
    lat! : number;
    lng!: number;
  
    lat2= 48.852020263671875;
    lng2= 2.1309494972229004; 
  
}
