import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-module-edition',
  templateUrl: './module-edition.component.html',
  styleUrls: ['./module-edition.component.scss'],
})
export class ModuleEditionComponent implements OnInit, AfterViewInit {
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
  session_de_connexion: any = JSON.parse(
    sessionStorage.getItem('donnee_de_connexion') || '{}'
  );
  tab_liste_sexe: any = [];
  ComboAgence: any = [];
  ComboOperateur: any = [];
  ComboExercice: any = [];
  ComboPeriodicite: any = [];
  ComboModeRglement: any = [];
  ComboActe: any = [];
  ComboAssure: any = [];
  ComboAssurance: any = [];
  ComboNumCompte: any = [];
  ComboNumComptedebut: any = [];
  ComboNumComptefin: any = [];
  lien_du_service: any = '';
  tab_liste_etat: any = [];
  ComboPeriode: any = [];
  ComboPeriodiciteDateDebutFin: any = [];
  tab_ModeReglment: any = [];
  tab_ModeReglmentptparacte: any = [];
  tab_ModeReglmentbroucaisse: any = [];
  tab_Actebroucaisse: any = [];
  tab_Actejournal: any = [];
  tab_ActePointParActe: any = [];
  tab_Assurancejournal: any = [];
  tab_journal: any = [];
  tab_typeshemacomptable: any = [];
  varjournal: any = '';
  vartypeshemacomptable: any = '';
  ComboJournal: any = [];
  ComboModeRglementJournal: any = [];
  varsoldePatient: any = '03';
  TAB_SOLDE: any = [
    {
      CODESTATUTSOLDE: '01',
      LIBELLE: 'SOLDE NULL',
    },
    {
      CODESTATUTSOLDE: '02',
      LIBELLE: 'SOLDE NON NULL',
    },
    {
      CODESTATUTSOLDE: '03',
      LIBELLE: 'TOUS LES SOLDES',
    },
  ];
  ComboOption: any = [
    {
      OA_CODEOPTION: '01',
      OA_LIBELLE: 'TOUS LES COMPTES',
    },
    {
      OA_CODEOPTION: '02',
      OA_LIBELLE: 'LES COMPTES MOUVEMENTES',
    },
    {
      OA_CODEOPTION: '03',
      OA_LIBELLE: 'LES COMPTES INDIVIDUELS',
    },
    {
      OA_CODEOPTION: '04',
      OA_LIBELLE: 'LES COMPTES COLLECTIFS',
    },
    {
      OA_CODEOPTION: '05',
      OA_LIBELLE: 'LES COMPTES INDIVIDUELS MOUVEMENTES',
    },
  ];
  ComboOption2: any = [
    {
      OA_CODEOPTION: '01',
      OA_LIBELLE: 'NOM ET PRENOMS',
    },
    {
      OA_CODEOPTION: '02',
      OA_LIBELLE: 'N° DOSSIER',
    },
  ];
  model_op_edition: any[] = [
    // 0
    {
      id: 'idModeReglement_listepaiement',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'mode de règlement',
      afficher: true,
      readOnly: true,
    },
    // 1
    {
      id: 'idActe_listepaiement',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'acte',
      afficher: true,
      readOnly: true,
    },
    // 2
    {
      id: 'idOperateur_listepaiement',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'opérateur',
      afficher: true,
      readOnly: true,
    },
    // 3
    {
      id: 'idAssure_listepaiement',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'assuré',
      afficher: true,
      readOnly: true,
    },
    // 4
    {
      id: 'idAssurance_listepaiement',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'assurance',
      afficher: true,
      readOnly: true,
    },
    // 5
    {
      id: 'idExercice_journal',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'exercice',
      afficher: true,
      readOnly: true,
    },
    // 6
    {
      id: 'idPeriodicite_journal',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'periodicité',
      afficher: true,
      readOnly: true,
    },
    // 7
    {
      id: 'idDateDebut_journal',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de début',
      afficher: true,
      readOnly: true,
    },
    // 8
    {
      id: 'idDateFin_journal',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de fin',
      afficher: true,
      readOnly: true,
    },
    // 9
    {
      id: 'idNumPiece_journal',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'n° de pièce',
      afficher: true,
      readOnly: true,
    },
    // 10
    {
      id: 'idMontantDebut_journal',
      type: 'montant',
      valeur: '',
      obligatoire: 'N',
      label: 'montant de début',
      afficher: true,
      readOnly: true,
    },
    // 11
    {
      id: 'idMontantFin_journal',
      type: 'montant',
      valeur: '',
      obligatoire: 'N',
      label: 'montant de fin',
      afficher: true,
      readOnly: true,
    },
    // 12
    {
      id: 'idNumCompteDebut_grandlivre',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'n° compte début',
      afficher: true,
      readOnly: true,
    },
    // 13
    {
      id: 'idNumCompteFin_grandlivre',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'n° compte fin',
      afficher: true,
      readOnly: true,
    },
    // 14
    {
      id: 'idOption_balance',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'option',
      afficher: true,
      readOnly: true,
    },
    // 15
    {
      id: 'idModeReglement_journal',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'mode de règlement',
      afficher: true,
      readOnly: true,
    },
    // 16
    {
      id: 'idActe_journal',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'acte',
      afficher: true,
      readOnly: true,
    },
    // 17
    {
      id: 'idOperateur_journal',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'opérateur',
      afficher: true,
      readOnly: true,
    },
    // 18
    {
      id: 'idAssure_journal',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'assuré',
      afficher: true,
      readOnly: true,
    },
    // 19
    {
      id: 'idAssurance_journal',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'assurance',
      afficher: true,
      readOnly: true,
    },
    // 20
    {
      id: 'idExercice_grandlivre',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'exercice',
      afficher: true,
      readOnly: true,
    },
    // 21
    {
      id: 'idPeriodicite_grandlivre',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'périodicité',
      afficher: true,
      readOnly: true,
    },
    // 22
    {
      id: 'idDateDebut_grandlivre',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de début',
      afficher: true,
      readOnly: true,
    },
    // 23
    {
      id: 'idDateFin_grandlivre',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de fin',
      afficher: true,
      readOnly: true,
    },
    // 24
    {
      id: 'idOperateur_grandlivre',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'opérateur',
      afficher: true,
      readOnly: true,
    },
    // 25
    {
      id: 'idExercice_balance',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'exercice',
      afficher: true,
      readOnly: true,
    },
    // 26
    {
      id: 'idPeriodicite_balance',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'périodicité',
      afficher: true,
      readOnly: true,
    },
    // 27
    {
      id: 'idDateDebut_balance',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de début',
      afficher: true,
      readOnly: true,
    },
    // 28
    {
      id: 'idDateFin_balance',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de fin',
      afficher: true,
      readOnly: true,
    },
    // 29
    {
      id: 'idDateDebut_listepaiement',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de début',
      afficher: true,
      readOnly: true,
    },
    // 30
    {
      id: 'idDateFin_listepaiement',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de fin',
      afficher: true,
      readOnly: true,
    },
    // 31
    {
      id: 'idAgence_brou_caisse',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'agence',
      afficher: true,
      readOnly: true,
    },
    // 32
    {
      id: 'idOperateur_brou_caisse',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'opérateur',
      afficher: true,
      readOnly: true,
    },
    // 33
    {
      id: 'idDateDebut_brou_caisse',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de début',
      afficher: true,
      readOnly: true,
    },
    // 34
    {
      id: 'idDateFin_brou_caisse',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de fin',
      afficher: true,
      readOnly: true,
    },
    // 35
    {
      id: 'idDateDebut_pt_par_acte',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de début',
      afficher: true,
      readOnly: true,
    },
    // 36
    {
      id: 'idDateFin_pt_par_acte',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de fin',
      afficher: true,
      readOnly: true,
    },
    // 37
    {
      id: 'idActe_pt_par_acte',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'acte',
      afficher: true,
      readOnly: true,
    },
    // 38
    {
      id: 'idExercice_etat_form_charge',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'exercice',
      afficher: true,
      readOnly: true,
    },
    // 39
    {
      id: 'idPeriodicite_etat_form_charge',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'periodicité',
      afficher: true,
      readOnly: true,
    },
    // 40
    {
      id: 'idDateDebut_etat_form_charge',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de début',
      afficher: true,
      readOnly: true,
    },
    // 41
    {
      id: 'idDateFin_etat_form_charge',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de fin',
      afficher: true,
      readOnly: true,
    },
    // 42
    {
      id: 'idOptionAffichage_etat_form_charge',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: "option d'affichage",
      afficher: true,
      readOnly: true,
    },
    // 43
    {
      id: 'idOption_etat_form_charge',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'option',
      afficher: true,
      readOnly: true,
    },

    // 44
    {
      id: 'idExercice_etat_form_prod',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'exercice',
      afficher: true,
      readOnly: true,
    },
    // 45
    {
      id: 'idPeriodicite_etat_form_prod',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'periodicité',
      afficher: true,
      readOnly: true,
    },
    // 46
    {
      id: 'idDateDebut_etat_form_prod',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de début',
      afficher: true,
      readOnly: true,
    },
    // 47
    {
      id: 'idDateFin_etat_form_prod',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de fin',
      afficher: true,
      readOnly: true,
    },
    // 48
    {
      id: 'idOptionAffichage_etat_form_prod',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: "option d'affichage",
      afficher: true,
      readOnly: true,
    },
    // 49
    {
      id: 'idOption_etat_form_prod',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'option',
      afficher: true,
      readOnly: true,
    },
    // 50
    {
      id: 'idPeriode_journal',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'période',
      afficher: true,
      readOnly: true,
    },
    // 51
    {
      id: 'idPeriode_grandlivre',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'période',
      afficher: true,
      readOnly: true,
    },
    // 52
    {
      id: 'idPeriode_balance',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'période',
      afficher: true,
      readOnly: true,
    },
    // 53
    {
      id: 'idPeriode_etat_form_charge',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'période',
      afficher: true,
      readOnly: true,
    },
    // 54
    {
      id: 'idPeriode_etat_form_prod',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'période',
      afficher: true,
      readOnly: true,
    },
    // 55
    {
      id: 'idOperateur_listepatient',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'opérateur',
      afficher: true,
      readOnly: true,
    },
    // 56
    {
      id: 'idAssure_listepatient',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'assuré',
      afficher: true,
      readOnly: true,
    },
    // 57
    {
      id: 'idAssurance_listepatient',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'assurance',
      afficher: true,
      readOnly: true,
    },
    // 58
    {
      id: 'idDateDebut_listepatient',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de début',
      afficher: true,
      readOnly: true,
    },
    // 59
    {
      id: 'idDateFin_listepatient',
      type: 'date',
      valeur: '',
      obligatoire: 'N',
      label: 'date de fin',
      afficher: true,
      readOnly: true,
    },
    // 60
    {
      // id: 'idNomPrenoms_listepatient',
      id: 'idComboMultiFonc_listepatient',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      // label: 'nom/prenoms',
      label: 'option',
      afficher: true,
      readOnly: true,
    },
    // 61
    {
      id: 'idNumDoc_listepatient',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'n° dossier',
      afficher: true,
      readOnly: true,
    },
    // 62
    {
      id: 'idModeReglement_brou_caisse',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'mode de règlement',
      afficher: true,
      readOnly: true,
    },
    // 63
    {
      id: 'idActe_brou_caisse',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'acte',
      afficher: true,
      readOnly: true,
    },
    // 64
    {
      id: 'idModeReglement_pt_par_acte',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'mode de règlement',
      afficher: true,
      readOnly: true,
    },
    // 65
    {
      id: 'idNumCompteDebut_balance',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'n° compte début',
      afficher: true,
      readOnly: true,
    },
    // 66
    {
      id: 'idNumCompteFin_balance',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'n° compte fin',
      afficher: true,
      readOnly: true,
    },
  ];
  tab_liste_edition: any[] = [
    { nom: 'Liste des paiements', index: 'listepaiement', id: '0' },
    { nom: 'Journal', index: 'journal', id: '1' },
    { nom: 'Grand livre', index: 'grandlivre', id: '2' },
    { nom: 'Balance', index: 'balance', id: '3' },
    { nom: 'Brouillard de caisse', index: 'brouilcaisse', id: '4' },
    { nom: 'Point par acte', index: 'pointparacte', id: '5' },
    { nom: 'Etat de formation (charge)', index: 'etatformcharge', id: '6' },
    { nom: 'Etat de formation (produit)', index: 'etatformproduit', id: '7' },
    { nom: 'Liste des patients', index: 'listepatient', id: '8' },
    { nom: 'Liste des nouveaux patients', index: 'listepatients', id: '9' },
  ];
  index_etat_select: any = '';
  id_etat_select: any = '';
  Typeshemacomptable: any = '';
  @ViewChild('idModeReglementbroucaisse') charger_ModeReglementbroucaisse: any;
  @ViewChild('idActebroucaisse') charger_Actebroucaisse: any;
  @ViewChild('idModeReglementjournal') charger_ModeReglementjournal: any;
  @ViewChild('idActejournal') charger_Actejournal: any;
  @ViewChild('idModeReglementptparacte') charger_ModeReglementptparacte: any;
  @ViewChild('idActePointParActe') charger_ActePointParActe: any;
  @ViewChild('idAssurancejournal') charger_Assurancejournal: any;
  @ViewChild('idjournals') charger_idjournals: any;
  @ViewChild('idTypeshemacomptables') charger_Typeshemacomptables: any;
  ComboTypeshemacomptable: any = [];

