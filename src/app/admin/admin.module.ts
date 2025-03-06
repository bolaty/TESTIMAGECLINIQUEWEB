import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ToastrModule } from 'ngx-toastr';
import { SidebarComponent } from './includes/sidebar/sidebar.component';
import { HeaderMenuComponent } from './includes/header-menu/header-menu.component';
import { FooterMenuComponent } from './includes/footer-menu/footer-menu.component';
import { EnteteInvoiceComponent } from './includes/entete-invoice/entete-invoice.component';
import { PiedDePageInvoiceComponent } from './includes/pied-de-page-invoice/pied-de-page-invoice.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { LangueService } from '../services/langue.service';
import { ThemeToggleDirective } from './theme-toggle.directive';
import { DetectionDeviceAdminDirective } from './detection-device-admin.directive';
import { NavigationMenuComponent } from './includes/navigation-menu/navigation-menu.component';
import { CopyrightComponent } from './includes/copyright/copyright.component';
import { ImageSrcDirective } from './image-src.directive';
import { ModulePatientComponent } from './module-patient/module-patient.component';
import { ModuleEditionComponent } from './module-edition/module-edition.component';
import { ModuleOperationDeCaisseComponent } from './module-operation-de-caisse/module-operation-de-caisse.component';
import { ModuleReeditionComponent } from './module-reedition/module-reedition.component';
import { ModuleArreterDeCaisseComponent } from './module-arreter-de-caisse/module-arreter-de-caisse.component';
import { ModuleTransmissionDeRapportComponent } from './module-transmission-de-rapport/module-transmission-de-rapport.component';
import { EtatListePaiementsComponent } from './includes/invoices/etat-liste-paiements/etat-liste-paiements.component';
import { BrouillardCaisseComponent } from './includes/invoices/brouillard-caisse/brouillard-caisse.component';
import { EtatPointParActeComponent } from './includes/invoices/etat-point-par-acte/etat-point-par-acte.component';
import { CreationOperateurComponent } from './includes/parametres/creation-operateur/creation-operateur.component';
import { CreationProfilComponent } from './includes/parametres/creation-profil/creation-profil.component';
import { AgenceComponent } from './includes/parametres/agence/agence.component';
import { EmailContactComponent } from './includes/parametres/email-contact/email-contact.component';
import { JourneeDeTravailComponent } from './includes/parametres/journee-de-travail/journee-de-travail.component';
import { LanguesComponent } from './includes/parametres/langues/langues.component';
import { ParametreMenuLinkComponent } from './includes/parametres/parametre-menu-link/parametre-menu-link.component';
import { ParametrageComponent } from './includes/parametres/parametrage/parametrage.component';
import { DatetimepickerDirective } from './datetimepicker.directive';
import { EtatFormationComponent } from './includes/invoices/etat-formation/etat-formation.component';
import { EnvoiDeRapportComponent } from './includes/invoices/envoi-de-rapport/envoi-de-rapport.component';
import { JournalComponent } from './includes/invoices/journal/journal.component';
import { GrandLivreComponent } from './includes/invoices/grand-livre/grand-livre.component';
import { BalanceComponent } from './includes/invoices/balance/balance.component';
import { EtatListePatientsComponent } from './includes/invoices/etat-liste-patients/etat-liste-patients.component';
import { RecuComponent } from './includes/invoices/recu/recu.component';
import { EnteteRecuComponent } from './includes/entete-recu/entete-recu.component';
import { PiedRecuComponent } from './includes/pied-recu/pied-recu.component';
import { SoldeCompteComponent } from './includes/invoices/solde-compte/solde-compte.component';
import { HistoriqueFactureComponent } from './includes/invoices/historique-facture/historique-facture.component';
import { AntecedentPatientComponent } from './includes/invoices/antecedent-patient/antecedent-patient.component';
import { ModuleFactureAnnulerComponent } from './module-facture-annuler/module-facture-annuler.component';
import { ModuleExtourneOperationComponent } from './module-extourne-operation/module-extourne-operation.component';
import { ModuleCreationPatientComponent } from './module-creation-patient/module-creation-patient.component';
import { ModuleGuichetVersementComponent } from './module-guichet-versement/module-guichet-versement.component';
import { ModuleOdOrdinaireComponent } from './module-od-ordinaire/module-od-ordinaire.component';
import { ModuleOdAutomatiqueComponent } from './module-od-automatique/module-od-automatique.component';

// Fonction qui charge les fichiers JSON de langue
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    HeaderMenuComponent,
    FooterMenuComponent,
    EnteteInvoiceComponent,
    PiedDePageInvoiceComponent,
    LoaderComponent,
    ThemeToggleDirective,
    DetectionDeviceAdminDirective,
    NavigationMenuComponent,
    CopyrightComponent,
    ImageSrcDirective,
    ModulePatientComponent,
    ModuleEditionComponent,
    ModuleOperationDeCaisseComponent,
    ModuleReeditionComponent,
    ModuleArreterDeCaisseComponent,
    ModuleTransmissionDeRapportComponent,
    EtatListePaiementsComponent,
    BrouillardCaisseComponent,
    EtatPointParActeComponent,
    CreationOperateurComponent,
    CreationProfilComponent,
    AgenceComponent,
    EmailContactComponent,
    JourneeDeTravailComponent,
    LanguesComponent,
    ParametreMenuLinkComponent,
    ParametrageComponent,
    DatetimepickerDirective,
    EtatFormationComponent,
    EnvoiDeRapportComponent,
    JournalComponent,
    GrandLivreComponent,
    BalanceComponent,
    EtatListePatientsComponent,
    RecuComponent,
    EnteteRecuComponent,
    PiedRecuComponent,
    SoldeCompteComponent,
    HistoriqueFactureComponent,
    AntecedentPatientComponent,
    ModuleFactureAnnulerComponent,
    ModuleExtourneOperationComponent,
    ModuleCreationPatientComponent,
    ModuleGuichetVersementComponent,
    ModuleOdOrdinaireComponent,
    ModuleOdAutomatiqueComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    // BrowserAnimationsModule,
    ToastrModule.forRoot({
      // configuration options here
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [LangueService, HeaderMenuComponent, SidebarComponent],
})
export class AdminModule {}
