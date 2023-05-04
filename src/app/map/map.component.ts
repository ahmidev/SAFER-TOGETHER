import { Component, OnInit } from '@angular/core';
import { PositionService } from '../Services/position.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


  geolocations !: any[];
  lat: any;
  lng: any;


  constructor(private positionService: PositionService,) {


  }

  ngOnInit(): void {
    // const userId = Number (localStorage.getItem("userId"));
    // this.positionService.getLocationService().then(resp=>{
    // this.positionService.saveLocation(userId, {latitude : resp.lat, longitude : resp.lng})
    // this.lat = resp.lat;
    // this.lng = resp.lng;
    // this.positionService.getPosition().subscribe(
    //   (position) => {
    //     this.positionService.saveLocation(userId, {latitude : position.coords.latitude, longitude : position.coords.longitude})
    //     console.log("position accepter")

    //   }
    // )




    //   console.log(resp.lng);
    //   console.log(resp.lat);


    // })
    this.positionService.getLocation().subscribe((users: any) => {
      this.geolocations = users
      console.log("lol :" , this.geolocations     )
     this.geolocations.forEach((user:any)=>console.log(user.geolocalisation))
    })
 
  }

  trackByFn(index: number, item: any): any {
    return item.id; // Utilisez une propriété unique pour chaque élément, comme l'ID
  }

  // lat2= 48.852020263671875;

  // lng2= 2.1309494972229004; 

}
