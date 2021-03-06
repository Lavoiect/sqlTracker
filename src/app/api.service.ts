import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../app/project';
import { Observable } from 'rxjs';
import { Task } from './projects/task';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = 'http://127.0.0.1:8887';

  constructor(private httpClient: HttpClient) { }

  createTask(task: Task) {
    console.log('create Task API');
    return this.httpClient.post<Task>(`${this.PHP_API_SERVER}/projectBackend/api/task/createTask.php`, task);
  }
  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>('http://127.0.0.1:8887/projectBackend/api/task/readTask.php');
  }

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>('http://127.0.0.1:8887/projectBackend/api/project/read.php');
  }

  getProject(id: number) {
    return this.httpClient.post('http://127.0.0.1:8887/projectBackend/api/project/readSingle.php', {'id': id});
  }

  deleteProject(id: number) {
    return this.httpClient.delete<Project>(`${this.PHP_API_SERVER}/projectBackend/api/project/delete.php/?id=${id}`);
  }
  deleteTask(id: number) {
    return this.httpClient.delete<Task>(`${this.PHP_API_SERVER}/projectBackend/api/task/deleteTask.php/?id=${id}`);
  }
  createProject(project: Project) {
    return this.httpClient.post<Project>(`${this.PHP_API_SERVER}/projectBackend/api/project/create.php`, project);
  }

  updateProject(project: Project) {
    return this.httpClient.put<Project>(`${this.PHP_API_SERVER}/projectBackend/api/project/update.php`, project);
  }

}
