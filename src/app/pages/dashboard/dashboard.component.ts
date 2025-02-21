import { Component } from '@angular/core';
import { TaskSummaryComponent } from '../../components/task-summary/task-summary.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';

@Component({
  selector: 'app-dashboard',
  imports: [TaskSummaryComponent, TaskListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
