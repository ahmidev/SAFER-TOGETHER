import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  heureActuelle: Date | undefined;

  ngOnInit() {
    this.heureActuelle = new Date();
    setInterval(() => {
      this.heureActuelle = new Date();
    }, 1000);
  }


}
