import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Console } from 'console';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model:any={};
  loggedIn:boolean;
  constructor(public accountService: AccountService,private router:Router,private toastr:ToastrService) { 
    console.log("navc");
  }

  ngOnInit(): void {
    console.log("nav");

  }

  login() 
  {
    console.log("login");
    this.accountService.login(this.model).subscribe(
      Response=>{
        console.log(Response);
        this.router.navigateByUrl('/members');
        },
        error=>
        {
          console.log(error);

        }
        );
    

  }

  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/');

  }

  

}
