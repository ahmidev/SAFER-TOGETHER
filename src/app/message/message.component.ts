import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserPhotoService } from '../Services/user-photo.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  heureActuelle: Date | undefined;
  users !:any[];
  userId! : number;


constructor(private http: HttpClient,private sanitizer: DomSanitizer, private userPhotoService : UserPhotoService){}


  ngOnInit() {

    const url = 'http://localhost:8080/message/all-receivers-by-sender';
  
    const userIdStorage = localStorage.getItem('userId');
    this.userId = Number(userIdStorage);
    console.log(this.userId);
    


// this.http.get(url).subscribe((data:any) =>{
//   console.log(data)
//   this.users = data;
//   this.users.forEach(async (user)=> {
//     (await this.userPhotoService.getUserPhoto(user.photo)).subscribe(
//       (photoBlob: Blob) => {
//         console.log('Photo Blob:', photoBlob);
//     user.photo = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(photoBlob));
//       console.log(this.users[0].photo);
//       console.log( user.photo );
      
       

//     })})
// })

this.http.get(url + "/" + this.userId).subscribe((data: any) => {
  console.log(data);
  this.users = data.filter((user: any) => user.id !== this.userId); // Filtrer et enlever l'utilisateur avec l'ID spécifique
});





    this.heureActuelle = new Date();
    setInterval(() => {
      this.heureActuelle = new Date();
    }, 1000);
  }


}
