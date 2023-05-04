import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from 'src/app/message-interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  private baseUrl = 'http://217.160.37.151:8080/api/chat';

  constructor(private http: HttpClient) { }

  getMessages(sender: string, message: string): Observable<Message[]> {
    const url = `${this.baseUrl}?sender=${sender}&message=${message}`;
    return this.http.get<Message[]>(url);
  }

  sendMessage(message: Message): Observable<Message> {
    const url = `${this.baseUrl}`;
    return this.http.post<Message>(url, message);
  }
}
