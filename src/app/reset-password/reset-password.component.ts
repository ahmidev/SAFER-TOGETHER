import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { GlobalService } from '../Services/global.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token!: string;
  newPassword!: string;
  passwordForm! : FormGroup;
  message!:string;

  constructor(private globalService: GlobalService, private http: HttpClient, private route: ActivatedRoute, private fb: FormBuilder, private authService :AuthService) {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });




    this.passwordForm = this.fb.group ({
        password : ['',[Validators.required, this.passwordValidator]],
        confirm_password : ['',[Validators.required, this.compareValidator('password')]],
      });
  
  }

ngOnInit(): void {
    console.log(this.token);
    this.authService.updateData(false);
}

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;
  
    if (!hasNumber || !hasUppercase || !hasLowercase || !hasSpecialCharacters || !isLongEnough) {
      return { 'invalidPassword': true };
    }
  
    return null;
  }




  compareValidator(controlName: string) {
    return (control: AbstractControl) => {
      const compareControl = control.root.get(controlName);
      if (compareControl && control.value !== compareControl.value) {
        return { 'compare': true };
      }
      return null;
    };
  }





  onResetPassword() {
    const params = new HttpParams()
      .set('token', this.token)
      .set('newPassword', this.passwordForm.value.password);

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'skipInterceptor': ''
        })
      };
      
    this.http.put(`${this.globalService.apiUrl}/users/reset-password`, null, { params,...httpOptions }).subscribe(
      (response:any) => {
        console.log('Password reset successfully:', response);
        this.message = response.message
        this.passwordForm.value.reset();
      },
      error => {
        console.error('Error resetting password:', error);
      }
    );
  }
}
