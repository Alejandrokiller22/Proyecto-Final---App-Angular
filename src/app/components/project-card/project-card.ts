import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../interfaces/project.interface';

@Component({
  selector: 'app-project-card',
  imports: [CommonModule],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss'
})
export class ProjectCardComponent {

  @Input() project!: Project;
  @Output() projectClicked = new EventEmitter<Project>();

  onImageError(event: any): void {
    event.target.src = 'assets/default-project.jpg';
  }

  onProjectClick(): void {
    this.projectClicked.emit(this.project);
  }
}
