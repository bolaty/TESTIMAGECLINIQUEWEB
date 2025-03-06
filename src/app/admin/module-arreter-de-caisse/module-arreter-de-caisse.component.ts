import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ThemeService } from 'src/app/services/theme.service';
import { ToolsService } from 'src/app/services/tools.service';
import { AdminService } from '../admin.service';
import { HeaderMenuComponent } from '../includes/header-menu/header-menu.component';
import { SidebarComponent } from '../includes/sidebar/sidebar.component';

@Component({
  selector: 'app-module-arreter-de-caisse',
  templateUrl: './module-arreter-de-caisse.component.html',
  styleUrls: ['./module-arreter-de-caisse.component.scss'],
})
export class ModuleArreterDeCaisseComponent implements OnInit, AfterViewInit {
  constructor(
    public _adminService: AdminService,
    private _router: Router,
    private _alertService: AlertService,
    private _notificationService: NotificationService,
    public _toolsService: ToolsService,
    public _loaderService: LoaderService,
    private _themeService: ThemeService,
    private _headerMenuComponent: HeaderMenuComponent,
    private _sidebarComponent: SidebarComponent
  ) {}

  bool_tableau_recu_5: boolean = false;
  bool_tableau_recu_6: boolean = false;
  bool_tableau_recu_7: boolean = false;
  bool_tableau_recu_8: boolean = false;
  bool_total_montant: boolean = false;
  total_montant: any = 0;
  objet_modif_dans_liste: any = {};
  formulaire_modif_dans_liste: any[] = [];
  model_arreter_caisse: any[] = [
    // 0
    {
      id: 'idVersementEspece',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'versement espèce par',
      afficher: true,
      readOnly: true,
    },
    // 1
    {
      id: 'idBordereauNum',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'bordereau n°',
      afficher: true,
      readOnly: true,
    },
    // 2
    {
      id: 'idNomFacturier',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'nom du facturier',
      afficher: true,
      readOnly: true,
    },
    // 3
    {
      id: 'idDate',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date',
      afficher: true,
      readOnly: true,
    },
    // 4
    {
      id: 'idNumRecuRembourse',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'n° reçus remboursés',
      afficher: true,
      readOnly: true,
    },
    // 5
    {
      id: 'idDepotWave',
      type: 'montant',
      valeur: '',
      obligatoire: 'N',
      label: 'dépot Wave',
      afficher: true,
      readOnly: true,
    },
    // 6
    {
      id: 'idDepotOrange',
      type: 'montant',
      valeur: '',
      obligatoire: 'N',
      label: 'dépot Orange',
      afficher: true,
      readOnly: true,
    },
    // 7
    {
      id: 'idDepotMtn',
      type: 'montant',
      valeur: '',
      obligatoire: 'N',
      label: 'dépot MTN',
      afficher: true,
      readOnly: true,
    },
    // 8
    {
      id: 'idDepotMoov',
      type: 'montant',
      valeur: '',
      obligatoire: 'N',
      label: 'dépot Moov',
      afficher: true,
      readOnly: true,
    },
    // 9
    {
      id: 'idDepotCheque',
      type: 'montant',
      valeur: '',
      obligatoire: 'N',
      label: 'chèque',
      afficher: true,
      readOnly: true,
    },
    // 10
    {
      id: 'idDepotVirement',
      type: 'montant',
      valeur: '',
      obligatoire: 'N',
      label: 'virement',
      afficher: true,
      readOnly: true,
    },
    // 11
    {
      id: 'idDepotCharge',
      type: 'montant',
      valeur: '',
      obligatoire: 'N',
      label: 'charge',
      afficher: true,
      readOnly: true,
    },
  ];

