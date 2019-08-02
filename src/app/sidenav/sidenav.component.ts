import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

user;

isAdmin = 'user';

  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }



  ngOnInit() {
    this.isAdmin = this.authService.isAdmin;
    console.log(this.isAdmin);
  }
logOut() {
  this.authService.logOutUser();
  this.router.navigate(['login']);
  console.log('Logging out');

}

}
