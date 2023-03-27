import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../modele/User';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {

  userForm! : FormGroup;
  constructor(private fb: FormBuilder) { 

  this.userForm = this.fb.group ({
      name : ['',Validators.required],
      firstname : ['',Validators.required],
      email : ['',Validators.required],
      birthday : ['',Validators.required],
      password : ['',Validators.required],
      confirm_password : ['',Validators.required],
      file : ['',Validators.required],
    })

  }


    onSubmit(){

      let newUser : User = new User(this.userForm.value.name,this.userForm.value.firstname,this.userForm.value.email,this.userForm.value.birthday,this.userForm.value.password,this.userForm.value.file,) 
      console.log(newUser)

      fetch('http://localhost:8080/user/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newUser)
})
.then(response => {
  if (!response.ok) {
    throw new Error('Erreur lors de la création de l\'utilisateur.');
  }
  return response.json();
})

.then(data => {
  console.log('Utilisateur créé avec succès : ', data);
})
.catch(error => {
  console.error(error);
});
    }





}
