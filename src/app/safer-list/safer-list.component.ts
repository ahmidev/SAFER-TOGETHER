import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-safer-list',
  templateUrl: './safer-list.component.html',
  styleUrls: ['./safer-list.component.css']
})
export class SaferListComponent implements OnInit {


  listSafer!: any[];


  ngOnInit(): void {

    // const token = localStorage.getItem('token');
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0b3RvQGdtYWlsLmNvbSIsImZ1bGxOYW1lIjoidGF0YSB0b3RvIiwiZXhwIjoxNjgwOTkxNTQ5LCJ1c2VySWQiOjQsImlhdCI6MTY4MDI3MTU0OSwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XX0.Ul0A7TCmPy3kzkF5mKpH-psI92hGgO_B8WIr2HnYSMo";
    const url = 'http://localhost:8080/users/';
    const options = {
      method: 'GET', // Méthode HTTP (GET, POST, PUT, DELETE, etc.)
      headers: {
        'Authorization': 'Bearer ' + token, // Ajout du token d'authentification dans l'en-tête de la requête
        'Content-Type': 'application/json' // Définition du type de contenu de la requête (ici JSON)
      }
    }

    fetch(url, options)
      .then(response => {
        // Manipuler les données des utilisateurs ici
        console.log(" utilisateur connecté", response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erreur réseau');
        }
      })
      .then(data => {
        // Traitement de la réponse de l'API
        console.log(data);

        this.listSafer = data;
      })
      .catch(error => {
        console.error('Erreur :', error);
      });
    ;


  }

  // fetch(url, options)
  // .then(response => {
  //   if (response.ok) {
  //     return response.json();
  //   } else {
  //     throw new Error('Erreur réseau');
  //   }
  // })
  // .then(data => {
  //   // Traitement de la réponse de l'API
  // })
  // .catch(error => {
  //   console.error('Erreur :', error);
  // });

}
