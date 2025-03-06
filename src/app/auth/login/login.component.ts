import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ToolsService } from 'src/app/services/tools.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LangueService } from 'src/app/services/langue.service';

declare var Mmenu: any;
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {
  constructor(
    public _auth: AuthService,
    private _router: Router,
    private _alertService: AlertService,
    private _notificationService: NotificationService,
    private _toolsService: ToolsService,
    public _loaderService: LoaderService,
    public _langueService: LangueService
  ) {}

  type_input_password: any = 'password';
  flaticon: any = 'flaticon-play';
  isPasswordVisible: boolean = false;
  model_login: any[] = [
    // 0
    {
      id: 'id_login',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'login',
      afficher: true,
    },
    // 1
    {
      id: 'id_mdp',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'mot de passe',
      afficher: true,
    },
  ];
  retour_connexion: any = [];
  tab_liste_droit_de_loperateur: any = [];
  //--------------------------------------------------- fin declaration

  /*SeConnecter() {
    // this._loaderService._show();

    sessionStorage.setItem('isLoggedIn', 'true');
    window.location.href = '/admin';
  }*/

    SeConnecter() {
      this._loaderService._show();
  
      let lien_du_service = 'login';
  
      let body = {
        Objet: [
          {
           // TU_CODETYPEUTILISATEUR: '0001', // personnalisable • connexion d'un operateur
            OP_LOGIN: this.model_login[0]['valeur'],
            OP_MOTPASSE: this.model_login[1]['valeur']
           // CODECRYPTAGE: this._toolsService['code_criptage'],
          },
        ],
      };
  
      this._auth.AppelServeur(body, lien_du_service).subscribe((success: any) => {
        this.retour_connexion = success;
  
        this._loaderService._hide();
  
        if (this.retour_connexion['SL_RESULTAT'] == 'FALSE') {
          var message = this.retour_connexion['SL_MESSAGE'].split(':');
          this._alertService.WarningAlert('Information!', message[0].trim());
        } else if (this.retour_connexion[1]['OP_ACTIF'] == 'N') {
          this._alertService.WarningAlert(
            'Information!',
            "<strong style='color: red'>Opérateur désactivé</strong>. <br>Vous n'avez pas le droit de vous connecter"
          );
        } else if (this.retour_connexion[1]['OP_NOMBRECONNEXION'] == '0') {
          sessionStorage.setItem(
            'donnee_de_connexion',
            JSON.stringify(this.retour_connexion[1])
          );
  
          window.location.href = '/auth/changement_mdp';
        } else {
          this.retour_connexion = this.retour_connexion[1];
          sessionStorage.setItem(
            'donnee_de_connexion',
            JSON.stringify(this.retour_connexion)
          );
          sessionStorage.setItem('isLoggedIn', 'true');
          window.location.href = '/admin';
        }
      });
      (error: any) => {
        this._loaderService._hide();
        this._alertService.ErrorAlert(
          'Erreur!',
          this.retour_connexion['SL_MESSAGE']
        );
      };
    }
  

  AllerALaModificationDuMdp() {
    window.location.href = '/auth/modifier_mdp';
  }

  VoirCacherMdp() {
    this.isPasswordVisible = !this.isPasswordVisible;

    if (this.isPasswordVisible) this.type_input_password = 'text';
    else this.type_input_password = 'password';
  }

  ngAfterViewInit() {
    const menuElement = document.querySelector('#menu');
    if (menuElement) {
      new Mmenu(menuElement);
    }
  }
}
