import { Injectable } from '@angular/core';
import { ChatMessageDto } from './ChatMessageDto';
import { HttpClient } from '@angular/common/http';
import * as Webstomp from 'webstomp-client';
import * as SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket!: WebSocket;
  private stompClient!: Webstomp.Client;

  constructor() { }

  // Méthode pour la connexion : souscris à un Observable
  connect(id1: any, id2: any): Observable<any> {

    const socket = new SockJS('http://localhost:8081/stomp'); //
    this.stompClient = Webstomp.over(socket);

    const subject = new Subject<any>();

    this.stompClient.connect({}, (frame) => {
      subject.next({ type: 'CONNECTED', payload: frame });
      this.stompClient.subscribe(`/topic/messages/${id1}/${id2}`, (message: any) => {
        subject.next({ type: 'MESSAGE', payload: JSON.parse(message.body) });
      });
    }, (error) => {
      subject.error(error);
    });

    return subject.asObservable();
  }

  sendMessage(message: { sender: {}; receiver: {}; message: string }): void {
    this.stompClient.send('/app/chat', JSON.stringify(message), {});
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }
}