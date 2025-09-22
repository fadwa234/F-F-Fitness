import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navmain',
  templateUrl: './navmain.component.html',
  styleUrls: ['./navmain.component.scss']
})
export class NavmainComponent  implements OnInit {
  name!: string;


  constructor() { }

  ngOnInit(): void {

  }
  
   

}
