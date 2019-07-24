import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }
logInUser(event) {
  event.preventDefault();
  const target = event.target;
  const username = target.querySelector('#username').value;
  const password = target.querySelector('#password').value;

  this.auth.getUserDetails(username, password).subscribe(data => {
    if (data.success) {
      this.router.navigate(['home/dash']);
      this.auth.setLoggedIn(true);
    } else {
      alert(data.message);

    }
  });

}



}
