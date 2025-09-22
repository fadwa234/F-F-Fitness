import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  public contactForm!: FormGroup
  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router: Router) {}



  ngOnInit(): void {
  
    this.contactForm = this.formBuilder.group({
      fullname:[''],
      email:[''],
      password:[''],
      phonenumber:[''],
      message:['']
    })

   
  }

  contact(){
      this.http.get<any>("http://localhost:3000/signupUsers")
      .subscribe(res=>{
        const user = res.find((a:any)=>{
          return a.email === this.contactForm.value.email && a.password === this.contactForm.value.password
        })
        if(user){
          alert("Message Sent!!");
          this.contactForm.reset();
          this.router.navigate(['home'])
        }else{
        alert("user not found!!");
      }
      },err=>{
        alert("Something went wrong!!")
      }
      
      
      )
  }
}
