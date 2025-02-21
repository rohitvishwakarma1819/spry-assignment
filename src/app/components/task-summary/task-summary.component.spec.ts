import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSummaryComponent } from './task-summary.component';
import { TaskService } from '../../services/task.service';
import { of } from 'rxjs';
import { TaskStatus } from '../../enums';

describe('TaskSummaryComponent', () => {
  let component: TaskSummaryComponent;
  let fixture: ComponentFixture<TaskSummaryComponent>;
  let taskServiceStub: Partial<TaskService>;

  beforeEach(async () => {
    taskServiceStub = {
      tasks$: of([
        {
          id: '1',
          title: 'title-1',
          description: 'some description',
          status: TaskStatus.PENDING,
          dueDate: new Date(),
        },
        {
          id: '2',
          title: 'title-2',
          description: 'some description2',
          status: TaskStatus.IN_PROGRESS,
          dueDate: new Date(),
        },
        {
          id: '3',
          title: 'title-3',
          description: 'some description3',
          status: TaskStatus.COMPLETED,
          dueDate: new Date(),
        },
        {
          id: '4',
          title: 'title-4',
          description: 'some description4',
          status: TaskStatus.PENDING,
          dueDate: new Date(),
        },
      ]),
    };

    await TestBed.configureTestingModule({
      imports: [TaskSummaryComponent],
      providers: [{ provide: TaskService, useValue: taskServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly count task statuses', () => {
    expect(component.pending).toBe(2);
    expect(component.inProgress).toBe(1);
    expect(component.completed).toBe(1);
  });

  it('should reset counts when task list changes', () => {
    const newTasks = [
      {
        id: '1',
        title: 'title-1',
        description: 'some description',
        status: TaskStatus.PENDING,
        dueDate: new Date(),
      },
      {
        id: '2',
        title: 'title-2',
        description: 'some description2',
        status: TaskStatus.IN_PROGRESS,
        dueDate: new Date(),
      },
    ];

    (taskServiceStub.tasks$ as any) = of(newTasks);
    fixture.detectChanges();

    expect(component.pending).toBe(2);
    expect(component.inProgress).toBe(1);
    expect(component.completed).toBe(1);
  });
});
