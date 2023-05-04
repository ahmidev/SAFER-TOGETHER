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

}
