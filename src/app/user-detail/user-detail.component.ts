// Import des modules nécessaires depuis Angular et d'autres modules personnalisés.
import { ApiService } from './../service/api.service'; // Import du service ApiService depuis le fichier api.service.ts
import { User } from './../models/register.model'; // Import du modèle User depuis le fichier register.model.ts
import { ActivatedRoute } from '@angular/router'; // Import du module ActivatedRoute depuis '@angular/router'
import { Component, OnInit } from '@angular/core'; // Import du composant Component et OnInit depuis '@angular/core'

// Définition du composant Angular avec le sélecteur 'app-user-detail'.
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html', // Chemin vers le fichier HTML du composant
  styleUrls: ['./user-detail.component.scss'] // Chemin vers le fichier SCSS du composant
})
export class UserDetailComponent implements OnInit {

  userId!: number; // Identifiant de l'utilisateur
  userDetails!: User; // Détails de l'utilisateur

  // Constructeur du composant avec injection de dépendances
  constructor(
    private activatedRoute: ActivatedRoute, // Injection du module ActivatedRoute
    private api: ApiService // Injection du service ApiService
  ) { }

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit() {
    // Abonnement aux paramètres de l'URL pour récupérer l'identifiant de l'utilisateur
    this.activatedRoute.params.subscribe(val => {
      this.userId = val['id']; // Assignation de l'identifiant récupéré
      this.fetchUserDetails(this.userId); // Appel de la méthode pour récupérer les détails de l'utilisateur
    })
  }

  // Méthode pour récupérer les détails d'un utilisateur à partir de son identifiant
  fetchUserDetails(userId: number) {
    this.api.getRegisteredUserId(userId)
      .subscribe({
        next: (res) => {
          this.userDetails = res; // Assignation des détails de l'utilisateur
        },
        error: (err) => {
          console.log(err);
        }
      })
  }
}