  ChoixDeLetat(id: any, index: any) {
    this.id_etat_select = id;
    this.index_etat_select = index;
    this.Typeshemacomptable = '';
    this.Initialisation('AfficherEtat');

    if (index == 'brouilcaisse') {
      this.model_op_edition[31]['valeur'] =
        this.session_de_connexion['AG_CODEAGENCE'];
      /* this.model_op_edition[32]['valeur'] =
        this.session_de_connexion['OP_CODEOPERATEUR']; */
      this.model_op_edition[33]['valeur'] =
        this.session_de_connexion['JT_DATEJOURNEETRAVAIL']; //'09/01/2025'
      this.model_op_edition[34]['valeur'] =
        this.session_de_connexion['JT_DATEJOURNEETRAVAIL']; //'13/01/2025'

      /* this.tab_ModeReglmentbroucaisse = [];
      if (this.charger_ModeReglementbroucaisse != undefined) {
        for (
          let index = 0;
          index < this.charger_ModeReglementbroucaisse.nativeElement.length;
          index++
        ) {
          if (index != 0) {
            this.charger_ModeReglementbroucaisse.nativeElement[index].selected =
              true;
            var localvalue =
              this.charger_ModeReglementbroucaisse.nativeElement[index].value;
            localvalue = localvalue.split(': ');
            localvalue[1] = localvalue[1]; //.replaceAll("'", "''");
            this.tab_ModeReglmentbroucaisse.push(localvalue[1]);
          }
        }
      }

      this.tab_Actebroucaisse = [];
      if (this.charger_Actebroucaisse != undefined) {
        for (
          let index = 0;
          index < this.charger_Actebroucaisse.nativeElement.length;
          index++
        ) {
          if (index != 0) {
            this.charger_Actebroucaisse.nativeElement[index].selected = true;
            var localvalue =
              this.charger_Actebroucaisse.nativeElement[index].value;
            localvalue = localvalue.split(': ');
            localvalue[1] = localvalue[1]; //.replaceAll("'", "''");
            this.tab_Actebroucaisse.push(localvalue[1]);
          }
        }
      } */
    }

    if (index == 'balance') {
      this.model_op_edition[25]['valeur'] =
        this.session_de_connexion['EX_EXERCICE'];
      this.model_op_edition[26]['valeur'] = '03';
      this.chargementComboPeriodeInit(this.model_op_edition[26]['valeur']);
    }

    if (index == 'grandlivre') {
      this.model_op_edition[20]['valeur'] =
        this.session_de_connexion['EX_EXERCICE'];
      this.model_op_edition[21]['valeur'] = '03';
      this.chargementComboPeriodeInit(this.model_op_edition[21]['valeur']);
    }

    if (index == 'journal') {
      this.model_op_edition[5]['valeur'] =
        this.session_de_connexion['EX_EXERCICE'];
      this.model_op_edition[6]['valeur'] = '03';
      this.chargementComboPeriodeInit(this.model_op_edition[6]['valeur']);
    }

    if (index == 'journal') {
      this.tab_ModeReglment = [];
      if (this.charger_ModeReglementjournal != undefined) {
        for (
          let index = 0;
          index < this.charger_ModeReglementjournal.nativeElement.length;
          index++
        ) {
          if (index != 0) {
            this.charger_ModeReglementjournal.nativeElement[index].selected =
              true;
            var localvalue =
              this.charger_ModeReglementjournal.nativeElement[index].value;
            localvalue = localvalue.split(': ');
            localvalue[1] = localvalue[1]; //.replaceAll("'", "''");
            this.tab_ModeReglment.push(localvalue[1]);
          }
        }
      }

      /*  this.tab_Actejournal = [];
            if (this.charger_Actejournal != undefined) {
              for (
                let index = 0;
                index < this.charger_Actejournal.nativeElement.length;
                index++
              ) {
                if (index != 0) {
                  this.charger_Actejournal.nativeElement[index].selected = true;
                  var localvalue = this.charger_Actejournal.nativeElement[index].value;
                  localvalue = localvalue.split(': ');
                  localvalue[1] = localvalue[1]//.replaceAll("'", "''");
                  this.tab_Actejournal.push(localvalue[1]);
                }
              }
            }

            this.tab_Assurancejournal = [];
            if (this.charger_Assurancejournal != undefined) {
              for (
                let index = 0;
                index < this.charger_Assurancejournal.nativeElement.length;
                index++
              ) {
                if (index != 0) {
                  this.charger_Assurancejournal.nativeElement[index].selected = true;
                  var localvalue = this.charger_Assurancejournal.nativeElement[index].value;
                  localvalue = localvalue.split(': ');
                  localvalue[1] = localvalue[1]//.replaceAll("'", "''");
                  this.tab_Assurancejournal.push(localvalue[1]);
                }
              }
            }*/
    }

    if (index == 'listepatient') {
      this.model_op_edition[55]['valeur'] = ''; //this.session_de_connexion['OP_CODEOPERATEUR']
      this.model_op_edition[58]['valeur'] = '';
      this.model_op_edition[58]['obligatoire'] = 'N';
      this.model_op_edition[59]['valeur'] =
        this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
      this.model_op_edition[59]['obligatoire'] = 'N';
      this.model_op_edition[57]['obligatoire'] = 'N';
    }

    if (index == 'listepatients') {
      this.model_op_edition[55]['valeur'] = ''; //this.session_de_connexion['OP_CODEOPERATEUR']
      this.model_op_edition[58]['valeur'] =
        this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
      this.model_op_edition[58]['obligatoire'] = 'O';
      this.model_op_edition[59]['valeur'] =
        this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
      this.model_op_edition[59]['obligatoire'] = 'O';
      this.model_op_edition[57]['obligatoire'] = 'N';
    }

    if (index == 'pointparacte') {
      this.model_op_edition[35]['valeur'] =
        this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
      this.model_op_edition[36]['valeur'] =
        this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];

      this.tab_ActePointParActe = [];
      if (this.charger_ActePointParActe != undefined) {
        for (
          let index = 0;
          index < this.charger_ActePointParActe.nativeElement.length;
          index++
        ) {
          if (index != 0) {
            this.charger_ActePointParActe.nativeElement[index].selected = true;
            var localvalue =
              this.charger_ActePointParActe.nativeElement[index].value;
            localvalue = localvalue.split(': ');
            localvalue[1] = localvalue[1]; //.replaceAll("'", "''");
            this.tab_ActePointParActe.push(localvalue[1]);
          }
        }
      }
    }

