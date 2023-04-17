import { Component, OnInit } from '@angular/core';
import { ChatService } from './classTest/chatService';
import { Message } from './classTest/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'safer';
message : Message = new Message();

constructor(private chatService: ChatService){

}

ngOnInit(): void {

// this.chatService.receiveMessages().subscribe(message => {
// console.log(message);

// })

}
}
