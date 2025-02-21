import { Component, OnInit } from '@angular/core';
import { Task } from '../../models';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskService } from '../../services/task.service';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskStatus } from '../../enums';
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

type TaskStatusFilter = TaskStatus | 'All';

@Component({
  selector: 'app-task-list',
  imports: [TaskCardComponent, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]> = of([]);
  filteredTasks$ = this.tasks$;
  sortedTasks$ = this.filteredTasks$;
  filter: TaskStatusFilter = 'All';
  taskStatuses = TaskStatus;

  private filteredSubject = new BehaviorSubject<TaskStatusFilter>('All');
  private sortedSubject = new BehaviorSubject<string>('asc');

  constructor(
    private readonly dialog: MatDialog,
    private readonly taskService: TaskService
  ) {
    this.tasks$ = this.taskService.getTasks();
  }

  ngOnInit(): void {
    this.applyFilterAndSort();
  }

  openTaskForm(task?: Task) {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '800px',
      data: task ?? {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (task) {
          this.taskService.editTask({ ...task, ...result });
        } else {
          this.taskService.addTask(result);
        }
      }
    });
  }

  editTask(task: Task) {
    this.openTaskForm(task);
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  changeFilter(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.filteredSubject.next(target.value as TaskStatusFilter);
    this.applyFilterAndSort();
  }

  private applyFilterAndSort() {
    this.filteredTasks$ = combineLatest([
      this.tasks$,
      this.filteredSubject,
      this.sortedSubject,
    ]).pipe(
      map(([tasks, filter, sort]) => {
        let filteredTasks = tasks;
        if (filter !== 'All') {
          filteredTasks = tasks.filter((task) => task.status === filter);
        }

        return filteredTasks.sort((a, b) => {
          const dateA = new Date(a.dueDate).getTime();
          const dateB = new Date(b.dueDate).getTime();
          return sort === 'asc' ? dateA - dateB : dateB - dateA;
        });
      })
    );
  }

  setSortOrder(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.sortedSubject.next(target.value);
    this.applyFilterAndSort();
  }
}
