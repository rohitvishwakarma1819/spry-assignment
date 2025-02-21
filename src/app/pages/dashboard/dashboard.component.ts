import { Component } from '@angular/core';
import { TaskSummaryComponent } from '../../components/task-summary/task-summary.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [TaskSummaryComponent, RouterOutlet, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private router: Router) {}
  debugClick(message: string) {
    console.log(message);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
