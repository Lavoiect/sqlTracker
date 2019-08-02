import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from './user';
import { UserChange } from './userChange';


interface Mydata {
  success: boolean;
  message: string;
  isAdmin: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = false;

  constructor(private http: HttpClient) { }

  public isAdmin = 'user';

setLoggedIn(value: boolean) {
  this.loggedInStatus = value;
}

get isLoggedIn() {
  return this.loggedInStatus;
}

  getUserDetails(username, password) {
    return this.http.post<Mydata>('http://127.0.0.1:8887/projectBackend/api/user/auth.php',  {
      username,
      password
    });
  }

  resetPassword(forgot) {
    return this.http.post<Mydata>('http://127.0.0.1:8887/projectBackend/api/user/resetPassword.php', {
    forgot
    });
  }

  changePassword(user: UserChange) {
    return this.http.post<UserChange>('http://127.0.0.1:8887/projectBackend/api/user/changePassword.php', user);
  }
  logOutUser() {
    return this.http.get('http://127.0.0.1:8887/projectBackend/api/project/logout.php');
  }
}
