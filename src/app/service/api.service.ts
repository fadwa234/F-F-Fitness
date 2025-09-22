import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/register.model';

//api service facilite la cummunication entre votre application front-end et un serveur distant

//Ce service expose les méthodes get , post , delete , update



/*json-server stocke toutes les données dans le fichier db.json, il nous permet d'imiter une api et de 
fournir un accès dynamique aux données.cela veut dire qu'on peut lire,ajouter,mettre à jour et supprimer des données (GET,POST,PUT,PATCH,DELETE) */


/*Http Client facilite l'envoi de requêtes HTTP vers des serveurs distants et la gestion des réponses.Il est généralement utilisé 
pour interagir avec des API(Interfaces de Programmation Applicative) pour récupérer ou envoyer des données  */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = "http://localhost:3000/registered"
  constructor(private http: HttpClient) { }

  postRegistration(registerObj: User) {
    return this.http.post<User>(`${this.baseUrl}`, registerObj)
  }

  getRegisteredUser() {
    return this.http.get<User[]>(`${this.baseUrl}`)
  }

  updateRegisterUser(registerObj: User, id: number) {
    return this.http.put<User>(`${this.baseUrl}/${id}`, registerObj)
  }

  deleteRegistered(id: number) {
    return this.http.delete<User>(`${this.baseUrl}/${id}`)
  }

  getRegisteredUserId(id: number) {
    return this.http.get<User>(`${this.baseUrl}/${id}`)
  }

}

