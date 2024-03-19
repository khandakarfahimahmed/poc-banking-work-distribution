import { Component, OnInit } from '@angular/core';
import { WorkService } from '../services/work.service';
import { Task } from '../interfaces/tasks';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private api: WorkService) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.api.getTasks().subscribe((response) => {
      this.tasks = response.tasks;
    });
  }
}
