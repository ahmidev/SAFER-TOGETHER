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


constructor(private http: HttpClient,private sanitizer: DomSanitizer, private userPhotoService : UserPhotoService){}


  ngOnInit() {

    const url = 'http://localhost:8080/users/';
  



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

this.http.get(url).subscribe((data: any) => {
  console.log(data);
  this.users = data;
  this.users.forEach((user) => {
    this.userPhotoService.getUserPhoto(user.photo).subscribe(
      (photoUrl: SafeUrl) => {
        console.log('Photo URL:', photoUrl);
        user.photo = photoUrl;
        console.log(this.users[0].photo);
        console.log(user.photo);
      },
      (error) => {
        console.error('Erreur lors du chargement de la photo', error);
      }
    );
  });
});




    this.heureActuelle = new Date();
    setInterval(() => {
      this.heureActuelle = new Date();
    }, 1000);
  }


}
