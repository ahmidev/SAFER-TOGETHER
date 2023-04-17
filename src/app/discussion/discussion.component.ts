import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../message-interface';
import { ChatService } from '../message-service';
import { NgForm } from '@angular/forms';
import { WebSocketService } from '../classTest/web-socket.service';
import { ChatMessageDto } from '../classTest/ChatMessageDto';



@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit, OnDestroy {

  constructor(public webSocketService: WebSocketService) { }


sender_id: number = 0;
receiver_id: number = 0;
message : string = '';

  ngOnInit(): void {

    this.webSocketService.connect(1, 2).subscribe((event) => {
      if (event.type === 'CONNECTED') {
        console.log('CONNECTED', event.payload);
      } else if (event.type === 'MESSAGE') {
        console.log('MESSAGE RECU', event.payload);
      }
    }, (error) => {
      console.error('MESSAGE ERROR', error);
    });


  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect;
  }

  sendMessage(sendForm: NgForm) {
    // const chatMessageDto = new ChatMessageDto(sendForm.value.user, 1, sendForm.value.message, true);
    this.webSocketService.sendMessage({ sender: {id :this.sender_id}, receiver: {id : this.receiver_id}, message: this.message });
    sendForm.controls['message'].reset();
  }
}
