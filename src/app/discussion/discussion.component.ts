import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../message-interface';
import { ChatService } from '../message-service';
import { MessageService } from '../Services/message.service';
import { UserPhotoCacheService } from '../Services/userPhotoCacheService.service'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserProfilService } from '../Services/user-profil.service';
import { UserPhotoService } from '../Services/user-photo.service';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit, OnDestroy {

  public userEmail!: string;
  public receiverEmail!: string;
  public messageContent!: string;
  public messages: any[]=[];
  public   idReceiver!:number;
  public   currentUser!:number;
  public photoCurrentUser:any;
  public photoReceiverUser:any;
  public currentUserData:any;
  public receiverUserData:any;


  constructor(private chatService: MessageService, private activatedRoute: ActivatedRoute, private userPhotoService: UserPhotoService, private userProfilService:UserProfilService,  private sanitizer: DomSanitizer, private http:HttpClient) {}

  ngOnInit(): void {

    this.idReceiver = this.activatedRoute.snapshot.params['id'];
    console.log('ID reçu:', this.idReceiver);
    const userIdStorage = localStorage.getItem('userId');
    this.currentUser = Number(userIdStorage);
    console.log('ID user:', this.currentUser);


    this.chatService.connect(this.idReceiver,this.currentUser).subscribe(
      (event) => {
        if (event.type === 'CONNECTED') {
          console.log('WebSocket connected:', event.payload);

        } else if (event.type === 'MESSAGE') {
          console.log('Received message:', event.payload);
          console.log(event.payload.sender);
          console.log(event.payload);
          this.messages.push(event.payload)
          console.log(this.messages);
          
        }
      },
      (error) => {
        console.error('WebSocket connection error:', error);
      }
    );
    this.getPhotoCurrentUser();
    this.getPhotoUserReceiver();
  }





  
 sendMessage(): void {
    this.chatService.sendMessage({sender:this.currentUser,receiver:this.idReceiver, message :this.messageContent})
    this.messageContent = "";
    console.log(this.idReceiver,this.currentUser);
 
  }





getPhotoCurrentUser(){
  this.http.get(`http://localhost:8080/users/${this.currentUser}`).subscribe(async (data:any)=>{
  this.currentUserData = data;
    (await this.userPhotoService.getUserPhoto(data.photo)).subscribe(
      (photoBlob: Blob) => {
        console.log('Photo Blob:', photoBlob);
     this.photoCurrentUser = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(photoBlob))

    })
    
  })
}



getPhotoUserReceiver(){
  this.http.get(`http://localhost:8080/users/${this.idReceiver}`).subscribe(async (data:any)=>{
    this.receiverUserData = data;
    (await this.userPhotoService.getUserPhoto(data.photo)).subscribe(
      (photoBlob: Blob) => {
        console.log('Photo Blob:', photoBlob);
     this.photoReceiverUser = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(photoBlob));
    
    })
    
  })
}



getAppropriateImage(sender: number): SafeUrl | undefined {
  if (sender === this.currentUser) {
    return this.photoCurrentUser;
  } else if (sender !== this.idReceiver) {
    return this.photoReceiverUser;
  } else {
    return undefined;
  }
}


//  getUserImage(userId: number): Observable<SafeUrl> {
//      let filename="";
//     const user = this.userProfilService.getUserById(userId).subscribe(data=>{
//       filename = data.photo
//     }); 
     
  
//     return this.userPhotoService.getUserPhoto( filename);
//   }


// getUserImage(userId: number): Observable<SafeUrl> {
//   if (this.userImages[userId]) {
//     return of(this.userImages[userId] as SafeUrl);
//   }

//   return this.userProfilService.getUserById(userId).pipe(
//     switchMap(user => {
//       const filename = user?.photo;
//       return this.userPhotoService.getUserPhoto(filename);
//     }),
//     map((photoBlob: Blob) => {
//       const objectUrl = URL.createObjectURL(photoBlob);
//       const safeUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
//       this.userImages[userId] = safeUrl;
//       return safeUrl;
//     }),
//     catchError(() => {
//       const defaultUrl = this.sanitizer.bypassSecurityTrustUrl('../assets/Safer1.svg');
//       this.userImages[userId] = defaultUrl;
//       return of(defaultUrl);
//     })
//   );
// }











  ngOnDestroy(): void {
   this.chatService.disconnect();
  }


}
