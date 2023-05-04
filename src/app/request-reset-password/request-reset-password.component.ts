import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.css']
})
export class RequestResetPasswordComponent {


  email!: string;
  message!:string;

  constructor(private http: HttpClient) { }

  onRequestResetPassword() {
    console.log(`http://217.160.37.151:8080/users/reset?email=${this.email}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'skipInterceptor': ''
      })
    };
    
    this.http.post(`http://217.160.37.151:8080/users/reset?email=${this.email}`, {},httpOptions).subscribe(
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
