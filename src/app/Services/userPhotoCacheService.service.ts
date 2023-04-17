import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserPhotoService } from './user-photo.service';

@Injectable({
  providedIn: 'root'
})
export class UserPhotoCacheService {

  private photoCache: Map<number, SafeUrl> = new Map<number, SafeUrl>();

  constructor(
    private userPhotoService: UserPhotoService,
    private sanitizer: DomSanitizer
  ) { }




  async getUserPhoto(userId: number, filename: string|null): Promise<SafeUrl> {
    return new Promise(async (resolve) => {
      if (this.photoCache.has(userId)) {
        resolve(this.photoCache.get(userId) ?? this.sanitizer.bypassSecurityTrustUrl('../assets/default.svg'));
        return;
      }
  
      // Utiliser l'image par défaut si le nom de fichier n'est pas disponible
      if (!filename) {
        const defaultUrl = this.sanitizer.bypassSecurityTrustUrl('../assets/Safer1.svg');
        this.photoCache.set(userId, defaultUrl);
        resolve(defaultUrl);
        return;
      }
  
      // Charger l'image de l'utilisateur et la mettre en cache
      try {
        // this.userPhotoService.getUserPhoto(filename).subscribe(
        //   (photoBlob: Blob) => {
        //     const photoUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(photoBlob));
        //     this.photoCache.set(userId, photoUrl);
        //     resolve(photoUrl);
        //   },
        //   (error) => {
        //     console.error('Error fetching user photo:', error);
        //     const defaultUrl = this.sanitizer.bypassSecurityTrustUrl('../assets/Safer1.svg');
        //     this.photoCache.set(userId, defaultUrl);
        //     resolve(defaultUrl);
        //   }
        // );
        this.userPhotoService.getUserPhoto(filename).subscribe(
          (photoUrl: SafeUrl) => {
            this.photoCache.set(userId, photoUrl);
            resolve(photoUrl);
          },
          (error) => {
            console.error('Error fetching user photo:', error);
            const defaultUrl = this.sanitizer.bypassSecurityTrustUrl('../assets/Safer1.svg');
            this.photoCache.set(userId, defaultUrl);
            resolve(defaultUrl);
          }
        );
      } catch (error) {
        console.error('Error fetching user photo:', error);
        const defaultUrl = this.sanitizer.bypassSecurityTrustUrl('../assets/Safer1.svg');
        this.photoCache.set(userId, defaultUrl);
        resolve(defaultUrl);
      }
    });
  }
  
  
}