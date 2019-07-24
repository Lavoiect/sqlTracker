import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  user;
  readUsers: User;
  private popped = [];
  constructor(private userService: UserService) { }

 registerUserForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit() {

  }

  sendEmail() {
        const u = {...this.registerUserForm.value};
        console.log();
          this.userService.sendToUser(u).subscribe(
              () => this.onSaveComplete(),
              (user: User) => {
                this.onSaveComplete();
              }
            );
  }

  onSaveComplete(): void {
console.log('email Sent to new User');

  }

}
