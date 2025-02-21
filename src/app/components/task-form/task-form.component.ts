import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../models';
import { CommonModule } from '@angular/common';
import { TaskStatus } from '../../enums';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  taskForm: FormGroup;
  taskStatuses = TaskStatus;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) data: Task
  ) {
    this.taskForm = this.fb.group({
      title: [
        data?.title ?? '',
        [Validators.required, Validators.minLength(3)],
      ],
      description: [data?.description ?? ''],
      status: [data?.status ?? '', Validators.required],
      dueDate: [
        data?.dueDate ?? '',
        [Validators.required, this.futureDateValidator],
      ],
    });
  }

  get title() {
    return this.taskForm.get('title');
  }

  get description() {
    return this.taskForm.get('description');
  }

  get dueDate() {
    return this.taskForm.get('dueDate');
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    return selectedDate < new Date() ? { pastDate: true } : null;
  }
  onSubmit() {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }
}
