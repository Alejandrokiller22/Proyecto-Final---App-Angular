import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StorageService } from '../../services/storage';
import { UserPreferences } from '../../models/user-preferences.model';

declare var bootstrap: any;

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {

  skills: string[] = [
    'HTML5',
    'CSS3',
    'JavaScript',
    'TypeScript',
    'Bootstrap',
    'Angular',
    'Git',
    'Responsive Design'
  ];

  private userPreferences: UserPreferences;

  constructor(private storageService: StorageService) {
    this.userPreferences = this.storageService.loadUserPreferences();
  }

  ngOnInit(): void {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      this.showWelcomeModal();
      sessionStorage.setItem('hasVisited', 'true');
    }
  }

  private showWelcomeModal(): void {
    setTimeout(() => {
      const modalElement = document.getElementById('welcomeModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }, 500);
  }

  enableAudio(): void {
    this.userPreferences.audioEnabled = true;
    this.storageService.saveUserPreferences(this.userPreferences);
    window.dispatchEvent(new CustomEvent('audioEnabled'));
  }

  onImageError(event: any): void {
    event.target.src = '/logo.png';
  }
}
