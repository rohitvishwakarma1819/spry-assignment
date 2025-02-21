import { Injectable } from '@angular/core';
import { Task } from '../models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = this.loadFromLocalStorage();
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);

  tasks$ = this.tasksSubject.asObservable();
  constructor() {}

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  addTask(task: Task) {
    task.id = Date.now().toString();
    this.tasks.push(task);
    this.updateTasks();
  }

  editTask(updatedTask: Task) {
    const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.updateTasks();
    }
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.updateTasks();
  }

  private updateTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.tasksSubject.next([...this.tasks]);
  }

  private loadFromLocalStorage(): Task[] {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
  }
}
