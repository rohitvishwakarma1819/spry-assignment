import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CompletedTasksComponent } from './components/completed-tasks/completed-tasks.component';
import { TaskListComponent } from './components/task-list/task-list.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', pathMatch: 'full', component: TaskListComponent },
      { path: 'completed', component: CompletedTasksComponent },
    ],
  },
];
