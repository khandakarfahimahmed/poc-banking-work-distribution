import { Component } from '@angular/core';
import { WorkService } from '../services/work.service';

@Component({
  selector: 'app-task-info-list',
  templateUrl: './task-info-list.component.html',
  styleUrl: './task-info-list.component.css',
})
export class TaskInfoListComponent {
  taskinfo: any[] = [];

  constructor(private api: WorkService) {}

  ngOnInit() {
    this.getTaskInfo();
  }

  getTaskInfo() {
    this.api.getTaskInfo().subscribe((response) => {
      this.taskinfo = response.taskinfo;
    });
  }
}
