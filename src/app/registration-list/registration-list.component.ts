// Import des modules nécessaires depuis Angular, les modules Angular Material, et d'autres modules personnalisés.
import { Router } from '@angular/router'; // Import du module Router depuis '@angular/router'
import { User } from './../models/register.model'; // Import du modèle User depuis le fichier register.model.ts
import { ApiService } from './../service/api.service'; // Import du service ApiService depuis le fichier api.service.ts
import { Component, OnInit, ViewChild } from '@angular/core'; // Import du composant Component et OnInit depuis '@angular/core'
import { MatTableDataSource } from '@angular/material/table'; // Import du module MatTableDataSource depuis '@angular/material/table'
import { MatSort } from '@angular/material/sort'; // Import du module MatSort depuis '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator'; // Import du module MatPaginator depuis '@angular/material/paginator'
import { NgConfirmService } from 'ng-confirm-box'; // Import du service NgConfirmService depuis 'ng-confirm-box'
import { NgToastService } from 'ng-angular-popup'; // Import du service NgToastService depuis 'ng-angular-popup'

// Définition du composant Angular avec le sélecteur 'app-registration-list'.
@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html', // Chemin vers le fichier HTML du composant
  styleUrls: ['./registration-list.component.scss'] // Chemin vers le fichier SCSS du composant
})
export class RegistrationListComponent implements OnInit {

  public users!: User[]; // Liste des utilisateurs
  dataSource!: MatTableDataSource<User>; // Source de données pour le tableau

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'mobile', 'bmiResult', 'gender', 'package', 'enquiryDate', 'action'];
  // Colonnes à afficher dans le tableau

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Référence au composant MatPaginator
  @ViewChild(MatSort) sort!: MatSort; // Référence au composant MatSort

  // Constructeur du composant avec injection de dépendances
  constructor(
    private apiService: ApiService, // Injection du service ApiService
    private router: Router, // Injection du module Router
    private confirmService: NgConfirmService, // Injection du service NgConfirmService
    private toastService: NgToastService // Injection du service NgToastService
  ) { }

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit() {
    this.getUsers(); // Appel de la méthode pour récupérer la liste des utilisateurs
  }

  // Méthode pour récupérer la liste des utilisateurs depuis le service
  getUsers() {
    this.apiService.getRegisteredUser()
      .subscribe({
        next: (res) => {
          this.users = res; // Assignation de la liste des utilisateurs
          this.dataSource = new MatTableDataSource(this.users); // Initialisation de la source de données du tableau
          this.dataSource.paginator = this.paginator; // Configuration du composant MatPaginator
          this.dataSource.sort = this.sort; // Configuration du composant MatSort
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  // Méthode pour rediriger vers la page de mise à jour d'un utilisateur
  edit(id: number) {
    this.router.navigate(['update', id])
  }

  // Méthode pour supprimer un utilisateur
  deleteUser(id: number) {
    this.confirmService.showConfirm("",
      () => {
        // Logique à exécuter si 'Oui' est cliqué
        this.apiService.deleteRegistered(id)
          .subscribe({
            next: (res) => {
              this.toastService.success({ detail: 'SUCCESS', summary: 'Deleted Successfully', duration: 7000 });
              this.getUsers(); // Rafraîchissement de la liste des utilisateurs après la suppression
            },
            error: (err) => {
              this.toastService.error({ detail: 'ERROR', summary: 'Something went wrong!', duration: 3000 });
            }
          })
      },
      () => {
        // Logique à exécuter si 'Non' est cliqué
      })
  }

  // Méthode pour appliquer un filtre sur le tableau
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Application du filtre en convertissant le texte en minuscules
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // Retour à la première page du tableau après l'application du filtre
    }
  }

}
