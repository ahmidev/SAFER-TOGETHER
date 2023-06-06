import { Component, OnInit } from '@angular/core';
import { PositionService } from '../Services/position.service';
import { NotificationService } from '../Services/notification.service';

@Component({
  selector: 'app-parent-map',
  templateUrl: './parent-map.component.html',
  styleUrls: ['./parent-map.component.css']
})
export class ParentMapComponent implements OnInit {


  constructor(private positionService: PositionService,private notificationService: NotificationService) {

  }


  ngOnInit(): void {

    this.positionService.getLocation().subscribe((geolocations:any) => {
      // this.geolocations.push(geolocations)
      console.log(geolocations)
    })
    this.notificationService.unreadMessageCount$.subscribe((count) => {
      // this.unreadMessageCount = count;
      console.log(count);
      
    });
  }




  requestLocation(): void {
    const userId = Number(localStorage.getItem("userId"));
    this.positionService.getPosition().subscribe(
      (position) => {
        console.log('Position obtenue: ', position);
        this.positionService.saveLocation(userId, { latitude: position.coords.latitude, longitude: position.coords.longitude }).subscribe(data => console.log(data))
        console.log("position accepter")
        console.log("position okkkk", position)
        console.log("usssssser", userId)
      },
      (error) => {
        console.error('Erreur lors de l\'obtention de la position: ', error);
      }
    );
  }
}
