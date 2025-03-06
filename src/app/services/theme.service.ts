import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private triggerNgOnInit = new Subject<void>();

  private themeKey = 'app-theme'; // clé pour sauvegarder le thème

  cards: any = [];
  mg_cards: any = [];
  titre_principal: any = [];
  titre_principal_info: any = [];
  form_recherche: any = [];
  form_recherche_2: any = [];
  form_recherche_input: any = [];
  form_recherche_btn: any = [];

  // couleur des cards principale
  _card_bg_color_light: any = 'white';
  _card_bg_color_dark: any = '#b1b1b1';

  // couleur du menu de gauche
  _mg_card_bg_color_light: any = '#1f4b43';
  _mg_card_bg_color_dark: any = '#50b5a3';

  // couleur des titre principaux
  _titre_pp_text_color_light: any = 'black';
  _titre_pp_text_color_dark: any = 'white';
  _titre_pp_info_text_color_light: any = 'chocolate';
  _titre_pp_info_text_color_dark: any = '#1f4b43';

  // couleur des form de recherche
  _form_recherche_bg_color_light: any = '#F9F9F9';
  _form_recherche_bg_color_dark: any = '#dedbd2';
  _form_input_recherche_bg_color_light: any = '#FFFFFF';
  _form_input_recherche_bg_color_dark: any = '#F9F9F9';
  _form_btn_recherche_bg_color_light: any = '#E7C873';
  _form_btn_recherche_bg_color_dark: any = '#22577a';
  _form_btn_recherche_text_color_light: any = '#1A1A1A';
  _form_btn_recherche_text_color_dark: any = 'white';

  _text_color_light: any = 'black';
  _text_color_dark: any = '#eb664e';

  constructor() {}

  // recuprrer le thrme sauvegarde (par défaut 'light' si aucun theme nest defini)
  _avoirLeTheme(): 'light' | 'dark' {
    return (localStorage.getItem(this.themeKey) as 'light' | 'dark') || 'light';
  }

  // appliquer le theme sauvegarde
  _appliquerLeTheme(theme: 'light' | 'dark', reaction: boolean) {
    this.cards = [];
    this.titre_principal = [];
    this.titre_principal_info = [];
    this.form_recherche = [];
    this.form_recherche_2 = [];
    this.form_recherche_input = [];
    this.form_recherche_btn = [];

    // couleur des cards principale
    this.cards = document.getElementsByClassName('mod-card-principal');

    // couleur des titre principaux
    this.titre_principal = document.getElementsByClassName('mod-titre-pp');
    this.titre_principal_info =
      document.getElementsByClassName('mod-titre-pp-info');

    // couleur des form de recherche
    this.form_recherche = document.getElementsByClassName('form-sidebar-left');
    this.form_recherche_2 = document.getElementsByClassName('form-search');
    this.form_recherche_input =
      document.getElementsByClassName('mod-search-input');
    this.form_recherche_btn =
      document.getElementsByClassName('mod-btn-recherche');

    // couleur du menu de gauche
    // this.mg_cards = document.getElementsByClassName('section-menu-left');

    if (theme === 'light') {
      // Appliquer le thème clair
      // couleur des cards principale
      for (let i = 0; i < this.cards.length; i++) {
        this.cards[i].style.backgroundColor = this._card_bg_color_light;
      }

      // couleur du menu de gauche
      for (let i = 0; i < this.mg_cards.length; i++) {
        this.mg_cards[i].style.backgroundColor = this._mg_card_bg_color_light;
      }

      // couleur des titre principaux
      for (let i = 0; i < this.titre_principal.length; i++) {
        this.titre_principal[i].style.color = this._titre_pp_text_color_light;
      }
      for (let i = 0; i < this.titre_principal_info.length; i++) {
        this.titre_principal_info[i].style.color =
          this._titre_pp_info_text_color_light;
      }

      // couleur des form de recherche
      for (let i = 0; i < this.form_recherche.length; i++) {
        this.form_recherche[i].style.backgroundColor =
          this._form_recherche_bg_color_light;
      }
      for (let i = 0; i < this.form_recherche_2.length; i++) {
        this.form_recherche_2[i].style.backgroundColor =
          this._form_recherche_bg_color_light;
      }
      for (let i = 0; i < this.form_recherche_input.length; i++) {
        this.form_recherche_input[i].style.backgroundColor =
          this._form_input_recherche_bg_color_light;
      }
      for (let i = 0; i < this.form_recherche_btn.length; i++) {
        this.form_recherche_btn[i].style.backgroundColor =
          this._form_btn_recherche_bg_color_light;
        this.form_recherche_btn[i].style.color =
          this._form_btn_recherche_text_color_light;
      }
    } else {
      // Appliquer le thème sombre
      // couleur des cards principale
      for (let i = 0; i < this.cards.length; i++) {
        this.cards[i].style.backgroundColor = this._card_bg_color_dark;
      }

      // couleur du menu de gauche
      for (let i = 0; i < this.mg_cards.length; i++) {
        this.mg_cards[i].style.backgroundColor = this._mg_card_bg_color_dark;
      }

      // couleur des titre principaux
      for (let i = 0; i < this.titre_principal.length; i++) {
        this.titre_principal[i].style.color = this._titre_pp_text_color_dark;
      }
      for (let i = 0; i < this.titre_principal_info.length; i++) {
        this.titre_principal_info[i].style.color =
          this._titre_pp_info_text_color_dark;
      }

      // couleur des form de recherche
      for (let i = 0; i < this.form_recherche.length; i++) {
        this.form_recherche[i].style.backgroundColor =
          this._form_recherche_bg_color_dark;
      }
      for (let i = 0; i < this.form_recherche_2.length; i++) {
        this.form_recherche_2[i].style.backgroundColor =
          this._form_recherche_bg_color_dark;
      }
      for (let i = 0; i < this.form_recherche_input.length; i++) {
        this.form_recherche_input[i].style.backgroundColor =
          this._form_input_recherche_bg_color_dark;
      }
      for (let i = 0; i < this.form_recherche_btn.length; i++) {
        this.form_recherche_btn[i].style.backgroundColor =
          this._form_btn_recherche_bg_color_dark;
        this.form_recherche_btn[i].style.color =
          this._form_btn_recherche_text_color_dark;
      }
    }

    // Déclencher le ngOnInit du composant cible
    if (reaction) {
      this._triggerInit();
    }
  }

  // sauvegarder le theme et lappliquer
  _donnerLeTheme(theme: 'light' | 'dark') {
    localStorage.setItem(this.themeKey, theme);
    this._appliquerLeTheme(theme, true);
  }

  // basculer le theme entre clair et sombre
  _toggleTheme() {
    const theme_actuel = this._avoirLeTheme();
    const nouveau_theme = theme_actuel === 'light' ? 'dark' : 'light';
    this._donnerLeTheme(nouveau_theme);
  }

  // Observable pour écouter les déclenchements
  triggerNgOnInit$ = this.triggerNgOnInit.asObservable();

  // Fonction pour déclencher l'événement
  _triggerInit(): void {
    this.triggerNgOnInit.next();
  }
}
