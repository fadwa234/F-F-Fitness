// Import des modules nécessaires depuis Angular et d'autres modules personnalisés.
import { HttpClient } from '@angular/common/http'; // Import du module HttpClient depuis '@angular/common/http'
import { Component, OnInit } from '@angular/core'; // Import du composant Component et OnInit depuis '@angular/core'
import { FormGroup, FormBuilder } from "@angular/forms"; // Import du FormGroup et FormBuilder depuis '@angular/forms'
import { Router } from '@angular/router'; // Import du module Router depuis '@angular/router'

// Définition du composant Angular avec le sélecteur 'app-signup'.
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html', // Chemin vers le fichier HTML du composant
  styleUrls: ['./signup.component.scss'] // Chemin vers le fichier SCSS du composant
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup; // Formulaire de création de compte

  // Constructeur du composant avec injection de dépendances
  constructor(
    private formBuilder: FormBuilder, // Injection du FormBuilder
    private http: HttpClient, // Injection du module HttpClient
    private router: Router // Injection du module Router
  ) {}

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Initialisation du formulaire de création de compte avec des champs vides par défaut
    this.signupForm = this.formBuilder.group({
      fullname: [''],
      username: [''],
      email: [''],
      phonenumber: [''],
      password: [''],
      confirmpassword: ['']
    });
  }

  // Méthode pour effectuer l'inscription en envoyant les données au serveur
  signup() {
    this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
      .subscribe(res => {
        alert("Signup Successful!!"); // Affichage d'une alerte de succès
        this.signupForm.reset(); // Réinitialisation du formulaire
        this.router.navigate(['login']); // Redirection vers la page de connexion
      }, err => {
        alert("Something went wrong!!"); // Affichage d'une alerte en cas d'erreur
      });
  }

}
