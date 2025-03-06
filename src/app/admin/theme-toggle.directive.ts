import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  Input,
} from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Directive({
  selector: '[changerThemeApp]',
})
export class ThemeToggleDirective {
  @Input('changerThemeApp') currentTheme: 'light' | 'dark' = 'light';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private _themeService: ThemeService
  ) {
    // Appliquer le thème lors de l'initialisation
    const savedTheme = this._themeService._avoirLeTheme();
    this._themeService._appliquerLeTheme(savedTheme, false);
  }

  @HostListener('click') toggleTheme() {
    // Basculer le thème via le service
    this._themeService._toggleTheme();
  }
}
