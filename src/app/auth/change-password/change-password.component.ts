import { Component } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToolsService } from 'src/app/services/tools.service';

declare var $: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  constructor(
    public _toolsService: ToolsService,
    public _adminService: AdminService,
    public _alertService: AlertService,
    public _loaderService: LoaderService
  ) {}

  tab_modif_acces: any = [];
  session_de_connexion: any = JSON.parse(
    sessionStorage.getItem('donnee_de_connexion') || '{}'
  );
  model_nouveau_acces: any[] = [
    // 0
    {
      id: 'idAncienLogin',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'ancien login',
      afficher: true,
    },
    // 1
    {
      id: 'idAncienMdp',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'ancien mot de passe',
      afficher: true,
    },
    // 2
    {
      id: 'idNouveauLogin',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'nouveau login',
      afficher: true,
    },
    // 3
    {
      id: 'idNouveauMdp',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'nouveau mot de passe',
      afficher: true,
    },
    // 4
    {
      id: 'idConfirmMdp',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'confirmer le mot de passe',
      afficher: true,
    },
  ];
  flaticon1: any = 'flaticon-play';
  flaticon2: any = 'flaticon-play';
  flaticon3: any = 'flaticon-play';
  isPasswordVisible1: boolean = false;
  isPasswordVisible2: boolean = false;
  isPasswordVisible3: boolean = false;


  info_bule: any = ` Definissez de <span>nouveaux accès</span> qui vous sont
                    propre pour <span>une connexion plus securisé</span>.`;



  TogglePasswordVisibility1() {
    this.isPasswordVisible1 = !this.isPasswordVisible1;
    if (this.isPasswordVisible1) this.flaticon1 = 'flaticon-key';
    else this.flaticon1 = 'flaticon-play';
  }
  TogglePasswordVisibility2() {
    this.isPasswordVisible2 = !this.isPasswordVisible2;
    if (this.isPasswordVisible2) this.flaticon2 = 'flaticon-key';
    else this.flaticon2 = 'flaticon-play';
  }
  TogglePasswordVisibility3() {
    this.isPasswordVisible3 = !this.isPasswordVisible3;
    if (this.isPasswordVisible3) this.flaticon3 = 'flaticon-key';
    else this.flaticon3 = 'flaticon-play';
  }

  ChangerDAcces(tableau_recu: any) {
    if (!this._toolsService._contrainteChampObligatoire(tableau_recu)) return;

    this._loaderService._show();

    // remettre les champs en blanc
    $(`#${tableau_recu[3]['id']}`).css('background-color', 'white');
    $(`#${tableau_recu[4]['id']}`).css('background-color', 'white');

    // dans le cas où les mdp ne coincident pas
    if (tableau_recu[3]['valeur'] !== tableau_recu[4]['valeur']) {
      this._alertService.ErrorAlert(
        'Succès!',
        `Les mots de passe doivent être identique`
      );

      $(`#${tableau_recu[3]['id']}`).css('background-color', 'MistyRose');
      $(`#${tableau_recu[4]['id']}`).css('background-color', 'MistyRose');

      this._loaderService._hide();

      return;
    }

    let lien_du_service = 'pvgUserChangePasswordfist';

    let body = {
      Objet: [
        {
          "PO_CODEPROFIL": this.session_de_connexion['PO_CODEPROFIL'],
          "OP_MOTPASSEOLD": tableau_recu[1]['valeur'],
          "OP_LOGINOLD": tableau_recu[0]['valeur'],
          "OP_MOTPASSENEW":  tableau_recu[3]['valeur'],
          "OP_LOGINNEW": tableau_recu[2]['valeur']
        },
      ],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_modif_acces = success;

        this._loaderService._hide();

        if (this.tab_modif_acces['SL_RESULTAT'] == 'FALSE') {
          this._alertService.WarningAlert(
            'Information!',
            this.tab_modif_acces['SL_MESSAGE']
          );
        } else {
          this._alertService.SuccessAlert(
            'Succès!',
            this.tab_modif_acces['SL_MESSAGE']
          );
          window.location.href = '/auth/login';
        }
      });
    (error: any) => {
      this._alertService.ErrorAlert(
        'Succès!',
        this.tab_modif_acces['SL_MESSAGE']
      );
    };
  }
}
