import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModulePatientComponent } from './module-patient/module-patient.component';
import { ModuleEditionComponent } from './module-edition/module-edition.component';
import { ModuleOperationDeCaisseComponent } from './module-operation-de-caisse/module-operation-de-caisse.component';
import { ModuleReeditionComponent } from './module-reedition/module-reedition.component';
import { ModuleArreterDeCaisseComponent } from './module-arreter-de-caisse/module-arreter-de-caisse.component';
import { EtatListePaiementsComponent } from './includes/invoices/etat-liste-paiements/etat-liste-paiements.component';
import { BrouillardCaisseComponent } from './includes/invoices/brouillard-caisse/brouillard-caisse.component';
import { EtatPointParActeComponent } from './includes/invoices/etat-point-par-acte/etat-point-par-acte.component';
import { CreationOperateurComponent } from './includes/parametres/creation-operateur/creation-operateur.component';
import { AgenceComponent } from './includes/parametres/agence/agence.component';
import { CreationProfilComponent } from './includes/parametres/creation-profil/creation-profil.component';
import { EmailContactComponent } from './includes/parametres/email-contact/email-contact.component';
import { JourneeDeTravailComponent } from './includes/parametres/journee-de-travail/journee-de-travail.component';
import { LanguesComponent } from './includes/parametres/langues/langues.component';
import { ParametrageComponent } from './includes/parametres/parametrage/parametrage.component';
import { ModuleTransmissionDeRapportComponent } from './module-transmission-de-rapport/module-transmission-de-rapport.component';
import { EtatFormationComponent } from './includes/invoices/etat-formation/etat-formation.component';
import { EnvoiDeRapportComponent } from './includes/invoices/envoi-de-rapport/envoi-de-rapport.component';
import { JournalComponent } from './includes/invoices/journal/journal.component';
import { GrandLivreComponent } from './includes/invoices/grand-livre/grand-livre.component';
import { BalanceComponent } from './includes/invoices/balance/balance.component';
import { EtatListePatientsComponent } from './includes/invoices/etat-liste-patients/etat-liste-patients.component';
import { RecuComponent } from './includes/invoices/recu/recu.component';
import { SoldeCompteComponent } from './includes/invoices/solde-compte/solde-compte.component';
import { HistoriqueFactureComponent } from './includes/invoices/historique-facture/historique-facture.component';
import { AntecedentPatientComponent } from './includes/invoices/antecedent-patient/antecedent-patient.component';
import { ModuleFactureAnnulerComponent } from './module-facture-annuler/module-facture-annuler.component';
import { ModuleExtourneOperationComponent } from './module-extourne-operation/module-extourne-operation.component';
import { ModuleCreationPatientComponent } from './module-creation-patient/module-creation-patient.component';
import { ModuleGuichetVersementComponent } from './module-guichet-versement/module-guichet-versement.component';
import { ModuleOdOrdinaireComponent } from './module-od-ordinaire/module-od-ordinaire.component';
import { ModuleOdAutomatiqueComponent } from './module-od-automatique/module-od-automatique.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      // dashboard
      { path: 'dashboard', component: DashboardComponent },

      // patient
      { path: 'patient', component: ModulePatientComponent },

      // Creation Patient
      { path: 'CreationPatient', component: ModuleCreationPatientComponent },

      // Facture Annuler
      { path: 'FactureAnnuler', component: ModuleFactureAnnulerComponent },

      // edition
      { path: 'edition', component: ModuleEditionComponent },

      // Guichet
      {
        path: 'Guichet/GuichetVersement',
        component: ModuleGuichetVersementComponent,
      },
      {
        path: 'guichet/operation_caisse',
        component: ModuleOperationDeCaisseComponent,
      },
      { path: 'guichet/reedition', component: ModuleReeditionComponent },
      {
        path: 'guichet/arreter_caisse',
        component: ModuleArreterDeCaisseComponent,
      },

      // comptabilite
      {
        path: 'comptabilite/ExtourneOperation',
        component: ModuleExtourneOperationComponent,
      },
      {
        path: 'comptabilite/od_ordinaire',
        component: ModuleOdOrdinaireComponent,
      },
      {
        path: 'comptabilite/od_automatique',
        component: ModuleOdAutomatiqueComponent,
      },

      // edition
      {
        path: 'transmission/rapport',
        component: ModuleTransmissionDeRapportComponent,
      },

      // parametres
      {
        path: 'parametres/creation_operateur',
        component: CreationOperateurComponent,
      },
      {
        path: 'parametres/agence',
        component: AgenceComponent,
      },
      {
        path: 'parametres/profil',
        component: CreationProfilComponent,
      },
      {
        path: 'parametres/service',
        component: EmailContactComponent,
      },
      {
        path: 'parametres/journee_de_travail',
        component: JourneeDeTravailComponent,
      },
      {
        path: 'parametres/langues',
        component: LanguesComponent,
      },
      {
        path: 'parametres/parametrages',
        component: ParametrageComponent,
      },

      // invoice
      {
        path: 'invoice/etat_liste_paiements',
        component: EtatListePaiementsComponent,
      },
      {
        path: 'invoice/brouillard_de_caisse',
        component: BrouillardCaisseComponent,
      },
      {
        path: 'invoice/etat_point_par_acte',
        component: EtatPointParActeComponent,
      },
      {
        path: 'invoice/etat_de_formation',
        component: EtatFormationComponent,
      },
      {
        path: 'invoice/transmission_de_rapport',
        component: EnvoiDeRapportComponent,
      },
      {
        path: 'invoice/journal',
        component: JournalComponent,
      },
      {
        path: 'invoice/grand_livre',
        component: GrandLivreComponent,
      },
      {
        path: 'invoice/balance',
        component: BalanceComponent,
      },
      {
        path: 'invoice/liste_des_patients',
        component: EtatListePatientsComponent,
      },
      {
        path: 'invoice/recu',
        component: RecuComponent,
      },
      {
        path: 'invoice/solde_compte',
        component: SoldeCompteComponent,
      },
      {
        path: 'invoice/historique_facture',
        component: HistoriqueFactureComponent,
      },
      {
        path: 'invoice/antecedent_patient',
        component: AntecedentPatientComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