  ValiderArreterDeCaisse(tableau_recu: any, table_index: any) {
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

    if (
      this.total_montant.toString().replaceAll(' ', '') != '100000' &&
      !this.bool_total_montant
    ) {
      // tester le montant du billetage et la caisse espece
      this._alertService.ConfirmationArreteDeCaisse(
        'Attention!',
        `Il y'a un ecart entre le montant du <strong>billetage</strong> et le montant à la caisse <strong>espèce</strong>.<br> <strong>Voulez-vous continuer</strong> ?`,
        () => this.SuiteDesTests('espece', true)
      );
    } else if (
      tableau_recu[5]['valeur'].replaceAll(' ', '') != '100000' &&
      !this.bool_tableau_recu_5
    ) {
      // tester le montant de wave et la caisse wave
      this._alertService.ConfirmationArreteDeCaisse(
        'Attention!',
        `Il y'a un ecart entre le montant <strong>wave</strong> et le montant à la caisse <strong>wave</strong>.<br> <strong>Voulez-vous continuer</strong> ?`,
        () => this.SuiteDesTests('wave', true)
      );
    } else if (
      tableau_recu[6]['valeur'].replaceAll(' ', '') != '100000' &&
      !this.bool_tableau_recu_6
    ) {
      // tester le montant de orange et la caisse orange
      this._alertService.ConfirmationArreteDeCaisse(
        'Attention!',
        `Il y'a un ecart entre le montant <strong>orange</strong> et le montant à la caisse <strong>orange</strong>.<br> <strong>Voulez-vous continuer</strong> ?`,
        () => this.SuiteDesTests('orange', true)
      );
    } else if (
      tableau_recu[7]['valeur'].replaceAll(' ', '') != '100000' &&
      !this.bool_tableau_recu_7
    ) {
      // tester le montant de mtn et la caisse mtn
      this._alertService.ConfirmationArreteDeCaisse(
        'Attention!',
        `Il y'a un ecart entre le montant <strong>mtn</strong> et le montant à la caisse <strong>mtn</strong>.<br> <strong>Voulez-vous continuer</strong> ?`,
        () => this.SuiteDesTests('mtn', true)
      );
    } else if (
      tableau_recu[8]['valeur'].replaceAll(' ', '') != '100000' &&
      !this.bool_tableau_recu_8
    ) {
      // tester le montant de moov et la caisse moov
      this._alertService.ConfirmationArreteDeCaisse(
        'Attention!',
        `Il y'a un ecart entre le montant <strong>moov</strong> et le montant à la caisse <strong>moov</strong>.<br> <strong>Voulez-vous continuer</strong> ?`,
        () => this.SuiteDesTests('moov', true)
      );
    } else {
      this.TerminerArreterDeCaisse();
    }
  }

  SuiteDesTests(caisse: string, valeur_bool: boolean) {
    switch (caisse) {
      case 'espece':
        this.bool_total_montant = valeur_bool;
        break;
      case 'wave':
        this.bool_tableau_recu_5 = valeur_bool;
        break;
      case 'orange':
        this.bool_tableau_recu_6 = valeur_bool;
        break;
      case 'mtn':
        this.bool_tableau_recu_7 = valeur_bool;
        break;
      case 'moov':
        this.bool_tableau_recu_8 = valeur_bool;
        break;
    }

    this.ValiderArreterDeCaisse(this.model_arreter_caisse, [0, 1, 2, 3]);
  }

  TerminerArreterDeCaisse() {
    this._loaderService._show();
    alert('enregistré avec succès');

    // initialisation
    this.Initialisation('TerminerArreterDeCaisse');
  }

  Initialisation(method: any) {
    if (method == 'ngOnInit') {
      this._loaderService._show();
    }

    this.model_arreter_caisse.forEach((element, index) => {
      element['valeur'] = '';
    });

    this.formulaire_modif_dans_liste.forEach((element) => {
      element['colonne_du_tableau'][0]['valeur'] = '';
      element['colonne_du_tableau'][1]['total_selon_nombre'] = 0;
    });
    this.total_montant = 0;
    this._loaderService._hide();
  }

  AnnulerAction() {
    this.Initialisation('AnnulerAction');
  }

