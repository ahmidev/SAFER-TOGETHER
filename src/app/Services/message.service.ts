import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, tap, switchAll } from 'rxjs/operators';
import { EMPTY, Observable, Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Webstomp from 'webstomp-client';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private socket!: WebSocket;
  private stompClient!: Webstomp.Client;
  

  constructor() { }

  connect(idReceiver:any,idSender:any): Observable<any> {
    const socket = new SockJS('http://217.160.37.151:8080/chat'); 
    this.stompClient = Webstomp.over(socket);

    const subject = new Subject<any>();

    this.stompClient.connect({}, (frame) => {
      subject.next({ type: 'CONNECTED', payload: frame });
      this.stompClient.subscribe(`/topic/messages/${idReceiver}/${idSender}`, (message:any) => {
        subject.next({ type: 'MESSAGE', payload: JSON.parse(message.body) });
      });
    }, (error) => {
      subject.error(error);
    });

    return subject.asObservable();
  }

  sendMessage(message:any): void {
    console.log('Sending message:', message);
    this.stompClient.send('/app/sendMessage', JSON.stringify(message));
}



  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }
  

}
