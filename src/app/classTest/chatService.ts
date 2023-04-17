import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Message } from './message';
import { ChatMessageDto } from './ChatMessageDto';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

//   webSocket!: WebSocket;
//   chatMessages: ChatMessageDto[] = [];

//   constructor() {
//     this.webSocket = new WebSocket('ws://localhost:8080/chat');
//   }

//   public openWebSocket() {

//     this.webSocket.onopen = (event) => {
//       console.log('Open', event);
//     };

//     this.webSocket.onmessage = (event) => {
//       const chatMessageDto = JSON.parse(event.data);
//       this.chatMessages.push(chatMessageDto);
//     };

//     this.webSocket.onclose = (event) => {
//       console.log('Close', event);
//     };

//   }

//   public sendMessage(chatMessageDto: ChatMessageDto){
//     this.webSocket.send(JSON.stringify(chatMessageDto));
//   }

//   public closeWebSocket(){
//     this.webSocket.close();

// }
}