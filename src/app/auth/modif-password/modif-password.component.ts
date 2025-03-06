import { Component } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-modif-password',
  templateUrl: './modif-password.component.html',
  styleUrls: ['./modif-password.component.scss'],
})
export class ModifPasswordComponent {
  constructor(
    public _toolsService: ToolsService,
    public _adminService: AdminService,
    public _alertService: AlertService,
    public _loaderService: LoaderService
  ) {}

  model_modif_mdp: any[] = [
    // 0
    {
      id: 'idLogin',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'login',
      afficher: true,
    },
    // 1
    {
      id: 'idNumeroOuEmail',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: '',
      afficher: true,
    },
  ];
  tab_demande_mdp: any = [];
  toggle_faire_un_choix: boolean = false;
  libelle_du_champs: any = '';

  sidebar_title: any = 'Faites un choix';
  info_bule: any = `Faites un choix entre renseigner
                    <span>un numéro de téléphone</span> ou
                    <span>un email</span> <br />et vous recevrez votre mot de
                    passe, soit par <span>sms</span> ou soit par
                    <span>un mail</span>.`;
  choix: any = '';

  ChoixDuCanal(choix: any) {
    this.choix = choix;

    // vider les champs
    // @ts-ignore
    this.model_modif_mdp.forEach((element) => {
      element['valeur'] = '';
    });

    if (choix == 'sms') {
      this.info_bule = `Veuillez renseigner votre login actuel et <strong style="color: #24369e">un numéro de téléphone valide</strong>.<br>Par la suite <strong style="color: #24369e">consultez votre boite de messagerie</strong> après que vous ayez confirmé.`;
      this.sidebar_title = 'Envoi par sms';
      this.libelle_du_champs = 'Téléphone';
    } else {
      this.info_bule = `Veuillez renseigner votre login actuel et <strong style="color: #24369e">une adresse mail valide</strong>.<br>Par la suite <strong style="color: #24369e">consultez cette boite</strong> après que vous ayez confirmé.`;
      this.sidebar_title = 'Envoi par email';
      this.libelle_du_champs = 'Email';
    }
    this.toggle_faire_un_choix = true;
  }

  Retour() {
    this.toggle_faire_un_choix = false;
    this.sidebar_title = 'Faites un choix';
    this.info_bule = `Faites un choix entre renseigner
    <span>un numéro de téléphone</span> ou
    <span>un email</span> <br />et vous recevrez votre mot de
    passe, soit par <span>sms</span> ou soit par
    <span>un mail</span>.`;
  }

 /* DemanderLeMotDePasse(tableau_recu: any) {
    if (this.choix == 'sms')
      this.model_modif_mdp[1]['label'] = 'numéro de téléphone';
    else this.model_modif_mdp[1]['label'] = 'email';

    if (!this._toolsService._contrainteChampObligatoire(tableau_recu)) return;

    this._loaderService._show();

    alert('Opération effectuée avec succès');
    window.location.href = '/auth/login';
  }*/


  DemanderLeMotDePasse(tableau_recu: any) {
    if (this.choix == 'sms')
      this.model_modif_mdp[1]['label'] = 'numéro de téléphone';
    else this.model_modif_mdp[1]['label'] = 'email';

    if (!this._toolsService._contrainteChampObligatoire(tableau_recu)) return;

    this._loaderService._show();

    let lien_du_service = 'pvgUserDemandePassword';

    let body = {
      Objet: [
        {
          OP_TELEPHONE: tableau_recu[1]['valeur'],
          OP_LOGIN: tableau_recu[0]['valeur']
        },
      ],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_demande_mdp = success;

        this._loaderService._hide();

        if (this.tab_demande_mdp['SL_RESULTAT'] == 'FALSE') {
          this._alertService.WarningAlert(
            'Information!',
            this.tab_demande_mdp['SL_MESSAGE']
          );
        } else {
          this._alertService.SuccessAlert(
            'Succès!',
            this.tab_demande_mdp['SL_MESSAGE']
          );
          window.location.href = '/auth/login';
        }
      });
    (error: any) => {
      this._alertService.ErrorAlert(
        'Succès!',
        this.tab_demande_mdp['SL_MESSAGE']
      );
    };
  }
}