    if (index == 'etatformcharge') {
      this.model_op_edition[38]['valeur'] =
        this.session_de_connexion['EX_EXERCICE'];
      this.model_op_edition[39]['valeur'] = '03';
      this.chargementComboPeriodeInit(this.model_op_edition[39]['valeur']);
    }

    if (index == 'etatformproduit') {
      this.model_op_edition[44]['valeur'] =
        this.session_de_connexion['EX_EXERCICE'];
      this.model_op_edition[45]['valeur'] = '03';
      this.chargementComboPeriodeInit(this.model_op_edition[45]['valeur']);
    }
  }

  TrouverLaDateDeDebut(_MO_CODEMOIS: any, etat: any) {
    if (etat == 'charge') {
      this.model_op_edition[40][
        'valeur'
      ] = `01/${_MO_CODEMOIS}/${this.model_op_edition[38]['valeur']}`;
    } else {
      this.model_op_edition[46][
        'valeur'
      ] = `01/${_MO_CODEMOIS}/${this.model_op_edition[44]['valeur']}`;
    }
  }

  AfficherEtat(tableau_recu: any, table_index: any, index_etat: any) {
    // @ts-ignore
    tableau_recu.forEach((element) => {
      element['obligatoire'] = 'N';
    });

    // ajout de champ obligatoire dynamique
    switch (index_etat) {
      case 'listepaiement':
        if (tableau_recu[3]['valeur'] == 'Assuré') {
          table_index.push(4);
        }
        break;

      case 'journal':
        if (tableau_recu[18]['valeur'] == 'Assuré') {
          table_index.push(19);
        }
        break;

      case 'pointparacte':
        if (this.tab_ActePointParActe.length > 0) {
          tableau_recu[37]['obligatoire'] = 'N';
          table_index.pop();
        }
        break;
    }

    // @ts-ignore
    table_index.forEach((element) => {
      tableau_recu[element]['obligatoire'] = 'O';
    });

    if (index_etat != 'etatformcharge') {
      this.model_op_edition[40]['valeur'] = '01/01/1900';
    }
    // verifier les champs obligatoires et les types de donnees
    if (!this._toolsService._contrainteChampObligatoire(tableau_recu)) return;
    if (
      !this._toolsService._contrainteTypeDeDonneeChampNonObligatoire(
        tableau_recu
      )
    )
      return;

    this._loaderService._show();
    console.log('tableau_recu', tableau_recu);

    //fonction edition ************************************
    var body = {};
    switch (index_etat) {
      case 'brouilcaisse':
        this.tab_ModeReglmentbroucaisse = [];
        if (this.charger_ModeReglementbroucaisse != undefined) {
          for (
            let index = 0;
            index < this.charger_ModeReglementbroucaisse.nativeElement.length;
            index++
          ) {
            if (
              index != 0 &&
              this.charger_ModeReglementbroucaisse.nativeElement[index]
                .selected == true
            ) {
              var localvalue =
                this.charger_ModeReglementbroucaisse.nativeElement[index].value;
              localvalue = localvalue.split(': ');
              localvalue[1] = localvalue[1]; //.replaceAll("'", "''");
              this.tab_ModeReglmentbroucaisse.push(localvalue[1]);
            }
          }
        }

        this.tab_Actebroucaisse = [];
        if (this.charger_Actebroucaisse != undefined) {
          for (
            let index = 0;
            index < this.charger_Actebroucaisse.nativeElement.length;
            index++
          ) {
            if (
              index != 0 &&
              this.charger_Actebroucaisse.nativeElement[index].selected == true
            ) {
              var localvalue =
                this.charger_Actebroucaisse.nativeElement[index].value;
              localvalue = localvalue.split(': ');
              localvalue[1] = localvalue[1]; //.replaceAll("'", "''");
              this.tab_Actebroucaisse.push(localvalue[1]);
            }
          }
        }

        this.lien_du_service = 'brouillard_de_caisse';

        /* if (this.model_op_edition[32]['valeur'] == '') {
          this.model_op_edition[32]['valeur'] =
            this.session_de_connexion['OP_CODEOPERATEUR'];
        } */

        body = {
          Objet: [
            {
              AG_CODEAGENCE: this.model_op_edition[31]['valeur'],
              OP_CODEOPERATEUR: this.model_op_edition[32]['valeur'],
              DATEDEBUT: this.model_op_edition[33]['valeur'],
              DATEFIN: this.model_op_edition[34]['valeur'],
              TS_CODETYPESCHEMACOMPTABLE: this.Typeshemacomptable,
              TYPEETAT: '1',
              OP_CODEOPERATEUREDITION:
                this.session_de_connexion['OP_CODEOPERATEUR'],
              MR_CODEMODEREGLEMENT: this.tab_ModeReglmentbroucaisse.join(','),
              ACT_CODEACTE: this.tab_Actebroucaisse.join(','),
            },
          ],
        };

        break;

      case 'grandlivre':
        this.lien_du_service = 'grand_livre';

        body = {
          Objet: [
            {
              AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'], //"1000",
              OP_CODEOPERATEUR: this.model_op_edition[24]['valeur'],
              DATEDEBUT: this.model_op_edition[22]['valeur'],
              DATEFIN: this.model_op_edition[23]['valeur'],
              TYPEETAT: '',
              OP_CODEOPERATEUREDITION: '100000000001',
              NUMCOMPTEDEBUT: this.model_op_edition[12]['valeur'],
              NUMCOMPTEFIN: this.model_op_edition[13]['valeur'],
            },
          ],
        };

        break;

      case 'balance':
        this.lien_du_service = 'balance';

        body = {
          Objet: [
            {
              AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'],
              OP_CODEOPERATEUR: this.session_de_connexion['OP_CODEOPERATEUR'],
              DATEDEBUT: this.model_op_edition[27]['valeur'],
              DATEFIN: this.model_op_edition[28]['valeur'],
              TYPEETAT: '',
              OP_CODEOPERATEUREDITION:
                this.session_de_connexion['OP_CODEOPERATEUR'],
              PL_OPTION: this.model_op_edition[14]['valeur'],
              NUMCOMPTEDEBUT: this.model_op_edition[65]['valeur'],
              NUMCOMPTEFIN: this.model_op_edition[66]['valeur'],
            },
          ],
        };

        break;

      case 'journal':
        if (
          this.model_op_edition[10]['valeur'] ||
          this.model_op_edition[11]['valeur']
        ) {
          if (
            +this.model_op_edition[10]['valeur'].replaceAll(' ', '') >
            +this.model_op_edition[11]['valeur'].replaceAll(' ', '')
          ) {
            this._loaderService._hide();
            this._alertService.WarningAlert(
              'Information!',
              `Le montant début ne peut pas être supérieur au montant fin.`
            );
            return;
          }
        }

        this.lien_du_service = 'journal';

        this.tab_typeshemacomptable = [];
        if (this.charger_Typeshemacomptables != undefined) {
          for (
            let index = 0;
            index < this.charger_Typeshemacomptables.nativeElement.length;
            index++
          ) {
            if (
              index != 0 &&
              this.charger_Typeshemacomptables.nativeElement[index].selected ==
                true
            ) {
              var localvalue =
                this.charger_Typeshemacomptables.nativeElement[index].value;
              localvalue = localvalue.split(': ');
              localvalue[1] = localvalue[1]; //.replaceAll("'", "''");
              this.tab_typeshemacomptable.push(localvalue[1]);
            }
          }
        }

        this.tab_journal = [];
        if (this.charger_idjournals != undefined) {
          for (
            let index = 0;
            index < this.charger_idjournals.nativeElement.length;
            index++
          ) {
            if (
              index != 0 &&
              this.charger_idjournals.nativeElement[index].selected == true
            ) {
              var localvalue =
                this.charger_idjournals.nativeElement[index].value;
              localvalue = localvalue.split(': ');
              localvalue[1] = localvalue[1]; //.replaceAll("'", "''");
              this.tab_journal.push(localvalue[1]);
            }
          }
        }

        this.tab_ModeReglment = [];
        if (this.charger_ModeReglementjournal != undefined) {
          for (
            let index = 0;
            index < this.charger_ModeReglementjournal.nativeElement.length;
            index++
          ) {
            if (
              index != 0 &&
              this.charger_ModeReglementjournal.nativeElement[index].selected ==
                true
            ) {
              var localvalue =
                this.charger_ModeReglementjournal.nativeElement[index].value;
              localvalue = localvalue.split(': ');
              localvalue[1] = localvalue[1]; //.replaceAll("'", "''");
              this.tab_ModeReglment.push(localvalue[1]);
            }
          }
        }

        this.tab_Actejournal = [];
        if (this.charger_Actejournal != undefined) {
          for (
            let index = 0;
            index < this.charger_Actejournal.nativeElement.length;
            index++
          ) {
            if (
              index != 0 &&
              this.charger_Actejournal.nativeElement[index].selected == true
            ) {
              var localvalue =
                this.charger_Actejournal.nativeElement[index].value;
              localvalue = localvalue.split(': ');
              localvalue[1] = localvalue[1]; //.replaceAll("'", "''");
              this.tab_Actejournal.push(localvalue[1]);
            }
          }
        }

        this.tab_Assurancejournal = [];
        if (this.charger_Assurancejournal != undefined) {
          for (
            let index = 0;
            index < this.charger_Assurancejournal.nativeElement.length;
            index++
          ) {
            if (
              index != 0 &&
              this.charger_Assurancejournal.nativeElement[index].selected ==
                true
            ) {
              var localvalue =
                this.charger_Assurancejournal.nativeElement[index].value;
              localvalue = localvalue.split(': ');
              localvalue[1] = localvalue[1]; //.replaceAll("'", "''");
              this.tab_Assurancejournal.push(localvalue[1]);
            }
          }
        }

        body = {
          Objet: [
            {
              AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'], //valeur session
              OP_CODEOPERATEUR: this.model_op_edition[17]['valeur'], //valeur session
              DATEDEBUT: this.model_op_edition[7]['valeur'],
              DATEFIN: this.model_op_edition[8]['valeur'],
              TYPEETAT: '',
              OP_CODEOPERATEUREDITION: '100000000001', //valeur session
              MR_CODEMODEREGLEMENT: this.tab_ModeReglment.join(','), //"005",
              ACT_CODEACTE: this.tab_Actejournal.join(','), //"001",
              STAT_CODESTATUT: this.model_op_edition[18]['valeur'], //"01",
              AS_CODEASSURANCE: this.tab_Assurancejournal.join(','), //"0001",
              MONTANTDEBUT: this.model_op_edition[10]['valeur']
                .toString()
                .replaceAll(/\s/g, ''),
              MONTANTFIN: this.model_op_edition[11]['valeur']
                .toString()
                .replaceAll(/\s/g, ''),
              NUMBORDEREAU: this.model_op_edition[9]['valeur'],
              JO_CODEJOURNAL: this.tab_journal.join(','),
              TS_CODETYPESCHEMACOMPTABLE: this.tab_typeshemacomptable.join(','),
            },
          ],
        };

        break;

      case 'pointparacte':
        this.lien_du_service = 'edition_pointparacte';

        this.tab_ModeReglmentptparacte = [];
        if (this.charger_ModeReglementptparacte != undefined) {
          for (
            let index = 0;
            index < this.charger_ModeReglementptparacte.nativeElement.length;
            index++
          ) {
            if (
              index != 0 &&
              this.charger_ModeReglementptparacte.nativeElement[index]
                .selected == true
            ) {
              var localvalue =
                this.charger_ModeReglementptparacte.nativeElement[index].value;
              localvalue = localvalue.split(': ');
              localvalue[1] = localvalue[1]; //.replaceAll("'", "''");
              this.tab_ModeReglmentptparacte.push(localvalue[1]);
            }
          }
        }

        this.tab_ActePointParActe = [];
        if (this.charger_ActePointParActe != undefined) {
          for (
            let index = 0;
            index < this.charger_ActePointParActe.nativeElement.length;
            index++
          ) {
            if (
              index != 0 &&
              this.charger_ActePointParActe.nativeElement[index].selected ==
                true
            ) {
              var localvalue =
                this.charger_ActePointParActe.nativeElement[index].value;
              localvalue = localvalue.split(': ');
              localvalue[1] = localvalue[1]; //.replaceAll("'", "''");
              this.tab_ActePointParActe.push(localvalue[1]);
            }
          }
        }

        body = {
          Objet: [
            {
              AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'], //valeur session
              OP_CODEOPERATEUREDITION:
                this.session_de_connexion['OP_CODEOPERATEUR'], //valeur session
              DATEDEBUT: tableau_recu[35]['valeur'],
              DATEFIN: tableau_recu[36]['valeur'],
              ACT_CODEACTE: this.tab_ActePointParActe.join(','),
              MR_CODEMODEREGLEMENT: this.tab_ModeReglmentptparacte.join(','),
            },
          ],
        };
        break;

      case 'etatformcharge':
      case 'etatformproduit':
        this.lien_du_service = 'edition_formation';

        body = {
          Objet: [
            {
              AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'], //valeur session
              OP_CODEOPERATEUREDITION:
                this.session_de_connexion['OP_CODEOPERATEUR'], //valeur session
              DATEDEBUT:
                index_etat == 'etatformcharge'
                  ? tableau_recu[40]['valeur']
                  : tableau_recu[46]['valeur'],
              DATEFIN:
                index_etat == 'etatformcharge'
                  ? tableau_recu[41]['valeur']
                  : tableau_recu[47]['valeur'],
              TYPEETAT: index_etat == 'etatformcharge' ? '6' : '7',
              OPTION:
                index_etat == 'etatformcharge'
                  ? tableau_recu[43]['valeur']
                  : tableau_recu[49]['valeur'],
              /* OPTIONAFFICHAGE:
                index_etat == 'etatformcharge'
                  ? tableau_recu[42]['valeur']
                  : tableau_recu[48]['valeur'], */
            },
          ],
        };
        break;

      case 'listepatient':
        this.lien_du_service = 'editionPatient';
        if (this.varsoldePatient == '') {
          this.varsoldePatient = '03';
        }
        this.tab_Assurancejournal = [];
        if (this.charger_Assurancejournal != undefined) {
          for (
            let index = 0;
            index < this.charger_Assurancejournal.nativeElement.length;
            index++
          ) {
            if (
              index != 0 &&
              this.charger_Assurancejournal.nativeElement[index].selected ==
                true
            ) {
              var localvalue =
                this.charger_Assurancejournal.nativeElement[index].value;
              localvalue = localvalue.split(': ');
              localvalue[1] = localvalue[1]; //.replaceAll("'", "''");
              this.tab_Assurancejournal.push(localvalue[1]);
            }
          }
        }

        body = {
          Objet: [
            {
              AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'], //valeur session
              OP_CODEOPERATEUR: this.model_op_edition[55]['valeur'], //valeur session
              DATEDEBUT:
                index_etat == 'listepatient'
                  ? '01/01/1900'
                  : this.model_op_edition[58]['valeur'],
              DATEFIN: this.model_op_edition[59]['valeur'],
              TYPEETAT: index_etat == 'listepatient' ? 'LTCLT' : 'LTCLTS',
              OP_CODEOPERATEUREDITION: '100000000001', //valeur session
              STAT_CODESTATUT: this.model_op_edition[56]['valeur'], //"01",
              AS_CODEASSURANCE: this.tab_Assurancejournal.join(','), //"0001",
              OPTIONTRIE: this.model_op_edition[60]['valeur'],
              SX_CODESEXE: this.model_op_edition[61]['valeur'],
              CODESTATUTSOLDE: this.varsoldePatient,
            },
          ],
        };

        break;

      case 'listepatients':
        this.lien_du_service = 'editionPatient';
        if (this.varsoldePatient == '') {
          this.varsoldePatient = '03';
        }
        this.tab_Assurancejournal = [];
        if (this.charger_Assurancejournal != undefined) {
          for (
            let index = 0;
            index < this.charger_Assurancejournal.nativeElement.length;
            index++
          ) {
            if (
              index != 0 &&
              this.charger_Assurancejournal.nativeElement[index].selected ==
                true
            ) {
              var localvalue =
                this.charger_Assurancejournal.nativeElement[index].value;
              localvalue = localvalue.split(': ');
              localvalue[1] = localvalue[1]; //.replaceAll("'", "''");
              this.tab_Assurancejournal.push(localvalue[1]);
            }
          }
        }

        body = {
          Objet: [
            {
              AG_CODEAGENCE: this.session_de_connexion['AG_CODEAGENCE'], //valeur session
              OP_CODEOPERATEUR: this.model_op_edition[55]['valeur'], //valeur session
              DATEDEBUT:
                index_etat == 'listepatient'
                  ? '01/01/1900'
                  : this.model_op_edition[58]['valeur'],
              DATEFIN: this.model_op_edition[59]['valeur'],
              TYPEETAT: index_etat == 'listepatient' ? 'LTCLT' : 'LTCLTS',
              OP_CODEOPERATEUREDITION: '100000000001', //valeur session
              STAT_CODESTATUT: this.model_op_edition[56]['valeur'], //"01",
              AS_CODEASSURANCE: this.tab_Assurancejournal.join(','), //"0001",
              OPTIONTRIE: this.model_op_edition[60]['valeur'],
              SX_CODESEXE: this.model_op_edition[61]['valeur'],
              CODESTATUTSOLDE: this.varsoldePatient,
            },
          ],
        };

        break;
    }

    //
    this._adminService
      .AppelServeur(body, this.lien_du_service)
      .subscribe((success: any) => {
        this.tab_liste_etat = success;

        this._loaderService._hide();

        if (this.tab_liste_etat['SL_RESULTAT'] == 'FALSE') {
          this._alertService.WarningAlert(
            'Information!',
            this.tab_liste_etat['SL_MESSAGE']
          );
        } else {
          this.tab_liste_etat = this.tab_liste_etat[1].map(
            // @ts-ignore
            (item) => ({
              ...item,
              objetEnvoi: body, // ajouter la propriete 'images'
            })
          );

          switch (index_etat) {
            case 'listepaiement':
              window.open('/admin/invoice/etat_liste_paiements');
              break;
            case 'journal':
              sessionStorage.setItem(
                'et_journal',
                JSON.stringify(this.tab_liste_etat)
              );
              window.open('/admin/invoice/journal');
              break;
            case 'grandlivre':
              sessionStorage.setItem(
                'et_grandlivre',
                JSON.stringify(this.tab_liste_etat)
              );
              window.open('/admin/invoice/grand_livre');
              break;
            case 'balance':
              sessionStorage.setItem(
                'et_balance',
                JSON.stringify(this.tab_liste_etat)
              );

              window.open('/admin/invoice/balance');
              break;
            case 'brouilcaisse':
              sessionStorage.setItem(
                'et_brouillard_de_caisse',
                JSON.stringify(this.tab_liste_etat)
              );
              console.log('tab_liste_etat', this.tab_liste_etat);
              window.open('/admin/invoice/brouillard_de_caisse');
              break;
            case 'pointparacte':
              sessionStorage.setItem(
                'et_point_par_acte',
                JSON.stringify(this.tab_liste_etat)
              );

              window.open('/admin/invoice/etat_point_par_acte');
              break;
            case 'etatformcharge':
              sessionStorage.setItem(
                'et_formation_charge_produit',
                JSON.stringify(this.tab_liste_etat)
              );
              sessionStorage.setItem('etatform', 'CHARGES');
              window.open('/admin/invoice/etat_de_formation');
              break;
            case 'etatformproduit':
              sessionStorage.setItem(
                'et_formation_charge_produit',
                JSON.stringify(this.tab_liste_etat)
              );
              sessionStorage.setItem('etatform', 'PRODUITS');
              window.open('/admin/invoice/etat_de_formation');
              break;
            case 'listepatient':
              sessionStorage.setItem(
                'et_listepatient',
                JSON.stringify(this.tab_liste_etat)
              );

              window.open('/admin/invoice/liste_des_patients');
              break;
            case 'listepatients':
              sessionStorage.setItem(
                'et_listepatient',
                JSON.stringify(this.tab_liste_etat)
              );

              window.open('/admin/invoice/liste_des_patients');
              break;
          }
        }
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_liste_etat['SL_MESSAGE']
      );
    };

    // appel de service
    //this.Initialisation('AfficherEtat');
  }

  Initialisation(method: any) {
    if (method == 'ngOnInit') {
      this._loaderService._show();
    }

    this.model_op_edition.forEach((element, index) => {
      element['valeur'] = '';
    });

    this._loaderService._hide();
  }

  //CHARGEMENTS DES COMBOS*************************************************
  chargementComboAgence() {
    let Option = 'ComboTableLabelAgence';
    let body = {
      Objet: [
        {
          AG_CODEAGENCE: '',
        },
      ],
    };
    this._loaderService._show();
    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ComboAgence = success;
        if (this.ComboAgence[0].SL_RESULTAT == 'TRUE') {
          this.ComboAgence = this.ComboAgence[1];
          this.model_op_edition[31]['valeur'] =
            this.session_de_connexion['AG_CODEAGENCE']; //1000
          this.chargementComboJournal();
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.ComboAgence[0].SL_RESULTAT
          );
        }
      },
      (error) => {
        this._loaderService._hide();
        this._alertService.WarningAlert(
          'Information!',
          'veuillez reessayer svp ou probleme de connexion avec le serveur !!!'
        );
      }
    );
  }
  chargementComboJournal() {
    let Option = 'pvgComboJournal';
    let body = {
      Objet: [{}],
    };
    this._loaderService._show();
    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ComboJournal = success;
        if (this.ComboJournal[0].SL_RESULTAT == 'TRUE') {
          this.ComboJournal = this.ComboJournal[1];
          this.chargementComboTypeshemacomptable();
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.ComboAgence[0].SL_RESULTAT
          );
        }
      },
      (error) => {
        this._loaderService._hide();
        this._alertService.WarningAlert(
          'Information!',
          'veuillez reessayer svp ou probleme de connexion avec le serveur !!!'
        );
      }
    );
  }
  chargementComboTypeshemacomptable() {
    let Option = 'pvgComboTypeshemacomptable';
    let body = {
      Objet: [{}],
    };
    this._loaderService._show();
    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ComboTypeshemacomptable = success;
        if (this.ComboTypeshemacomptable[0].SL_RESULTAT == 'TRUE') {
          this.ComboTypeshemacomptable = this.ComboTypeshemacomptable[1];
          this.model_op_edition[31]['valeur'] =
            this.session_de_connexion['AG_CODEAGENCE']; //1000
          this.chargementComboOperateur(this.model_op_edition[31]['valeur']);
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.ComboAgence[0].SL_RESULTAT
          );
        }
      },
      (error) => {
        this._loaderService._hide();
        this._alertService.WarningAlert(
          'Information!',
          'veuillez reessayer svp ou probleme de connexion avec le serveur !!!'
        );
      }
    );
  }

  chargementComboOperateur(CodeAgence: any) {
    let Option = 'pvgComboOperateur';
    let body = {
      Objet: [
        {
          AG_CODEAGENCE: CodeAgence,
          OP_CODEOPERATEUR: '',
        },
      ],
    };

    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ComboOperateur = success;
        if (this.ComboOperateur[0].SL_RESULTAT == 'TRUE') {
          this.ComboOperateur = this.ComboOperateur[1];
          this.chargementComboExercice(CodeAgence);
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.ComboOperateur[0].SL_RESULTAT
          );
        }
      },
      (error) => {
        this._loaderService._hide();
        this._alertService.WarningAlert(
          'Information!',
          'veuillez reessayer svp ou probleme de connexion avec le serveur !!!'
        );
      }
    );
  }

  chargementComboExercice(CodeAgence: any) {
    let Option = 'pvgComboExercice';
    let body = {
      Objet: [
        {
          AG_CODEAGENCE: CodeAgence,
        },
      ],
    };

    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ComboExercice = success;
        if (this.ComboExercice[0].SL_RESULTAT == 'TRUE') {
          this.ComboExercice = this.ComboExercice[1];
          this.chargementComboPeriodicite();
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.ComboExercice[0].SL_RESULTAT
          );
        }
      },
      (error) => {
        this._loaderService._hide();
        this._alertService.WarningAlert(
          'Information!',
          'veuillez reessayer svp ou probleme de connexion avec le serveur !!!'
        );
      }
    );
  }
  chargementComboPeriodicite() {
    let Option = 'pvgComboPeriodicite';
    let body = {
      Objet: [{}],
    };

    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ComboPeriodicite = success;
        if (this.ComboPeriodicite[0].SL_RESULTAT == 'TRUE') {
          this.ComboPeriodicite = this.ComboPeriodicite[1];

          this.chargementComboModeRglementJournal();
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.ComboPeriodicite[0].SL_RESULTAT
          );
        }
      },
      (error) => {
        this._loaderService._hide();
        this._alertService.WarningAlert(
          'Information!',
          'veuillez reessayer svp ou probleme de connexion avec le serveur !!!'
        );
      }
    );
  }
  chargementComboModeRglementJournal() {
    let Option = 'pvgComboModeReglement';
    let body = {
      Objet: [{}],
    };

    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ComboModeRglementJournal = success;
        if (this.ComboModeRglementJournal[0].SL_RESULTAT == 'TRUE') {
          this.ComboModeRglementJournal = this.ComboModeRglementJournal[1];

          this.chargementComboModeRglement();
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.ComboModeRglementJournal[0].SL_RESULTAT
          );
        }
      },
      (error) => {
        this._loaderService._hide();
        this._alertService.WarningAlert(
          'Information!',
          'veuillez reessayer svp ou probleme de connexion avec le serveur !!!'
        );
      }
    );
  }
  chargementComboModeRglement() {
    let Option = 'pvgComboModeReglement';
    let body = {
      Objet: [{}],
    };

    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ComboModeRglement = success;
        if (this.ComboModeRglement[0].SL_RESULTAT == 'TRUE') {
          this.ComboModeRglement = this.ComboModeRglement[1];
          //@ts-ignore
          this.ComboModeRglement.forEach((element, idx) => {
            if (element['MR_CODEMODEREGLEMENT'] == '008')
              this.ComboModeRglement.splice(idx, 1);
          });

          this.chargementComboActe();
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.ComboModeRglement[0].SL_RESULTAT
          );
        }
      },
      (error) => {
        this._loaderService._hide();
        this._alertService.WarningAlert(
          'Information!',
          'veuillez reessayer svp ou probleme de connexion avec le serveur !!!'
        );
      }
    );
  }

  chargementComboActe() {
    let Option = 'pvgComboActe';
    let body = {
      Objet: [{}],
    };

    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ComboActe = success;
        if (this.ComboActe[0].SL_RESULTAT == 'TRUE') {
          this.ComboActe = this.ComboActe[1];
          this.chargementComboAssure();
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.ComboActe[0].SL_RESULTAT
          );
        }
      },
      (error) => {
        this._loaderService._hide();
        this._alertService.WarningAlert(
          'Information!',
          'veuillez reessayer svp ou probleme de connexion avec le serveur !!!'
        );
      }
    );
  }

  chargementComboAssure() {
    let Option = 'pvgComboAssure';
    let body = {
      Objet: [{}],
    };

    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ComboAssure = success;
        if (this.ComboAssure[0].SL_RESULTAT == 'TRUE') {
          this.ComboAssure = this.ComboAssure[1];
          this.chargementComboAssurance();
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.ComboAssure[0].SL_RESULTAT
          );
        }
      },
      (error) => {
        this._loaderService._hide();
        this._alertService.WarningAlert(
          'Information!',
          'veuillez reessayer svp ou probleme de connexion avec le serveur !!!'
        );
      }
    );
  }
  chargementComboAssurance() {
    let Option = 'pvgComboAssurance';
    let body = {
      Objet: [{}],
    };

    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ComboAssurance = success;
        if (this.ComboAssurance[0].SL_RESULTAT == 'TRUE') {
          this.ComboAssurance = this.ComboAssurance[1];
          this.chargementComboNumCompte();
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.ComboAssurance[0].SL_RESULTAT
          );
        }
      },
      (error) => {
        this._loaderService._hide();
        this._alertService.WarningAlert(
          'Information!',
          'veuillez reessayer svp ou probleme de connexion avec le serveur !!!'
        );
      }
    );
  }
  chargementComboNumCompte() {
    let Option = 'pvgComboCompte';
    let body = {
      Objet: [
        {
          SO_CODESOCIETE: this.session_de_connexion['SO_CODESOCIETE'], //"0001",//a remplacer dynamiquement
          PL_NUMCOMPTE: '',
          PL_TYPECOMPTE: 'I', //"I" a modifier selon bly
        },
      ],
    };

    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ComboNumCompte = success;
        if (this.ComboNumCompte[0].SL_RESULTAT == 'TRUE') {
          this.ComboNumComptedebut = this.ComboNumCompte[1];
          this.ComboNumComptefin = this.ComboNumCompte[1];
          this._loaderService._hide();
          this.chargementComboSexe();
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.ComboNumCompte[0].SL_RESULTAT
          );
        }
      },
      (error) => {
        this._loaderService._hide();
        this._alertService.WarningAlert(
          'Information!',
          'veuillez reessayer svp ou probleme de connexion avec le serveur !!!'
        );
      }
    );
  }

  chargementComboSexe() {
    let lien_du_service = 'sexe';

    let body = {
      Objet: [{}],
    };

    this._adminService
      .AppelServeur(body, lien_du_service)
      .subscribe((success: any) => {
        this.tab_liste_sexe = success;

        if (this.tab_liste_sexe[0]['SL_RESULTAT'] == 'FALSE') {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.tab_liste_sexe['SL_MESSAGE']
          );
        } else {
          this.tab_liste_sexe = this.tab_liste_sexe[1];
          console.log('tab_liste_sexe', this.tab_liste_sexe);
        }
      });
    (error: any) => {
      this._loaderService._hide();

      this._alertService.ErrorAlert(
        'Erreur!',
        this.tab_liste_sexe['SL_MESSAGE']
      );
    };
  }

  //FIN CHARGEMENTS DES COMBOS*************************************************
  //COMBO DE TRAITEMENT *******************************************************
  SelctDate() {
    if (this.index_etat_select == 'journal') {
      if (this.model_op_edition[6]['valeur'] == undefined) {
        this.model_op_edition[50]['valeur'] = '';
      }
      if (this.model_op_edition[6]['valeur'] == '03') {
        var JT_DATEJOURNEETRAVAIL =
          this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
        this.model_op_edition[50]['valeur'] = JT_DATEJOURNEETRAVAIL.substr(
          3,
          2
        );
        // this.Donnee_de_connexion.JT_DATEJOURNEETRAVAIL.substr(3, 2);
      }
      if (this.model_op_edition[6]['valeur'] == '05') {
        this.model_op_edition[50]['valeur'] = '03';
      }
      if (this.model_op_edition[6]['valeur'] == '06') {
        this.model_op_edition[50]['valeur'] = '06';
      }
      if (this.model_op_edition[6]['valeur'] == '07') {
        this.model_op_edition[50]['valeur'] = '12';
      }
      this.ChangePeriode();
    }
    if (this.index_etat_select == 'grandlivre') {
      if (this.model_op_edition[21]['valeur'] == undefined) {
        this.model_op_edition[51]['valeur'] = '';
      }
      if (this.model_op_edition[21]['valeur'] == '03') {
        var JT_DATEJOURNEETRAVAIL =
          this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
        this.model_op_edition[51]['valeur'] = JT_DATEJOURNEETRAVAIL.substr(
          3,
          2
        );
        // this.Donnee_de_connexion.JT_DATEJOURNEETRAVAIL.substr(3, 2);
      }
      if (this.model_op_edition[21]['valeur'] == '05') {
        this.model_op_edition[51]['valeur'] = '03';
      }
      if (this.model_op_edition[21]['valeur'] == '06') {
        this.model_op_edition[51]['valeur'] = '06';
      }
      if (this.model_op_edition[21]['valeur'] == '07') {
        this.model_op_edition[51]['valeur'] = '12';
      }

      this.ChangePeriode();
    }

    if (this.index_etat_select == 'balance') {
      if (this.model_op_edition[26]['valeur'] == undefined) {
        this.model_op_edition[52]['valeur'] = '';
      }
      if (this.model_op_edition[26]['valeur'] == '03') {
        var JT_DATEJOURNEETRAVAIL =
          this.session_de_connexion['JT_DATEJOURNEETRAVAIL']; //'13/01/2025'
        this.model_op_edition[52]['valeur'] = JT_DATEJOURNEETRAVAIL.substr(
          3,
          2
        );
        // this.Donnee_de_connexion.JT_DATEJOURNEETRAVAIL.substr(3, 2);
      }
      if (this.model_op_edition[26]['valeur'] == '05') {
        this.model_op_edition[52]['valeur'] = '03';
      }
      if (this.model_op_edition[26]['valeur'] == '06') {
        this.model_op_edition[52]['valeur'] = '06';
      }
      if (this.model_op_edition[26]['valeur'] == '07') {
        this.model_op_edition[52]['valeur'] = '12';
      }
      this.ChangePeriode();
    }
  }

  SelctDateInit() {
    if (this.index_etat_select == 'journal') {
      if (this.model_op_edition[6]['valeur'] == undefined) {
        this.model_op_edition[50]['valeur'] = '';
      }
      if (this.model_op_edition[6]['valeur'] == '03') {
        var JT_DATEJOURNEETRAVAIL =
          this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
        this.model_op_edition[50]['valeur'] = JT_DATEJOURNEETRAVAIL.substr(
          3,
          2
        );
        // this.Donnee_de_connexion.JT_DATEJOURNEETRAVAIL.substr(3, 2);
      }
      if (this.model_op_edition[6]['valeur'] == '05') {
        this.model_op_edition[50]['valeur'] = '03';
      }
      if (this.model_op_edition[6]['valeur'] == '06') {
        this.model_op_edition[50]['valeur'] = '06';
      }
      if (this.model_op_edition[6]['valeur'] == '07') {
        this.model_op_edition[50]['valeur'] = '12';
      }

      this.model_op_edition[7]['valeur'] =
        this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
      this.model_op_edition[8]['valeur'] =
        this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
    }

    if (this.index_etat_select == 'grandlivre') {
      if (this.model_op_edition[21]['valeur'] == undefined) {
        this.model_op_edition[51]['valeur'] = '';
      }
      if (this.model_op_edition[21]['valeur'] == '03') {
        var JT_DATEJOURNEETRAVAIL =
          this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
        this.model_op_edition[51]['valeur'] = JT_DATEJOURNEETRAVAIL.substr(
          3,
          2
        );
        // this.Donnee_de_connexion.JT_DATEJOURNEETRAVAIL.substr(3, 2);
      }
      if (this.model_op_edition[21]['valeur'] == '05') {
        this.model_op_edition[51]['valeur'] = '03';
      }
      if (this.model_op_edition[21]['valeur'] == '06') {
        this.model_op_edition[51]['valeur'] = '06';
      }
      if (this.model_op_edition[21]['valeur'] == '07') {
        this.model_op_edition[51]['valeur'] = '12';
      }

      this.model_op_edition[22]['valeur'] =
        this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
      this.model_op_edition[23]['valeur'] =
        this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
    }

    if (this.index_etat_select == 'balance') {
      if (this.model_op_edition[26]['valeur'] == undefined) {
        this.model_op_edition[52]['valeur'] = '';
      }
      if (this.model_op_edition[26]['valeur'] == '03') {
        var JT_DATEJOURNEETRAVAIL =
          this.session_de_connexion['JT_DATEJOURNEETRAVAIL']; //'13/01/2025'
        this.model_op_edition[52]['valeur'] = JT_DATEJOURNEETRAVAIL.substr(
          3,
          2
        );
        // this.Donnee_de_connexion.JT_DATEJOURNEETRAVAIL.substr(3, 2);
      }
      if (this.model_op_edition[26]['valeur'] == '05') {
        this.model_op_edition[52]['valeur'] = '03';
      }
      if (this.model_op_edition[26]['valeur'] == '06') {
        this.model_op_edition[52]['valeur'] = '06';
      }
      if (this.model_op_edition[26]['valeur'] == '07') {
        this.model_op_edition[52]['valeur'] = '12';
      }
      this.model_op_edition[27]['valeur'] =
        this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
      this.model_op_edition[28]['valeur'] =
        this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
    }

    if (this.index_etat_select == 'etatformproduit') {
      if (this.model_op_edition[45]['valeur'] == undefined) {
        this.model_op_edition[54]['valeur'] = '';
      }
      if (this.model_op_edition[45]['valeur'] == '03') {
        var JT_DATEJOURNEETRAVAIL =
          this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
        this.model_op_edition[54]['valeur'] = JT_DATEJOURNEETRAVAIL.substr(
          3,
          2
        );
      }
      if (this.model_op_edition[45]['valeur'] == '05') {
        this.model_op_edition[54]['valeur'] = '03';
      }
      if (this.model_op_edition[45]['valeur'] == '06') {
        this.model_op_edition[54]['valeur'] = '06';
      }
      if (this.model_op_edition[45]['valeur'] == '07') {
        this.model_op_edition[54]['valeur'] = '12';
      }

      this.model_op_edition[46][
        'valeur'
      ] = `01/${this.model_op_edition[54]['valeur']}/${this.model_op_edition[44]['valeur']}`;
      this.model_op_edition[47]['valeur'] =
        this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
    }

    if (this.index_etat_select == 'etatformcharge') {
      if (this.model_op_edition[39]['valeur'] == undefined) {
        this.model_op_edition[53]['valeur'] = '';
      }
      if (this.model_op_edition[39]['valeur'] == '03') {
        var JT_DATEJOURNEETRAVAIL =
          this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
        this.model_op_edition[53]['valeur'] = JT_DATEJOURNEETRAVAIL.substr(
          3,
          2
        );
      }
      if (this.model_op_edition[39]['valeur'] == '05') {
        this.model_op_edition[53]['valeur'] = '03';
      }
      if (this.model_op_edition[39]['valeur'] == '06') {
        this.model_op_edition[53]['valeur'] = '06';
      }
      if (this.model_op_edition[39]['valeur'] == '07') {
        this.model_op_edition[53]['valeur'] = '12';
      }

      this.model_op_edition[40][
        'valeur'
      ] = `01/${this.model_op_edition[53]['valeur']}/${this.model_op_edition[38]['valeur']}`;
      this.model_op_edition[41]['valeur'] =
        this.session_de_connexion['JT_DATEJOURNEETRAVAIL'];
    }
  }

  chargementComboPeriodeInit(CodePeriodicite: any) {
    let Option = 'pvgComboperiode';
    let body = {
      Objet: [
        {
          PE_CODEPERIODICITE: CodePeriodicite,
        },
      ],
    };
    this._loaderService._show();
    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ComboPeriode = success;
        this._loaderService._hide();

        if (this.ComboPeriode[0].SL_RESULTAT == 'TRUE') {
          this.ComboPeriode = this.ComboPeriode[1];

          if (this.index_etat_select == 'journal') {
            this.model_op_edition[50]['valeur'] = '';
            this.model_op_edition[7]['valeur'] = '';
            this.model_op_edition[8]['valeur'] = '';
          }

          if (this.index_etat_select == 'grandlivre') {
            this.model_op_edition[51]['valeur'] = '';
            this.model_op_edition[22]['valeur'] = '';
            this.model_op_edition[23]['valeur'] = '';
          }

          if (this.index_etat_select == 'balance') {
            this.model_op_edition[52]['valeur'] = '';
            this.model_op_edition[27]['valeur'] = '';
            this.model_op_edition[28]['valeur'] = '';
          }

          this.SelctDateInit();
        } else {
          this._loaderService._hide();
        }
      },
      (error) => {
        this._loaderService._hide();
        this._alertService.WarningAlert(
          'Information!',
          'veuillez reessayer svp ou probleme de connexion avec le serveur !!!'
        );
      }
    );
  }
  chargementComboPeriode(CodePeriodicite: any) {
    let Option = 'pvgComboperiode';
    let body = {
      Objet: [
        {
          PE_CODEPERIODICITE: CodePeriodicite,
        },
      ],
    };
    this._loaderService._show();
    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ComboPeriode = success;
        this._loaderService._hide();

        if (this.ComboPeriode[0].SL_RESULTAT == 'TRUE') {
          this.ComboPeriode = this.ComboPeriode[1];
          if (this.index_etat_select == 'journal') {
            this.model_op_edition[50]['valeur'] = '';
            this.model_op_edition[7]['valeur'] = '';
            this.model_op_edition[8]['valeur'] = '';
          }
          if (this.index_etat_select == 'grandlivre') {
            this.model_op_edition[51]['valeur'] = '';
            this.model_op_edition[22]['valeur'] = '';
            this.model_op_edition[23]['valeur'] = '';
          }

          if (this.index_etat_select == 'balance') {
            this.model_op_edition[52]['valeur'] = '';
            this.model_op_edition[27]['valeur'] = '';
            this.model_op_edition[28]['valeur'] = '';
          }
          this.SelctDate();
        } else {
          this._loaderService._hide();
        }
      },
      (error) => {
        this._loaderService._hide();
        this._alertService.WarningAlert(
          'Information!',
          'veuillez reessayer svp ou probleme de connexion avec le serveur !!!'
        );
      }
    );
  }

  ChangePeriode() {
    let Option = 'pvgPeriodiciteDateDebutFin';
    let body = {};
    if (this.index_etat_select == 'journal') {
      body = {
        Objet: [
          {
            EX_EXERCICE: this.model_op_edition[5]['valeur'],
            MO_CODEMOIS: this.model_op_edition[50]['valeur'],
            PE_CODEPERIODICITE: this.model_op_edition[6]['valeur'],
          },
        ],
      };
    }

    if (this.index_etat_select == 'grandlivre') {
      body = {
        Objet: [
          {
            EX_EXERCICE: this.model_op_edition[20]['valeur'],
            MO_CODEMOIS: this.model_op_edition[51]['valeur'],
            PE_CODEPERIODICITE: this.model_op_edition[21]['valeur'],
          },
        ],
      };
    }

    if (this.index_etat_select == 'balance') {
      body = {
        Objet: [
          {
            EX_EXERCICE: this.model_op_edition[25]['valeur'],
            MO_CODEMOIS: this.model_op_edition[52]['valeur'],
            PE_CODEPERIODICITE: this.model_op_edition[26]['valeur'],
          },
        ],
      };
    }

    this._loaderService._show();
    this._adminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ComboPeriodiciteDateDebutFin = success;
        this._loaderService._hide();
        if (this.ComboPeriodiciteDateDebutFin[0].SL_RESULTAT == 'TRUE') {
          this.ComboPeriodiciteDateDebutFin =
            this.ComboPeriodiciteDateDebutFin[1];
          if (this.index_etat_select == 'journal') {
            this.model_op_edition[7]['valeur'] =
              this.ComboPeriodiciteDateDebutFin[0].MO_DATEDEBUT;
            this.model_op_edition[8]['valeur'] =
              this.ComboPeriodiciteDateDebutFin[0].MO_DATEFIN;
          }

          if (this.index_etat_select == 'grandlivre') {
            this.model_op_edition[22]['valeur'] =
              this.ComboPeriodiciteDateDebutFin[0].MO_DATEDEBUT;
            this.model_op_edition[23]['valeur'] =
              this.ComboPeriodiciteDateDebutFin[0].MO_DATEFIN;
          }

          if (this.index_etat_select == 'balance') {
            this.model_op_edition[27]['valeur'] =
              this.ComboPeriodiciteDateDebutFin[0].MO_DATEDEBUT;
            this.model_op_edition[28]['valeur'] =
              this.ComboPeriodiciteDateDebutFin[0].MO_DATEFIN;
          }
        } else {
          this._loaderService._hide();
          this._alertService.WarningAlert(
            'Information!',
            this.ComboPeriodiciteDateDebutFin[0].SL_RESULTAT
          );
        }
      },
      (error) => {
        this._loaderService._hide();
        this._alertService.WarningAlert(
          'Information!',
          'veuillez reessayer svp ou probleme de connexion avec le serveur !!!'
        );
      }
    );
  }
  //FIN COMBO TRAITEMENT ******************************************************
  AnnulerAction() {
    this.Initialisation('AnnulerAction');
  }

  ngOnInit(): void {
    this.Initialisation('ngOnInit');
    this.chargementComboAgence();
  }

  ngAfterViewInit() {}
}
