import {
  AfterViewInit,
  Component,
  NgZone,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { LangueService } from 'src/app/services/langue.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ThemeService } from 'src/app/services/theme.service';
import { ToolsService } from 'src/app/services/tools.service';
import { HeaderMenuComponent } from '../../header-menu/header-menu.component';

declare var $: any;

@Component({
  selector: 'app-journee-de-travail',
  templateUrl: './journee-de-travail.component.html',
  styleUrls: ['./journee-de-travail.component.scss'],
})
export class JourneeDeTravailComponent implements OnInit, AfterViewInit {
  constructor(
    private _adminService: AdminService,
    private _router: Router,
    public _langueService: LangueService,
    public _toolsService: ToolsService,
    public renderer: Renderer2,
    public _themeService: ThemeService,
    private zone: NgZone,
    public _loaderService: LoaderService,
    public _alertService: AlertService,
    public _header_menu: HeaderMenuComponent
  ) {}

  methode: any = '';
  vlpDuree: any;
  vlpDerniereDateJournee: any;
  session_de_connexion: any = JSON.parse(
    sessionStorage.getItem('donnee_de_connexion') || '{}'
  );
  tab_enregistrement: any = [];
  tab_liste_journee_ouverte: any = [];
  tab_liste_toutes_journees: any = [];
  tab_valider_journee_fermee: any = [];
  tab_journee_max: any = [];
  tab_cloture_journee: any = [];
  tab_date_existante: any = [];
  tab_date_systeme: any = [];
  journee_a_fermer: any;

  model_jt: any[] = [
    // 0
    {
      id: 'idDateCrea',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date',
      afficher: true,
      readOnly: true,
    },
    // 1
    {
      id: 'idDateChang',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date',
      afficher: true,
      readOnly: true,
    },
  ];

  TestContrainteChangement(tableau_recu: any, table_index: any) {
    // @ts-ignore
    tableau_recu.forEach((element) => {
      element['obligatoire'] = 'N';
    });

    // @ts-ignore
    table_index.forEach((element) => {
      tableau_recu[element]['obligatoire'] = 'O';
    });

    // verifier les champs obligatoires et les types de donnees
    if (!this._toolsService._contrainteChampObligatoire(tableau_recu)) return;
    if (
      !this._toolsService._contrainteTypeDeDonneeChampNonObligatoire(
        tableau_recu
      )
    )
      return;

    this._loaderService._show();
    if (
      tableau_recu[1]['valeur'].substr(6, 4) !=
      this.session_de_connexion['EX_EXERCICE']
    ) {
      this._loaderService._hide();
      this._alertService.WarningAlert(
        'Information!',
        `La date saisie doit se trouver dans l'exercice en cours.`
      );
      return;
    }
    this.TestJourneeExistanteChangement(tableau_recu);
  }

  TestContrainte(tableau_recu: any, table_index: any) {
    // @ts-ignore
    tableau_recu.forEach((element) => {
      element['obligatoire'] = 'N';
    });

    // @ts-ignore
    table_index.forEach((element) => {
      tableau_recu[element]['obligatoire'] = 'O';
    });

    // verifier les champs obligatoires et les types de donnees
    if (!this._toolsService._contrainteChampObligatoire(tableau_recu)) return;
    if (
      !this._toolsService._contrainteTypeDeDonneeChampNonObligatoire(
        tableau_recu
      )
    )
      return;

    this._loaderService._show();
    if (
      tableau_recu[0]['valeur'].substr(6, 4) !=
      this.session_de_connexion['EX_EXERCICE']
    ) {
      this._loaderService._hide();
      this._alertService.WarningAlert(
        'Information!',
        `La date saisie doit se trouver dans l'exercice en cours.`
      );
      return;
    }

    this.TestComparaisonDeuxDatesOuEgalite(tableau_recu);
  }

  TestComparaisonDeuxDatesOuEgalite(tableau_recu: any) {
    let lien_du_service = 'valeur_scalaire_requete_max_journee';

    let body = {
      Objet: [
        {
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          JT_DATEJOURNEETRAVAIL: '',
          JT_STATUT: '',
        },
      ],
    };

    this._adminService.AppelServeur(body, lien_du_service).subscribe(
      (success) => {
        this.tab_journee_max = success;

        if (this.tab_journee_max['SL_RESULTAT'] == 'FALSE') {
          this._loaderService._hide();
          this.tab_journee_max = [];
          this._alertService.WarningAlert(
            'Information!',
            this.tab_journee_max['SL_MESSAGE']
          );
        } else {
          this.tab_journee_max = this.tab_journee_max[1];

          // comparer deux dates
          const date1 = this._toolsService._convertirUneDate(
            this.tab_journee_max[0]['JT_DATEJOURNEETRAVAIL']
          );
          const date2 = this._toolsService._convertirUneDate(
            tableau_recu[0]['valeur']
          );
          const resultatComparaison = this._toolsService._comparerDeuxDates(
            date1,
            date2
          );

          if (resultatComparaison === 'date1Supdate2') {
            this._loaderService._hide();
            this._alertService.WarningAlert(
              'Information!',
              `La date saisie ne doit pas être inférieure à la dernière date de la journée de travail.`
            );
            return;
          }

          this.TestClotureJournee('O', tableau_recu);
        }
      },
      (error: any) => {}
    );
  }

  TestClotureJournee(statut: any, tableau_recu: any) {
    let lien_du_service = 'valeur_scalaire_requete_count_journee';

    let body = {
      Objet: [
        {
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          JT_DATEJOURNEETRAVAIL: '',
          JT_STATUT: statut,
        },
      ],
    };

    this._adminService.AppelServeur(body, lien_du_service).subscribe(
      (success) => {
        this.tab_cloture_journee = success;

        if (this.tab_cloture_journee[0]['SL_RESULTAT'] == 'FALSE') {
          this._loaderService._hide();
          this.tab_cloture_journee = [];
          this._alertService.WarningAlert(
            'Information!',
            this.tab_cloture_journee['SL_MESSAGE']
          );
        } else {
          if (this.tab_cloture_journee[1].JT_COUNT != '0') {
            this._loaderService._hide();
            this._alertService.WarningAlert(
              'Information!',
              `Il faut d'abords clôturer la dernière journée ouverte.`
            );
            return;
          }

          this.TestJourneeExistante(tableau_recu);
        }
      },
      (error: any) => {}
    );
  }

  TestJourneeExistante(tableau_recu: any) {
    let lien_du_service = 'valeur_scalaire_requete_count_journee';

    let body = {
      Objet: [
        {
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          JT_DATEJOURNEETRAVAIL: tableau_recu[0]['valeur'],
          JT_STATUT: '',
        },
      ],
    };

    this._adminService.AppelServeur(body, lien_du_service).subscribe(
      (success) => {
        this.tab_date_existante = success;

        if (this.tab_date_existante[0]['SL_RESULTAT'] == 'FALSE') {
          this._loaderService._hide();
          this.tab_date_existante = [];
          this._alertService.WarningAlert(
            'Information!',
            this.tab_date_existante['SL_MESSAGE']
          );
        } else {
          if (this.tab_date_existante[1].JT_COUNT != '0') {
            this._loaderService._hide();
            this._alertService.WarningAlert(
              'Information!',
              `Cette journée a déjà été créée.`
            );
            return;
          }

          this.TestDateSysteme(tableau_recu);
        }
      },
      (error: any) => {}
    );
  }

  TestJourneeExistanteChangement(tableau_recu: any) {
    let lien_du_service = 'valeur_scalaire_requete_count_journee';

    let body = {
      Objet: [
        {
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          JT_DATEJOURNEETRAVAIL: tableau_recu[1]['valeur'],
          JT_STATUT: '',
        },
      ],
    };

    this._adminService.AppelServeur(body, lien_du_service).subscribe(
      (success) => {
        this.tab_date_existante = success;

        if (this.tab_date_existante[0]['SL_RESULTAT'] == 'FALSE') {
          this._loaderService._hide();
          this.tab_date_existante = [];
          this._alertService.WarningAlert(
            'Information!',
            this.tab_date_existante['SL_MESSAGE']
          );
        } else {
          if (this.tab_date_existante[1].JT_COUNT == '0') {
            this._loaderService._hide();
            this._alertService.WarningAlert(
              'Information!',
              `La date saisie n'a pas encore été créée. <br> Elle doit d'abord être crée avant son utilisation.`
            );
            return;
          }

          this.TestSuperieurJourneeTravail(tableau_recu);
        }
      },
      (error: any) => {}
    );
  }

  TestSuperieurJourneeTravail(tableau_recu: any) {
    let lien_du_service = 'valeur_scalaire_requete_max_journee';

    let body = {
      Objet: [
        {
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          JT_DATEJOURNEETRAVAIL: '',
          JT_STATUT: '',
        },
      ],
    };

    this._adminService.AppelServeur(body, lien_du_service).subscribe(
      (success) => {
        this.tab_journee_max = success;

        if (this.tab_journee_max['SL_RESULTAT'] == 'FALSE') {
          this._loaderService._hide();
          this.tab_journee_max = [];
          this._alertService.WarningAlert(
            'Information!',
            this.tab_journee_max['SL_MESSAGE']
          );
        } else {
          this.tab_journee_max = this.tab_journee_max[1];

          // comparer deux dates
          const date1 = this._toolsService._convertirUneDate(
            this.tab_journee_max[0]['JT_DATEJOURNEETRAVAIL']
          );
          const date2 = this._toolsService._convertirUneDate(
            tableau_recu[1]['valeur']
          );
          const resultatComparaison = this._toolsService._comparerDeuxDates(
            date1,
            date2
          );

          if (resultatComparaison === 'date1Infdate2') {
            this._loaderService._hide();
            this._alertService.WarningAlert(
              'Information!',
              `La date saisie ne doit pas être supérieure à la dernière date de la journée de travail.`
            );
            return;
          }

          this.TestJourneeExistante2(tableau_recu);
        }
      },
      (error: any) => {}
    );
  }

  TestJourneeExistante2(tableau_recu: any) {
    let lien_du_service = 'valeur_scalaire_requete_count_journee';

    let body = {
      Objet: [
        {
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          JT_DATEJOURNEETRAVAIL: tableau_recu[1]['valeur'],
          JT_STATUT: '',
        },
      ],
    };

    this._adminService.AppelServeur(body, lien_du_service).subscribe(
      (success) => {
        this.tab_date_existante = success;

        if (this.tab_date_existante[0]['SL_RESULTAT'] == 'FALSE') {
          this._loaderService._hide();
          this.tab_date_existante = [];
          this._alertService.WarningAlert(
            'Information!',
            this.tab_date_existante['SL_MESSAGE']
          );
        } else {
          if (this.tab_date_existante[1].JT_COUNT == '0') {
            this._loaderService._hide();
            this._alertService.WarningAlert(
              'Information!',
              `La date saisie n'a pas encore été créée. <br>Elle doit d'abords être
              créée avant son utilisation.`
            );
            return;
          }

          this.EnregistrerChangement(tableau_recu);
        }
      },
      (error: any) => {}
    );
  }

  EnregistrerChangement(tableau_recu: any) {
    this.session_de_connexion['JT_DATEJOURNEETRAVAIL'] =
      tableau_recu[1]['valeur'];
    sessionStorage.setItem(
      'donnee_de_connexion',
      JSON.stringify(this.session_de_connexion)
    );

    // this._header_menu.ngOnInit();
    window.location.reload();

    this.Initialisation('EnregistrerChangement');
  }

  TestDateSysteme(tableau_recu: any) {
    let lien_du_service = 'date_systeme_serveur';

    let body = {
      Objet: [{}],
    };

    this._adminService.AppelServeur(body, lien_du_service).subscribe(
      (success) => {
        this.tab_date_systeme = success;

        this._loaderService._hide();
        if (this.tab_date_systeme[0]['SL_RESULTAT'] == 'FALSE') {
          this.tab_date_systeme = [];
          this._alertService.WarningAlert(
            'Information!',
            this.tab_date_systeme['SL_MESSAGE']
          );
        } else {
          this.tab_date_systeme = this.tab_date_systeme[1];
          // comparer deux dates
          const date1 = this._toolsService._convertirUneDate(
            this.tab_date_systeme[0]['DATESYSTEMSERVEUR']
          );
          const date2 = this._toolsService._convertirUneDate(
            tableau_recu[0]['valeur']
          );
          const resultatComparaison = this._toolsService._comparerDeuxDates(
            date1,
            date2
          );

          let diff_de_jour = this._toolsService._pvgDateDiff(date1, date2, 'J');

          if (resultatComparaison === 'date1Infdate2' && diff_de_jour > 1) {
            this._alertService.WarningAlert(
              'Information!',
              `La date saisie ne doit pas être supérieure à la date système.`
            );
            return;
          }

          $('#warning-alert-modal-1').modal('show');
        }
      },
      (error: any) => {}
    );
  }

  ConfirmationDeCreationDeLaJournee(journee_saisie: any) {
    $('#warning-alert-modal-1').modal('hide');

    let _vlpDerniereDateJournee = `${
      this.vlpDerniereDateJournee.split('/')[1]
    }/${this.vlpDerniereDateJournee.split('/')[0]}/${
      this.vlpDerniereDateJournee.split('/')[2]
    }`;
    let _journee_saisie = `${journee_saisie.split('/')[1]}/${
      journee_saisie.split('/')[0]
    }/${journee_saisie.split('/')[2]}`;
    this.vlpDuree = this._toolsService._pvgDateDiff(
      _vlpDerniereDateJournee,
      _journee_saisie,
      'J'
    );

    if (this.vlpDuree > 7) {
      $('#warning-alert-modal-2').modal('show');
    } else {
      this.EnregistrerCreationJourneeTravail(journee_saisie);
    }
  }

  ConfirmationDoubleDeCreationDeLaJournee(journee_saisie: any) {
    $('#warning-alert-modal-2').modal('hide');

    this.EnregistrerCreationJourneeTravail(journee_saisie);
  }

  EnregistrerCreationJourneeTravail(journee_saisie: any) {
    this._loaderService._show();

    let lien_du_service = 'ajouter_journee_travail';

    let body = {
      Objet: [
        {
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          JT_DATEJOURNEETRAVAIL: journee_saisie,
          OP_CODEOPERATEUR: this.session_de_connexion['OP_CODEOPERATEUR'],
          JT_STATUT: 'O',
        },
      ],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_enregistrement = success;

        if (this.tab_enregistrement['SL_RESULTAT'] == 'FALSE') {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.tab_enregistrement['SL_MESSAGE']
          );
        } else {
          this.tab_enregistrement = this.tab_enregistrement[1];

          console.log('tab_enregistrement', this.tab_enregistrement);
        }

        this.Initialisation('EnregistrerCreationJourneeTravail');
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_enregistrement['SL_MESSAGE']
      );
    };
  }

  Initialisation(method: any) {
    if (method == 'ngOnInit') {
      this._loaderService._show();
    }

    if (method == 'EnregistrerCreationJourneeTravail') {
      this.methode = 'EnregistrerCreationJourneeTravail';
      this.session_de_connexion['JT_DATEJOURNEETRAVAIL'] =
        this.model_jt[0]['valeur'];

      this.session_de_connexion['EX_EXERCICE'] = this.model_jt[0][
        'valeur'
      ].substr(6, 4);
      sessionStorage.setItem(
        'donnee_de_connexion',
        JSON.stringify(this.session_de_connexion)
      );

      // this._header_menu.ngOnInit();
      this.ChargerListeJourneeOuverte();
    }

    this.model_jt.forEach((element, index) => {
      if (index != 2) element['valeur'] = '';
      else if (index == 2) element['valeur'] = '225';
    });

    this._loaderService._hide();
  }

  AnnulerAction() {
    this.Initialisation('AnnulerAction');
  }

  ChargerListeJourneeOuverte() {
    // this._loaderService._show();

    let lien_du_service = 'liste_journee_de_travail';

    let body = {
      Objet: [
        {
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          JT_DATEJOURNEETRAVAIL: '',
          JT_STATUT: 'O',
        },
      ],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_liste_journee_ouverte = success;

        if (this.tab_liste_journee_ouverte['SL_RESULTAT'] == 'FALSE') {
          this._loaderService._hide();
          let table: any[] = [];
          table.push(this.tab_liste_journee_ouverte);
          this.tab_liste_journee_ouverte = table;
        } else {
          this.tab_liste_journee_ouverte = this.tab_liste_journee_ouverte[1];

          console.log(
            'tab_liste_journee_ouverte',
            this.tab_liste_journee_ouverte
          );
        }

        if (this.methode) this.ChargerListeToutesLesJournees2();
        else this.ChargerListeToutesLesJournees();
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_liste_journee_ouverte['SL_MESSAGE']
      );
    };
  }

  ChargerListeToutesLesJournees() {
    let lien_du_service = 'liste_journee_de_travail';

    let body = {
      Objet: [
        {
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          JT_DATEJOURNEETRAVAIL: '',
          JT_STATUT: '',
        },
      ],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_liste_toutes_journees = success;

        this._loaderService._hide();
        if (this.tab_liste_toutes_journees['SL_RESULTAT'] == 'FALSE') {
          this._alertService.WarningAlert(
            'Information!',
            this.tab_liste_toutes_journees['SL_MESSAGE']
          );
        } else {
          this.tab_liste_toutes_journees = this.tab_liste_toutes_journees[1];
          // this.tab_liste_toutes_journees.reverse();
          this.vlpDerniereDateJournee =
            this.session_de_connexion.JT_DATEJOURNEETRAVAIL;

          console.log(
            'tab_liste_toutes_journees',
            this.tab_liste_toutes_journees
          );
        }
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_liste_toutes_journees['SL_MESSAGE']
      );
    };
  }

  ChargerListeToutesLesJournees2() {
    let lien_du_service = 'liste_journee_de_travail';

    let body = {
      Objet: [
        {
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          JT_DATEJOURNEETRAVAIL: '',
          JT_STATUT: '',
        },
      ],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_liste_toutes_journees = success;

        this._loaderService._hide();
        if (this.tab_liste_toutes_journees['SL_RESULTAT'] == 'FALSE') {
          this._alertService.WarningAlert(
            'Information!',
            this.tab_liste_toutes_journees['SL_MESSAGE']
          );
        } else {
          this.tab_liste_toutes_journees = this.tab_liste_toutes_journees[1];
          this.tab_liste_toutes_journees.reverse();
          this.vlpDerniereDateJournee =
            this.session_de_connexion.JT_DATEJOURNEETRAVAIL;

          console.log(
            'tab_liste_toutes_journees',
            this.tab_liste_toutes_journees
          );
          this.methode = '';
          window.location.reload();
        }
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_liste_toutes_journees['SL_MESSAGE']
      );
    };
  }

  SelectionDeLaJourneeAFermer(journee_a_fermer: any) {
    this.journee_a_fermer = journee_a_fermer;
    $('#danger-alert-modal').modal('show');
  }

  ValiderLaFermetureDeLaJournee() {
    let lien_du_service = 'update_journee_travail';

    let body = {
      Objet: [
        {
          AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
          JT_DATEJOURNEETRAVAIL: this.journee_a_fermer,
          JT_STATUT: 'F',
        },
      ],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_valider_journee_fermee = success;

        this._loaderService._hide();
        if (this.tab_valider_journee_fermee['SL_RESULTAT'] == 'FALSE') {
          this._alertService.WarningAlert(
            'Information!',
            this.tab_valider_journee_fermee['SL_MESSAGE']
          );
        } else {
          $('#danger-alert-modal').modal('hide');

          this._alertService.SuccessAlert(
            'Succès!',
            this.tab_valider_journee_fermee['SL_MESSAGE']
          );

          this.ChargerListeJourneeOuverte();
        }
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_valider_journee_fermee['SL_MESSAGE']
      );
    };
  }

  ngOnInit(): void {
    this.Initialisation('ngOnInit');
    this.ChargerListeJourneeOuverte();
  }

  ngAfterViewInit() {}
}
