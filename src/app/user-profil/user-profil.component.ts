import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserProfilService } from '../Services/user-profil.service';
import { UserPhotoService } from '../Services/user-photo.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit{


  userId!: number;
  defaultPhoto:string = 'assets/Safer1.svg';
  photoPreview: SafeUrl | null | undefined;
  uploadSuccess: boolean = false;
  saveSuccess = false;
  photoError = true;
  user = {
    lastname: '',
    firstname: '',
    password: '',
    email: '',
    birthday: '',
    description: '',
    photo:''
    
  };

  fileToUpload!: File|null ;



  

  constructor(private userProfilService: UserProfilService, private userPhotoService: UserPhotoService, private sanitizer: DomSanitizer,private cdRef: ChangeDetectorRef){

  }


 


  ngOnInit(): void {
   
 
  
  this.userProfilService.currentDataUser.subscribe(data =>{
    this.user = data
    // this.userId =data.id
    const userIdStorage = localStorage.getItem('userId');
    if (userIdStorage) {
      this.userId = JSON.parse(userIdStorage);
      
    } else {
   
      this.userId = data.id
        
      };
  
  
  })
   
  


  this.loadUserPhoto();
  this.getUser()
  }


getPhotoName(){
  let photo: string | null = '';
  this.userProfilService.currentDataUser.subscribe(data=>{
    photo = data.photo
  })
  return photo;
}

getUser(){
  this.userProfilService.getUserById(this.userId).subscribe(data=>{
    console.log(data)
    this.userProfilService.updateDataUser(data)
  
  });
  
  
}



  async loadUserPhoto(): Promise<void> {
    const filename = this.getPhotoName(); // Remplacez par le nom de fichier de la photo de l'utilisateur
    console.log('Avant l\'appel de la fonction subscribe');
    (await this.userPhotoService.getUserPhoto(filename)).subscribe(
      (photoBlob: Blob) => {
        console.log('Photo Blob:', photoBlob);
        this.photoPreview = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(photoBlob));
        console.log(this.photoPreview);
        

        this.getUser();

        if (this.photoPreview) {
          this.photoError = true
        } else {
          this.photoError = false
        }

        console.log(this.photoPreview);
        console.log( photoBlob);
        
        
      },
      (error) => {
        console.error('Erreur lors du chargement de la photo de l\'utilisateur', error);
      console.log('Error response:', error.error);
      console.log('Error status:', error.status);
      console.log('Error message:', error.message);
      // Mettre une photo par défaut si aucune photo n'est chargée
      // this.setDefaultPhoto();
      }
    );
  }

  // setDefaultPhoto(): void {
  //   const defaultPhotoPath = 'assets/Safer1.svg'; 
  //   this.photoPreview = this.sanitizer.bypassSecurityTrustUrl(defaultPhotoPath);
  // }

  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length > 0) {
      this.fileToUpload = files.item(0);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          this.photoPreview = e.target.result;
        }
      };
      if (this.fileToUpload) {
        reader.readAsDataURL(this.fileToUpload);
      }
    }
  }

  saveUserData(): void {
    if (this.fileToUpload) {
      this.userProfilService.uploadPhoto(this.userId, this.fileToUpload).subscribe(
        response => {
          console.log('Photo enregistrée avec succès.', response);
        },
        error => {
          console.error('Erreur lors de l\'envoi de la photo.', error);
        }
      );
    }

    this.userProfilService.updateUserData(this.userId, this.user).subscribe(
      response => {
        console.log('Données utilisateur mises à jour avec succès.', response);
        this.saveSuccess = true;
      },
      error => {
        console.error('Erreur lors de la mise à jour des données utilisateur.', error);
      }
    );
  }





  





  upload(): void {
    console.log('cc');
    
    if (this.fileToUpload) {
      this.userProfilService.uploadPhoto(this.userId, this.fileToUpload).subscribe(
        response => {
          console.log('Photo enregistrée avec succès.', response);
          this.getUser();
          this.uploadSuccess = true;
        },
        error => {
          console.error('Erreur lors de l\'envoi de la photo.', error);
        }
      );
    }
  }


  // prepareUpdate() {
  //   const userData = {
  //     email: this.user.email,
  //     password: this.user.password,
  //     birthday: this.user.birthday,
  //   };
  //   this.userProfilService.updateUserProfile(this.userId, userData,  this.fileToUpload).subscribe(
  //     (response) => {
  //       console.log(response);
  //       // Mettez à jour les variables d'état appropriées pour refléter le succès de l'opération
  //       this.uploadSuccess = true;
  //       this.saveSuccess = true;
  //     },
  //     (error) => {
  //       console.error(error);
  //       // Mettez à jour les variables d'état appropriées pour refléter l'échec de l'opération
  //       this.uploadSuccess = false;
  //       this.saveSuccess = false;
  //     }
  //   );
  // }



}
