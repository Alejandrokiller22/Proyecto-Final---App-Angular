import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StorageService } from '../../services/storage';
import { UserPreferences } from '../../models/user-preferences.model';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent implements OnInit {

  audioEnabled: boolean = false;
  private audio: HTMLAudioElement | null = null;
  userPreferences: UserPreferences;

  constructor(private storageService: StorageService) {
    this.userPreferences = this.storageService.loadUserPreferences();
    this.audioEnabled = this.userPreferences.audioEnabled;
  }

  ngOnInit(): void {
    this.initAudio();
  }

  private initAudio(): void {
    this.audio = new Audio('/fondo.mp3');
    this.audio.loop = true;

    if (this.audioEnabled) {
      this.playAudio();
    }

    // Escuchar evento de activación desde Home
    window.addEventListener('audioEnabled', () => {
      this.audioEnabled = true;
      this.playAudio();
    });
  }

  toggleAudio(): void {
    this.audioEnabled = !this.audioEnabled;

    if (this.audioEnabled) {
      this.playAudio();
    } else {
      this.pauseAudio();
    }

    this.userPreferences.audioEnabled = this.audioEnabled;
    this.storageService.saveUserPreferences(this.userPreferences);
  }

  private playAudio(): void {
    this.audio?.play().catch(error => {
      console.log('No se pudo reproducir el audio:', error);
    });
  }

  private pauseAudio(): void {
    this.audio?.pause();
  }
}
