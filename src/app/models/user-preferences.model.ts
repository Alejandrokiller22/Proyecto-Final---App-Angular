/**
 * Enumeración para temas visuales
 */
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto'
}

/**
 * Clase para gestionar las preferencias del usuario
 */
export class UserPreferences {
  theme: Theme;
  audioEnabled: boolean;
  language: string;

  constructor(
    theme: Theme = Theme.LIGHT,
    audioEnabled: boolean = false,
    language: string = 'es'
  ) {
    this.theme = theme;
    this.audioEnabled = audioEnabled;
    this.language = language;
  }

  /**
   * Guarda las preferencias en localStorage
   */
  save(): void {
    try {
      const data = JSON.stringify({
        theme: this.theme,
        audioEnabled: this.audioEnabled,
        language: this.language
      });
      localStorage.setItem('userPreferences', data);
    } catch (error) {
      console.error('Error al guardar preferencias:', error);
    }
  }

  /**
   * Carga las preferencias desde localStorage
   */
  static load(): UserPreferences {
    try {
      const data = localStorage.getItem('userPreferences');
      if (data) {
        const parsed = JSON.parse(data);
        return new UserPreferences(
          parsed.theme || Theme.LIGHT,
          parsed.audioEnabled || false,
          parsed.language || 'es'
        );
      }
    } catch (error) {
      console.error('Error al cargar preferencias:', error);
    }
    return new UserPreferences();
  }
}
