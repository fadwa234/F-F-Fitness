// Import des dépendances nécessaires depuis Angular et d'autres modules personnalisés.
import { User } from './../models/register.model'; // Import du modèle User depuis le fichier register.model.ts
import { Component, OnInit } from '@angular/core'; // Import de certains composants du module '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'; // Import du FormBuilder et FormGroup depuis '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'; // Import de ActivatedRoute et Router depuis '@angular/router'
import { NgToastService } from 'ng-angular-popup'; // Import du service NgToastService depuis 'ng-angular-popup'
import { ApiService } from '../service/api.service'; // Import du service ApiService depuis le fichier api.service.ts

// Définition du composant Angular avec le sélecteur 'app-create-registration'.
@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html', // Chemin vers le fichier HTML du composant
  styleUrls: ['./create-registration.component.css'] // Chemin vers le fichier CSS du composant
})
export class CreateRegistrationComponent implements OnInit {

  // Déclaration de variables membres
  selectedGender!: string; // Variable pour stocker le genre sélectionné
  genders: string[] = ["Male", "Female"]; // Tableau de genres disponibles
  packages: string[] = ["Monthly", "Quarterly", "Yearly"]; // Tableau de types d'abonnements disponibles
  importantList: string[] = [
    "Toxic Fat reduction",
    "Energy and Endurance",
    "Building Lean Muscle",
    "Healthier Digestive System",
    "Sugar Craving Body",
    "Fitness"
  ] // Liste d'éléments importants

  registrationForm!: FormGroup; // Formulaire de création/édition d'inscription
  private userIdToUpdate!: number; // Identifiant de l'utilisateur à mettre à jour
  public isUpdateActive: boolean = false; // Indicateur pour savoir si la mise à jour est active

  // Constructeur du composant avec injection de dépendances
  constructor(
    private fb: FormBuilder, // Injection du FormBuilder
    private api: ApiService, // Injection du service ApiService
    private toastService: NgToastService, // Injection du service NgToastService
    private activatedRoute: ActivatedRoute, // Injection de ActivatedRoute
    private router: Router // Injection de Router
  ) {}

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Initialisation du formulaire de création/édition d'inscription avec des champs vides par défaut
    this.registrationForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      requireTrainer: [''],
      package: [''],
      important: [''],
      haveGymBefore: [''],
      enquiryDate: ['']
    });

    // Abonnement aux changements de la valeur du champ 'height' pour recalculer le BMI
    this.registrationForm.controls['height'].valueChanges.subscribe(res => {
      this.calculateBmi(res);
    });

    // Abonnement aux paramètres de l'URL pour récupérer l'identifiant de l'utilisateur à mettre à jour
    this.activatedRoute.params.subscribe(val => {
      this.userIdToUpdate = val['id'];
      if (this.userIdToUpdate) {
        this.isUpdateActive = true;
        // Appel du service pour récupérer les détails de l'utilisateur à mettre à jour
        this.api.getRegisteredUserId(this.userIdToUpdate)
          .subscribe({
            next: (res) => {
              this.fillFormToUpdate(res); // Remplissage du formulaire avec les détails de l'utilisateur à mettre à jour
            },
            error: (err) => {
              console.log(err);
            }
          })
      }
    })
  }

  // Méthode appelée lors de la soumission du formulaire de création/édition d'inscription
  submit() {
    // Appel du service pour créer une nouvelle inscription
    this.api.postRegistration(this.registrationForm.value)
      .subscribe(res => {
        this.toastService.success({ detail: 'SUCCESS', summary: 'Registration Successful', duration: 7000 }); // Affichage d'une notification de succès
        this.registrationForm.reset(); // Réinitialisation du formulaire
      });
  }

  // Méthode pour remplir le formulaire lors de la mise à jour d'un utilisateur
  fillFormToUpdate(user: User) {
    this.registrationForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      weight: user.weight,
      height: user.height,
      bmi: user.bmi,
      bmiResult: user.bmiResult,
      gender: user.gender,
      requireTrainer: user.requireTrainer,
      package: user.package,
      important: user.important,
      haveGymBefore: user.haveGymBefore,
      enquiryDate: user.enquiryDate
    })
  }

  // Méthode pour mettre à jour les détails d'un utilisateur
  update() {
    this.api.updateRegisterUser(this.registrationForm.value, this.userIdToUpdate)
      .subscribe(res => {
        this.toastService.success({ detail: 'SUCCESS', summary: 'User Details Updated Successful', duration: 7000 }); // Affichage d'une notification de succès
        this.router.navigate(['list']); // Redirection vers la liste des utilisateurs
        this.registrationForm.reset(); // Réinitialisation du formulaire
      });
  }

  // Méthode pour calculer le BMI en fonction du poids et de la taille
  calculateBmi(value: number) {
    const weight = this.registrationForm.value.weight; // Poids en kilogrammes
    const height = value; // Taille en mètres
    const bmi = weight / (height * height); // Calcul du BMI
    this.registrationForm.controls['bmi'].patchValue(bmi); // Mise à jour du champ 'bmi' dans le formulaire
    // Attribution d'une catégorie en fonction du BMI
    switch (true) {
      case bmi < 18.5:
        this.registrationForm.controls['bmiResult'].patchValue("Underweight");
        break;
      case (bmi >= 18.5 && bmi < 25):
        this.registrationForm.controls['bmiResult'].patchValue("Normal");
        break;
      case (bmi >= 25 && bmi < 30):
        this.registrationForm.controls['bmiResult'].patchValue("Overweight");
        break;
      default:
        this.registrationForm.controls['bmiResult'].patchValue("Obese");
        break;
    }
  }

}
