import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { GlobalService } from '../Services/global.service';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.css']
})
export class RequestResetPasswordComponent {


  email!: string;
  message!:string;

  constructor(private http: HttpClient, private globalService: GlobalService) { }

  onRequestResetPassword() {
    console.log(`${this.globalService.apiUrl}/users/reset?email=${this.email}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'skipInterceptor': ''
      })
    };
    
    this.http.post(`${this.globalService.apiUrl}/users/reset?email=${this.email}`, {},httpOptions).subscribe(
      (response:any) => {
        console.log('Password reset email sent:', response);
        this.message = response.message
        this.email = "";
      },
      error => {
        console.error('Error requesting password reset:', error);
      }
    );
  }
}
