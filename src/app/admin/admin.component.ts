import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';
import { Updaterole } from '../userRole';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  user;
  userRole;
  readUsers: User;
  private popped = [];
  constructor(private userService: UserService) { }

 registerUserForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  updateForm = new FormGroup({
    user: new FormControl(''),
    role: new FormControl(''),
  });

  ngOnInit() {
    this.fetchUsers();
  }

  sendEmail() {
        const u = { ...this.readUsers, ...this.registerUserForm.value};
        console.log(u);
          this.userService.sendToUser(u).subscribe(
              () => this.onSaveComplete(),
              (user: User) => {
                this.onSaveComplete();
              }
            );
  }

  onSaveComplete(): void {
console.log('user added');
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe((user: User[]) => {
      this.user = user;
      console.log(this.user);
    });
  }

  deleteUser(userid) {
    this.userService.deleteUser(userid).subscribe((user: User) => {
      this.popped.push(this.user.pop());
    });
  }


onSaveCompleteI(): void {
  console.log('Role Changed');
    }

    updateUser(username) {
      this.updateForm.value.user = username;
      const u = { ...this.updateForm.value};
      console.log(u);
        this.userService.updateUser(u).subscribe(
            () => this.onSaveCompleteI(),
            (user: User) => {
              this.onSaveCompleteI();
            }
          );
    }
}
