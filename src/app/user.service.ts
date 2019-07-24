import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  createUser(user: User) {
    return this.http.post<User>('http://127.0.0.1:8887/projectBackend/api/user/createUser.php', user);
  }
  sendToUser(user: User) {
    return this.http.post<User>('http://127.0.0.1:8887/projectBackend/api/user/registration.php', user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://127.0.0.1:8887/projectBackend/api/user/getUsers.php');
  }

  deleteUser(userid: number) {
    return this.http.delete<User>('http://127.0.0.1:8887/projectBackend/api/user/deleteUser.php/?userid=' + userid);
  }
}
