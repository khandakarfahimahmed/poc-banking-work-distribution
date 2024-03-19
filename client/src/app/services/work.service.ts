import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TasksResponse } from '../interfaces/tasks'; // Assuming you have a TasksResponse interface defined

@Injectable({
  providedIn: 'root',
})
export class WorkService {
  url = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<TasksResponse> {
    return this.http.get<TasksResponse>(this.url + 'tasks');
  }
}
