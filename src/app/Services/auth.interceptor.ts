import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService : AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    if (req.headers.has('skipInterceptor')) {
        // Cloner la requête pour supprimer le header personnalisé avant de l'envoyer.
        const clonedRequest = req.clone({ 
          headers: req.headers.delete('skipInterceptor'),
          body: req.body // Conservez le corps FormData lors de la création de la nouvelle requête.
        });
        return next.handle(clonedRequest);
      }
  
      // Ajoutez votre logique d'interception 



    const authToken = this.authService.getToken();

    // Clone la requête et ajoute l'en-tête d'authentification
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // Transfère la requête modifiée à l'intercepteur suivant
    return next.handle(authReq);
  }
}
