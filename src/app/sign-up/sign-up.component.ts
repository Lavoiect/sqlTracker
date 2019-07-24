import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user;
  constructor(private userService: UserService, private router: Router) { }

 addUserForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit() {
  }

  addUser() {
        const u = {...this.addUserForm.value};
        console.log(u);
          this.userService.createUser(u).subscribe(
              () => this.onSaveComplete(),
              (user: User) => {
                this.onSaveComplete();
              }
            );
  }

  onSaveComplete(): void {
  console.log('user added');
  this.router.navigate(['login']);
}



}
