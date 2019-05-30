import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../app/project';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = 'http://127.0.0.1:8887';

  constructor(private httpClient: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${this.PHP_API_SERVER}/projectBackend/api/read.php`);
  }

  getProject(id: number) {
    return this.httpClient.post('http://127.0.0.1:8887/projectBackend/api/readSingle.php', {'id': id});
  }

  deleteProject(id: number) {
    return this.httpClient.delete<Project>(`${this.PHP_API_SERVER}/projectBackend/api/delete.php/?id=${id}`);
  }
  createProject(project: Project) {
    return this.httpClient.post<Project>(`${this.PHP_API_SERVER}/projectBackend/api/create.php`, project);
  }

  updateProject(project: Project) {
    return this.httpClient.put<Project>(`${this.PHP_API_SERVER}/projectBackend/api/update.php`, project);
  }
}