  CalculDeLaSommeEnFonctionDuNombre(index_champ: any, ligne_montant: any) {
    switch (ligne_montant) {
      case 'nameCol0':
        this.formulaire_modif_dans_liste[index_champ]['colonne_du_tableau'][1][
          'total_selon_nombre'
        ] = this.formulaire_modif_dans_liste[index_champ][
          'colonne_du_tableau'
        ][2]['total_selon_nombre_nf'] =
          this.formulaire_modif_dans_liste[index_champ][
            'colonne_du_tableau'
          ][0]['valeur'] * 10000;
        break;
      case 'nameCol1':
        this.formulaire_modif_dans_liste[index_champ]['colonne_du_tableau'][1][
          'total_selon_nombre'
        ] = this.formulaire_modif_dans_liste[index_champ][
          'colonne_du_tableau'
        ][2]['total_selon_nombre_nf'] =
          this.formulaire_modif_dans_liste[index_champ][
            'colonne_du_tableau'
          ][0]['valeur'] * 5000;
        break;
      case 'nameCol2':
        this.formulaire_modif_dans_liste[index_champ]['colonne_du_tableau'][1][
          'total_selon_nombre'
        ] = this.formulaire_modif_dans_liste[index_champ][
          'colonne_du_tableau'
        ][2]['total_selon_nombre_nf'] =
          this.formulaire_modif_dans_liste[index_champ][
            'colonne_du_tableau'
          ][0]['valeur'] * 2000;
        break;
      case 'nameCol3':
        this.formulaire_modif_dans_liste[index_champ]['colonne_du_tableau'][1][
          'total_selon_nombre'
        ] = this.formulaire_modif_dans_liste[index_champ][
          'colonne_du_tableau'
        ][2]['total_selon_nombre_nf'] =
          this.formulaire_modif_dans_liste[index_champ][
            'colonne_du_tableau'
          ][0]['valeur'] * 1000;
        break;
      case 'nameCol4':
        this.formulaire_modif_dans_liste[index_champ]['colonne_du_tableau'][1][
          'total_selon_nombre'
        ] = this.formulaire_modif_dans_liste[index_champ][
          'colonne_du_tableau'
        ][2]['total_selon_nombre_nf'] =
          this.formulaire_modif_dans_liste[index_champ][
            'colonne_du_tableau'
          ][0]['valeur'] * 500;
        break;
      case 'nameCol5':
        this.formulaire_modif_dans_liste[index_champ]['colonne_du_tableau'][1][
          'total_selon_nombre'
        ] = this.formulaire_modif_dans_liste[index_champ][
          'colonne_du_tableau'
        ][2]['total_selon_nombre_nf'] =
          this.formulaire_modif_dans_liste[index_champ][
            'colonne_du_tableau'
          ][0]['valeur'] * 500;
        break;
      case 'nameCol6':
        this.formulaire_modif_dans_liste[index_champ]['colonne_du_tableau'][1][
          'total_selon_nombre'
        ] = this.formulaire_modif_dans_liste[index_champ][
          'colonne_du_tableau'
        ][2]['total_selon_nombre_nf'] =
          this.formulaire_modif_dans_liste[index_champ][
            'colonne_du_tableau'
          ][0]['valeur'] * 250;
        break;
      case 'nameCol7':
        this.formulaire_modif_dans_liste[index_champ]['colonne_du_tableau'][1][
          'total_selon_nombre'
        ] = this.formulaire_modif_dans_liste[index_champ][
          'colonne_du_tableau'
        ][2]['total_selon_nombre_nf'] =
          this.formulaire_modif_dans_liste[index_champ][
            'colonne_du_tableau'
          ][0]['valeur'] * 200;
        break;
      case 'nameCol8':
        this.formulaire_modif_dans_liste[index_champ]['colonne_du_tableau'][1][
          'total_selon_nombre'
        ] = this.formulaire_modif_dans_liste[index_champ][
          'colonne_du_tableau'
        ][2]['total_selon_nombre_nf'] =
          this.formulaire_modif_dans_liste[index_champ][
            'colonne_du_tableau'
          ][0]['valeur'] * 100;
        break;
      case 'nameCol9':
        this.formulaire_modif_dans_liste[index_champ]['colonne_du_tableau'][1][
          'total_selon_nombre'
        ] = this.formulaire_modif_dans_liste[index_champ][
          'colonne_du_tableau'
        ][2]['total_selon_nombre_nf'] =
          this.formulaire_modif_dans_liste[index_champ][
            'colonne_du_tableau'
          ][0]['valeur'] * 50;
        break;
      case 'nameCol10':
        this.formulaire_modif_dans_liste[index_champ]['colonne_du_tableau'][1][
          'total_selon_nombre'
        ] = this.formulaire_modif_dans_liste[index_champ][
          'colonne_du_tableau'
        ][2]['total_selon_nombre_nf'] =
          this.formulaire_modif_dans_liste[index_champ][
            'colonne_du_tableau'
          ][0]['valeur'] * 25;
        break;
      case 'nameCol11':
        this.formulaire_modif_dans_liste[index_champ]['colonne_du_tableau'][1][
          'total_selon_nombre'
        ] = this.formulaire_modif_dans_liste[index_champ][
          'colonne_du_tableau'
        ][2]['total_selon_nombre_nf'] =
          this.formulaire_modif_dans_liste[index_champ][
            'colonne_du_tableau'
          ][0]['valeur'] * 10;
        break;
      case 'nameCol12':
        this.formulaire_modif_dans_liste[index_champ]['colonne_du_tableau'][1][
          'total_selon_nombre'
        ] = this.formulaire_modif_dans_liste[index_champ][
          'colonne_du_tableau'
        ][2]['total_selon_nombre_nf'] =
          this.formulaire_modif_dans_liste[index_champ][
            'colonne_du_tableau'
          ][0]['valeur'] * 5;
        break;
    }

    // retourne le montant formate
    this.formulaire_modif_dans_liste[index_champ]['colonne_du_tableau'][1][
      'total_selon_nombre'
    ] = this._toolsService._formaterMontantRecu(
      this.formulaire_modif_dans_liste[index_champ]['colonne_du_tableau'][1][
        'total_selon_nombre'
      ]
    );

    //@ts-ignore
    this.total_montant = this.formulaire_modif_dans_liste.reduce(
      (a: any, b: any) => a + b.colonne_du_tableau[2]['total_selon_nombre_nf'],
      0
    );

    this.total_montant = this._toolsService._formaterMontantRecu(
      this.total_montant
    );
  }

  ngOnInit(): void {
    for (let index = 0; index < 13; index++) {
      this.objet_modif_dans_liste = {
        colonne_du_tableau: [
          {
            id: 'idNombre',
            type: 'numerique',
            valeur: '',
            obligatoire: 'N',
            label: 'nombre',
          },
          {
            total_selon_nombre: 0,
          },
          {
            total_selon_nombre_nf: 0,
          },
        ],
      };
      this.formulaire_modif_dans_liste.push(this.objet_modif_dans_liste);
    }

    this.Initialisation('ngOnInit');
  }

  ngAfterViewInit() {}
}
