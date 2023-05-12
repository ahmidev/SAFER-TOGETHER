import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../modele/User';
import { GlobalService } from '../Services/global.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit{
  // firstName!: string;
  // lastName!: string;
  // birthdate!: string;
  // email!: string;
  // password!: string;


  file!: File;


  userForm! : FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private router:Router, private globalService: GlobalService) {


  this.userForm = this.fb.group ({
    lastname : ['',[Validators.required]],
      firstname : ['',[Validators.required, Validators.minLength(2)]],
      email : ['',[Validators.required, Validators.email]],
      birthday : ['',[Validators.required]],
      password : ['',[Validators.required, this.passwordValidator]],
      confirm_password : ['',[Validators.required, this.compareValidator('password')]],
      file : ['',Validators.required],
      checkbox : ['',[Validators.required]],
    });



  }



  ngOnInit(): void {
    console.log(this.userForm.value.checkbox);
    console.log(this.userForm.value.confirm_password);
    console.log(this.userForm.errors);
    console.log(this.userForm);
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

  onSubmit() {


    const formData = new FormData();
    formData.append('firstname', this.userForm.value.lastname);
    formData.append('lastname', this.userForm.value.firstname);
    formData.append('birthday', this.userForm.value.birthday);
    formData.append('email', this.userForm.value.email);
    formData.append('password', this.userForm.value.password);
    formData.append('file', this.file, this.file.name);
    console.log(this.file.name);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'skipInterceptor': ''
      })
    };
    const headers = new HttpHeaders({
      'skipInterceptor': '' // Ajoutez ce header pour ignorer l'intercepteur pour cette requête
    });

    this.http.post(`${this.globalService.apiUrl}/auth/register`, formData, { headers }).subscribe(
      (response) =>{
        console.log('Envoi réussi');
        this.router.navigate(["register"]);
        console.log(response);


      } ,
      error => {

        console.error(error)
      }
    );
  }

  onFileChange(event: Event) {
    console.log(event);

    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.file = input.files[0];
    }
}

}
