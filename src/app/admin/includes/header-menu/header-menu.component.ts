import { Component, NgZone, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { LangueService } from 'src/app/services/langue.service';
import { ToolsService } from 'src/app/services/tools.service';
import { ThemeService } from 'src/app/services/theme.service';

declare var $: any;
@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {
  constructor(
    private _adminService: AdminService,
    private _router: Router,
    public _langueService: LangueService,
    public _toolsService: ToolsService,
    public renderer: Renderer2,
    public _themeService: ThemeService,
    private zone: NgZone
  ) {}

  session_de_connexion: any = JSON.parse(
    sessionStorage.getItem('donnee_de_connexion') || '{}'
  );
  tab_liste_selon_utilisateur: any = [];
  chemin_image: any = '';
  nom_utilisateur: any = '';
  tab_chemin_image: any = [];

  current_fr: any = '';
  current_en: any = '';
  mod_current_lang: any = '';
  isDarkTheme = false;
  currentTheme: any = 'light-theme';
  theme_enregistre: any = '';

  MenuRouter(module: any) {
    if (module == 'logout') {
      sessionStorage.clear();
      localStorage.clear();
      window.location.reload();
      // window.location.href = '/auth';
    }
  }

  ChoixDeLaLangue(la_lague: any) {
    this.current_fr = '';
    this.current_en = '';

    if (la_lague == 'fr') {
      this.current_fr = 'current';
      sessionStorage.setItem('langue_en_cours', 'current_fr');
    } else {
      this.current_en = 'current';
      sessionStorage.setItem('langue_en_cours', 'current_en');
    }

    this._langueService._changerLaLangue(la_lague);
  }

  ToggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    if (!this.isDarkTheme) this._adminService.theme_actuel = 'light';
    else this._adminService.theme_actuel = 'dark';
  }

  ConnaitreLeTheme() {
    // connaitre le thème sauvegardé lors du chargement de l'application
    this.theme_enregistre = this._themeService._avoirLeTheme();
    if (this.theme_enregistre == 'dark') this.isDarkTheme = true;
    else this.isDarkTheme = false;

    this.AppliquerLeTheme();
  }

  AppliquerLeTheme() {
    // appliquer le thème sauvegardé lors du chargement de l'application
    const theme = this._themeService._avoirLeTheme();
    if (theme == 'dark') {
      if (this._adminService.type_de_device == 'mobile') {
        $(`.header-inner`).css('background-color', '#0d1b2a');
        $(`.header-inner-wrap`).css('background-color', '#0d1b2a');
      } else {
        $(`.header-inner-wrap`).css('background-color', '#0d1b2a');
      }
      $(`.class_sub_langue`).css('background-color', '#0d1b2a');
      $(`#id_sub_langue_fr`).css('color', 'white');
      $(`#id_sub_langue_en`).css('color', 'white');
      $(`.class_langue`).css('color', 'white');
      $(`.toggle-button`).css('color', 'white');
      $(`#id_name_user`).css('color', 'white');
      // $(`.header-btn`).css('border', '1px solid white');
      $(`.tf-button-default`).css('color', 'white');
      $(`.tf-button-default`).css('border', '1px solid white');
    } else {
      $(`.toggle-button`).css('color', 'black');
      if (this._adminService.type_de_device == 'mobile') {
        $(`.header-inner`).css('background-color', 'white');
        $(`.header-inner-wrap`).css('background-color', 'white');
      } else {
        $(`.header-inner-wrap`).css('background-color', 'white');
      }
      $(`.class_sub_langue`).css('background-color', 'white');
      $(`#id_sub_langue_fr`).css('color', 'black');
      $(`#id_sub_langue_en`).css('color', 'black');
      $(`.class_langue`).css('color', 'black');
      $(`#id_name_user`).css('color', 'black');
      // $(`.header-btn`).css('border', '1px solid black');
      $(`.tf-button-default`).css('color', 'black');
      $(`.tf-button-default`).css('border', '1px solid black');
    }
  }

  AvatarUtilisateur() {
    // •••••••••••• traitement des images ••••••••••••

    let lien_du_service = 'List_documentcontratstype';

    let body = {
      Objet: [
        {
          CT_CODECONTRAT: '',
          CU_CODECOMPTEUTULISATEUR:
            this.session_de_connexion['CU_CODECOMPTEUTULISATEUR'],
          BI_CODEBIENS: '',
          TYPEOPERATION: '02', // pour les images selon lutilisateur
          CODECRYPTAGE: this._toolsService['code_criptage'],
        },
      ],
    };

    // this.nom_utilisateur = sessionStorage.getItem('test_nom');

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_liste_selon_utilisateur = success;

        if (this.tab_liste_selon_utilisateur[0]['SL_RESULTAT'] == 'TRUE') {
          this.tab_liste_selon_utilisateur =
            this.tab_liste_selon_utilisateur[1];

          // @ts-ignore
          /* this.tab_liste_selon_utilisateur.forEach((element2) => {
            if (
              element2['CU_CODECOMPTEUTULISATEUR'] ==
                this.session_de_connexion['CU_CODECOMPTEUTULISATEUR'] &&
              element2['TY_CODETYPEDOCUMENT'] == '0005'
            ) {
              this.chemin_image = `${this._adminService['lien_serveur_fichier']}${element2['DT_NOMRAPPORT']}`;
            }
          }); */

          for (
            let index = 0;
            index < this.tab_liste_selon_utilisateur.length;
            index++
          ) {
            if (
              this.tab_liste_selon_utilisateur[index][
                'CU_CODECOMPTEUTULISATEUR'
              ] == this.session_de_connexion['CU_CODECOMPTEUTULISATEUR'] &&
              this.tab_liste_selon_utilisateur[index]['TY_CODETYPEDOCUMENT'] ==
                '0005'
            ) {
              var chemin_image = `${this._adminService['lien_serveur_fichier']}${this.tab_liste_selon_utilisateur[index]['DT_NOMRAPPORT']}`;
              /*  this.tab_chemin_image = [];
              this.tab_chemin_image.push(chemin_image);
              console.log('maj_tab_chemin_image', this.tab_chemin_image); */

              this.zone.run(() => {
                this.tab_chemin_image = [];
                this.tab_chemin_image.push(chemin_image);
                console.log('maj_tab_chemin_image', this.tab_chemin_image);
              });

              // this.chemin_image = `${this._adminService['lien_serveur_fichier']}${this.tab_liste_selon_utilisateur[index]['DT_NOMRAPPORT']}`;
              // break;
            }
          }
        } else {
        }
      });
    (error: any) => {};

    // •••••••••••• traitement des images ••••••••••••
  }

  // •••••••••••• debut projet hopitale ••••••••••••
  AllerAuxParametres() {
    this._router.navigate(['/admin/parametres/creation_operateur']);
  }
  // •••••••••••• fin projet hopitale ••••••••••••

  ngOnInit(): void {
    // this.AvatarUtilisateur();
    this.session_de_connexion = JSON.parse(
      sessionStorage.getItem('donnee_de_connexion') || '{}'
    );

    this.ConnaitreLeTheme();

    // abonnement a levenement pour reagir lorsque la fonction est appelee
    this._themeService.triggerNgOnInit$.subscribe(() => {
      this.AppliquerLeTheme();
    });
  }
}
