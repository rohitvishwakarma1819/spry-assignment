import { Component, OnInit } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { Task } from '../../models';
import { TaskService } from '../../services/task.service';
import { TaskStatus } from '../../enums';

@Component({
  selector: 'app-completed-tasks',
  imports: [TaskCardComponent, CommonModule],
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.scss',
})
export class CompletedTasksComponent implements OnInit {
  completedTasks$?: Observable<Task[]>;

  constructor(private readonly taskService: TaskService) {}

  ngOnInit(): void {
    this.completedTasks$ = this.taskService
      .getTasks()
      .pipe(
        map((tasks) =>
          tasks.filter((task) => task.status === TaskStatus.COMPLETED)
        )
      );
  }
}
