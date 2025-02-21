import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskStatus } from '../../enums';

@Component({
  selector: 'app-task-summary',
  imports: [],
  templateUrl: './task-summary.component.html',
  styleUrl: './task-summary.component.scss',
})
export class TaskSummaryComponent implements OnInit {
  pending = 0;
  inProgress = 0;
  completed = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.tasks$.subscribe((tasks) => {
      this.pending = 0;
      this.inProgress = 0;
      this.completed = 0;

      tasks.forEach((task) => {
        switch (task.status) {
          case TaskStatus.PENDING:
            this.pending++;
            break;
          case TaskStatus.COMPLETED:
            this.completed++;
            break;

          case TaskStatus.IN_PROGRESS:
            this.inProgress++;
            break;
        }
      });
    });
  }
}
