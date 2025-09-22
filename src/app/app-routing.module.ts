import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRegistrationComponent } from './create-registration/create-registration.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ClassesComponent } from './classes/classes.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HeaderComponent } from './header/header.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home' },
  {path: 'home', component: HomeComponent},
 
  { path: 'register', component: CreateRegistrationComponent },
  { path: 'update/:id', component: CreateRegistrationComponent },
  { path: 'detail/:id', component: UserDetailComponent },
  { path: 'list', component: RegistrationListComponent },
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'classes', component: ClassesComponent},
  {path: 'blogs', component: BlogsComponent},
  {path: 'aboutus', component: AboutusComponent}
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
