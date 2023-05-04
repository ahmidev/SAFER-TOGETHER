import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../message-interface';
import { ChatService } from '../message-service';
import { MessageService } from '../Services/message.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserProfilService } from '../Services/user-profil.service';
import { UserPhotoService } from '../Services/user-photo.service';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RouterTestingHarness } from '@angular/router/testing';
import { NotificationService } from '../Services/notification.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit{

  public userEmail!: string;
  public receiverEmail!: string;
  public messageContent!: string;
  public messages: any[]=[];
  public idReceiver!:number;
  public currentUser!:number;
  public photoCurrentUser:any;
  public photoReceiverUser!:string ;
  public defaultImage: string = "/assets/Safer2.svg"
  public currentUserData:any;
  public receiverUserData:any;


  constructor(private notificationService: NotificationService, private chatService: MessageService, private activatedRoute: ActivatedRoute, private userPhotoService: UserPhotoService, private userProfilService:UserProfilService,  private sanitizer: DomSanitizer, private http:HttpClient) {}

sender_id: number = 0;
receiver_id: number = 0;
message : string = '';

  ngOnInit(): void {
    this.notificationService.resetUnreadMessageCount();
    // this.idReceiver = this.activatedRoute.snapshot.params['id'];
    // console.log('ID reçu:', this.idReceiver);
    // const userIdStorage = localStorage.getItem('userId');
    // this.currentUser = Number(userIdStorage);
    // console.log('ID user:', this.currentUser);


    // this.chatService.connect(this.idReceiver,this.currentUser).subscribe(
    //   (event) => {
    //     if (event.type === 'CONNECTED') {
    //       console.log('WebSocket connected:', event.payload);

    //     } else if (event.type === 'MESSAGE') {
    //       console.log('Received message:', event.payload);
    //       console.log(event.payload.sender);
    //       console.log(event.payload);
    //       this.messages.push(event.payload)
    //       console.log(this.messages);

    //     }
    //   },
    //   (error) => {
    //     console.error('WebSocket connection error:', error);
    //   }
    // );

// Indiquez que le composant de discussion est actif
this.notificationService.setDiscussionActive(true);

this.idReceiver = this.activatedRoute.snapshot.params['id'];
console.log('ID reçu:', this.idReceiver);
const userIdStorage = localStorage.getItem('userId');
this.currentUser = Number(userIdStorage);
console.log('ID user:', this.currentUser);

// Connectez-vous au WebSocket via NotificationService
this.notificationService.connectWebSocket(this.idReceiver, this.currentUser);

// Souscrivez au BehaviorSubject des messages dans le NotificationService
this.notificationService.messages$.subscribe((messages) => {
  this.messages = messages;
  console.log(messages);

});


    this.getPhotoCurrentUser();
    this.getPhotoUserReceiver();
    this.getMessageReceiver();
    this.getMessageSender();

  }






 sendMessage(): void {
    this.chatService.sendMessage({sender:this.currentUser,receiver:this.idReceiver, message :this.messageContent})
    this.messageContent = "";
    console.log(this.idReceiver,this.currentUser);

  }

getMessageSender(){
  this.http.get(`http://217.160.37.151:8080/message/by-sender/${this.currentUser}`).subscribe(async (msg:any)=> {
    const tabTri = msg.filter((receiverUser: any) => receiverUser.receiver == this.idReceiver);
    console.log("message du current :" ,tabTri);

    tabTri.forEach((element:any) => {
      this.messages.push(element)
    });
    console.log(this.messages);


  })
}
getMessageReceiver(){
  this.http.get(`http://217.160.37.151:8080/message/by-sender/${this.idReceiver}`).subscribe(async (msg:any)=> {
    const tabTri = msg.filter((receiverUser: any) => receiverUser.receiver == this.currentUser)
    console.log("message du receiver :" ,tabTri);
    tabTri.forEach((element:any) => {
      this.messages.push(element)
    });
    console.log(this.messages)

  })
}



getPhotoCurrentUser(){
  this.http.get(`http://217.160.37.151:8080/users/${this.currentUser}`).subscribe(async (data:any)=>{
  this.currentUserData = data;
  console.log(data.photo);

     this.photoCurrentUser = data.photo

  })
}



getPhotoUserReceiver(){
  this.http.get(`http://217.160.37.151:8080/users/${this.idReceiver}`).subscribe(async (data:any)=>{
    this.receiverUserData = data;
  console.log(data)

  this.photoReceiverUser = data.photo;

  console.log(this.photoReceiverUser)

  })
}




// getAppropriateImage(sender: number): SafeUrl | undefined {
//   if (sender === this.currentUser) {
//     if(this.photoCurrentUser !== null){

//       return 'data:;base64,'+ this.photoCurrentUser;
//     }else{
//       return this.defaultImage;
//     }
//   }
//   if (sender == this.idReceiver) {
//     if(this.receiverUserData.photo !== null ){
//       return 'data:;base64,'+ this.receiverUserData.photo;
//     }else{
//       return this.defaultImage;
//     }
//   } else {
//     return undefined;
//   }
// }

getAppropriateImage(sender: number): SafeUrl | undefined {
  let base64Image: string | null = null;

  if (sender === this.currentUser) {
    base64Image = this.photoCurrentUser;
  } else if (sender !== this.currentUser) {
    base64Image =  this.photoReceiverUser;
  }

  return base64Image !== null ? 'data:;base64,' + base64Image : this.defaultImage;
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
  // Indiquez que le composant de discussion n'est plus actif
  this.notificationService.setDiscussionActive(false);
}


  // ngOnDestroy(): void {
  //  this.chatService.disconnect();
  // }


//   ngOnDestroy(): void {
//     this.webSocketService.disconnect;
//   }

//   sendMessage(sendForm: NgForm) {
//     // const chatMessageDto = new ChatMessageDto(sendForm.value.user, 1, sendForm.value.message, true);
//     this.webSocketService.sendMessage({ sender: {id :this.sender_id}, receiver: {id : this.receiver_id}, message: this.message });
//     sendForm.controls['message'].reset();
//   }
// }
}