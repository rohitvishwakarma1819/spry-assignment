import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { Task } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Input() showActions = false;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Task>();

  deleteTask() {
    this.delete.emit(this.task.id);
  }

  editTask() {
    this.edit.emit(this.task);
  }
}
