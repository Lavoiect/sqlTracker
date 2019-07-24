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

 addUserForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit() {
    this.fetchUsers();
  }

  addUser() {
        const u = { ...this.readUsers, ...this.addUserForm.value};
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

}
