import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {

  constructor(private fb: FormBuilder) { }


  userForm = this.fb.group ({
      name : ['',Validators.required],
      firstname : ['',Validators.required],
      email : ['',Validators.required],
      birthday : ['',Validators.required],
      password : ['',Validators.required],
      confirm_password : ['',Validators.required],
      file : ['',Validators.required],
    })



    onSubmit(){
      console.log(this.userForm.value)
    }

   
}
