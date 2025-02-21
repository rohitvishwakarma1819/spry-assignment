import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Task>();

  deleteTask() {
    this.delete.emit(this.task.id);
  }

  editTask() {
    this.edit.emit(this.task);
  }
}
