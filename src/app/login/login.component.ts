// Import des modules nécessaires depuis Angular et d'autres modules personnalisés.
import { HttpClient } from '@angular/common/http'; // Import du module HttpClient depuis '@angular/common/http'
import { Component, OnInit } from '@angular/core'; // Import du composant Component et OnInit depuis '@angular/core'
import { FormGroup, FormBuilder } from "@angular/forms"; // Import du FormGroup et FormBuilder depuis '@angular/forms'
import { Router } from '@angular/router'; // Import du module Router depuis '@angular/router'

// Définition du composant Angular avec le sélecteur 'app-login'.
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', // Chemin vers le fichier HTML du composant
  styleUrls: ['./login.component.scss'] // Chemin vers le fichier SCSS du composant
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup; // Formulaire de connexion

  // Constructeur du composant avec injection de dépendances
  constructor(
    private formBuilder: FormBuilder, // Injection du FormBuilder
    private http: HttpClient, // Injection du module HttpClient
    private router: Router // Injection du module Router
  ) {}

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Initialisation du formulaire de connexion avec des champs vides par défaut
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  // Méthode pour effectuer la connexion en vérifiant les informations auprès du serveur
  login() {
    this.http.get<any>("http://localhost:3000/signupUsers")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        });
        if (user) {
          alert("Login Success!!"); // Affichage d'une alerte de succès
          this.loginForm.reset(); // Réinitialisation du formulaire
          this.router.navigate(['register']); // Redirection vers la page de registration (à ajuster selon la logique de l'application)
        } else {
          alert("User not found!!"); // Affichage d'une alerte en cas d'utilisateur non trouvé
        }
      }, err => {
        alert("Something went wrong!!"); // Affichage d'une alerte en cas d'erreur
      });
  }
}
