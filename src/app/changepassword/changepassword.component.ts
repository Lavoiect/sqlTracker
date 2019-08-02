import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from './passwordValidation';
import { User } from '../user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
user;
  form: FormGroup;

  constructor(fb: FormBuilder, private auth: AuthService) {
    this.form = fb.group({
        user: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, {
        validator: PasswordValidation.MatchPassword
      });
   }

  ngOnInit() {

  }
  onSubmit() {
    const u = { ...this.form.value};
      console.log(u);
        this.auth.changePassword(u).subscribe(
            () => this.onSaveComplete(),
            (user: User) => {
              this.onSaveComplete();
            }
          );
}
onSaveComplete(): void {
  console.log('Password reset');
    }
}
