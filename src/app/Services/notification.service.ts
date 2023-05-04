import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatService } from '../message-service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private unreadMessageCountSource = new BehaviorSubject<number>(0);
  public unreadMessageCount$ = this.unreadMessageCountSource.asObservable();

  private discussionActiveSource = new BehaviorSubject<boolean>(false);
  public discussionActive$ = this.discussionActiveSource.asObservable();

  private connected = new BehaviorSubject<boolean>(false);
  private messagesSource = new BehaviorSubject<any[]>([]); // Ajoutez cette ligne
  public messages$ = this.messagesSource.asObservable(); // Ajoutez cette ligne

  constructor(private chatService: MessageService) { }

  updateUnreadMessageCount(count: number) {
    this.unreadMessageCountSource.next(count);
  }

  setDiscussionActive(active: boolean) {
    this.discussionActiveSource.next(active);
  }

  connectWebSocket(idReceiver: number, currentUser: number) {
    if (!this.connected.value) {
      this.chatService.connect(idReceiver, currentUser).subscribe(
        (event) => {
          if (event.type === 'CONNECTED') {
            this.connected.next(true);
          } else if (event.type === 'MESSAGE') {
            // Vérifiez si l'utilisateur qui envoie le message est différent de l'utilisateur courant
            if (event.payload.sender !== currentUser) {
              this.discussionActive$.subscribe((active) => {
                if (!active) {
                  let currentCount = this.unreadMessageCountSource.value;
                  this.updateUnreadMessageCount(currentCount + 1);
                }
              });
            }
  
            // Ajoutez le nouveau message au BehaviorSubject
            const currentMessages = this.messagesSource.value;
            this.messagesSource.next([...currentMessages, event.payload]);
          }
        },
        (error) => {
          console.error('WebSocket connection error:', error);
        }
      );
    }
  }
  
  hasUnreadMessagesFromUser(userId: number): boolean {
    const unreadMessages = this.messagesSource.value.filter((message) => message.sender === userId && !message.read);
    return unreadMessages.length > 0;
  }
  
  resetUnreadMessageCount() {
    this.unreadMessageCountSource.next(0);
  }
}
