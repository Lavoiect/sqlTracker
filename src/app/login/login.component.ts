import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../auth.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

showError = false;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }
logInUser(event) {
  event.preventDefault();
  const target = event.target;
  let username = target.querySelector('#username').value;
  let password = target.querySelector('#password').value;




  this.auth.getUserDetails(username, password).subscribe(data => {
    if (data.success) {
      this.router.navigate(['home/dash']);
      this.auth.setLoggedIn(true);
    } else {
      this.showError = true;
      username = target.querySelector('#username').value = '';
      password = target.querySelector('#password').value = '';
    }
  });

}

resetPassword(event) {
  event.preventDefault();
  const target = event.target;
  const forgot = target.querySelector('#forgot').value;
  console.log(forgot);

  this.auth.resetPassword(forgot).subscribe(data => {
    if (data.success) {
      this.router.navigate(['signup']);
      this.auth.setLoggedIn(true);
    } else {

    }
  });
}

}
