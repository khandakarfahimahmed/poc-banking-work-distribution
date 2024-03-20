import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskInfoListComponent } from './task-info-list/task-info-list.component';

const routes: Routes = [
  { path: 'tasks', component: TaskListComponent },
  { path: 'taskinfo', component: TaskInfoListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
