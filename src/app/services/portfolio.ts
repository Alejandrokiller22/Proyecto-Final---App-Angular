import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from '../interfaces/project.interface';

/**
 * Servicio para gestionar los datos del portfolio
 */
@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private projectsSubject = new BehaviorSubject<Project[]>(this.loadProjects());
  public projects$: Observable<Project[]> = this.projectsSubject.asObservable();

  constructor() {
    this.initializeProjects();
  }

  private initializeProjects(): void {
    const stored = localStorage.getItem('projects');
    if (!stored) {
      this.saveProjects(this.getDefaultProjects());
    }
  }

  private getDefaultProjects(): Project[] {
    return [
      {
        id: 1,
        nombre: 'Portfolio Personal',
        descripcion: 'Mi primer portfolio web con HTML y CSS.',
        enlace: 'https://github.com/alejandro/portfolio',
        imagen: '/proyecto1.jpg',
        tecnologias: ['HTML', 'CSS', 'Bootstrap'],
        fecha: new Date('2024-01-15')
      },
      {
        id: 2,
        nombre: 'To-Do App',
        descripcion: 'Aplicación para gestionar tareas diarias.',
        enlace: 'https://github.com/alejandro/todo-app',
        imagen: '/proyecto2.jpg',
        tecnologias: ['JavaScript', 'React', 'LocalStorage'],
        fecha: new Date('2024-03-20')
      },
      {
        id: 3,
        nombre: 'Blog Simple',
        descripcion: 'Blog donde comparto aprendizajes de programación.',
        enlace: 'https://github.com/alejandro/blog',
        imagen: '/proyecto3.jpg',
        tecnologias: ['Node.js', 'Express', 'MongoDB'],
        fecha: new Date('2024-05-10')
      }
    ];
  }

  private loadProjects(): Project[] {
    try {
      const stored = localStorage.getItem('projects');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error cargando proyectos:', error);
    }
    return this.getDefaultProjects();
  }

  private saveProjects(projects: Project[]): void {
    try {
      localStorage.setItem('projects', JSON.stringify(projects));
      this.projectsSubject.next(projects);
    } catch (error) {
      console.error('Error guardando proyectos:', error);
    }
  }

  getProjects(): Observable<Project[]> {
    return this.projects$;
  }

  getProjectById(id: number): Project | undefined {
    return this.projectsSubject.value.find(p => p.id === id);
  }

  addProject(project: Project): void {
    const projects = this.projectsSubject.value;
    const newProject = {
      ...project,
      id: Math.max(...projects.map(p => p.id), 0) + 1
    };
    this.saveProjects([...projects, newProject]);
  }
}
