import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio';
import { Project } from '../../interfaces/project.interface';
import { ProjectCardComponent } from '../../components/project-card/project-card';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, FormsModule, ProjectCardComponent],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss'
})
export class PortfolioComponent implements OnInit {

  projects: Project[] = [];
  filteredProjects: Project[] = [];
  searchText: string = '';
  showTable: boolean = false;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  private loadProjects(): void {
    this.portfolioService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.filteredProjects = projects;
      },
      error: (error) => {
        console.error('Error al cargar proyectos:', error);
      }
    });
  }

  filterProjects(): void {
    if (!this.searchText.trim()) {
      this.filteredProjects = this.projects;
      return;
    }

    const search = this.searchText.toLowerCase();
    this.filteredProjects = this.projects.filter(project =>
      project.nombre.toLowerCase().includes(search) ||
      project.descripcion.toLowerCase().includes(search) ||
      project.tecnologias?.some(tech => tech.toLowerCase().includes(search))
    );
  }

  onProjectClicked(project: Project): void {
    console.log('Proyecto clickeado:', project);
    sessionStorage.setItem('lastViewedProject', JSON.stringify(project));
  }

  toggleView(): void {
    this.showTable = !this.showTable;
  }
}
