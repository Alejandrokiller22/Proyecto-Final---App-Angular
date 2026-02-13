import { Injectable } from '@angular/core';
import { UserPreferences } from '../models/user-preferences.model';

/**
 * Servicio para gestionar el almacenamiento local
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`Error al guardar ${key}:`, error);
      throw new Error('No se pudo guardar la información');
    }
  }

  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error al leer ${key}:`, error);
      return null;
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error al eliminar ${key}:`, error);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error al limpiar localStorage:', error);
    }
  }

  saveUserPreferences(preferences: UserPreferences): void {
    preferences.save();
  }

  loadUserPreferences(): UserPreferences {
    return UserPreferences.load();
  }
}
