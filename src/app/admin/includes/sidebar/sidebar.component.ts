import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { ThemeService } from 'src/app/services/theme.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ToolsService } from 'src/app/services/tools.service';
import { HeaderMenuComponent } from '../header-menu/header-menu.component';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(
    public _adminService: AdminService,
    private _router: Router,
    private _alertService: AlertService,
    private _notificationService: NotificationService,
    public _toolsService: ToolsService,
    public _loaderService: LoaderService,
    private _themeService: ThemeService,
    private _headerMenuComponent: HeaderMenuComponent
  ) {}

  @Input() current_menu: string = '';
  current_menu_precedent: any = '';
  tab_id_menu: any = [
    'idDashboard',
    'idGestClient',
    'idGestBien',
    'idGestContrat',
    'idGestComptabilite',
    'idEdition',
  ];
  @Input() isActive: boolean = false;
  isSubmenuOpen: boolean = false;
  isSubmenuOpenPatient: boolean = false;
  isSubmenuOpenGuichet: boolean = false;
  MenuRoutersimple(module: any) {
    if (module == 'mod_patientAnnuler') {
      this._router.navigate(['/admin/FactureAnnuler']);
    }
  }
  MenuRouter(module: any, id_module: any) {
    // Toggle submenu only for 'mod_comptabilite'
    if (module === 'mod_comptabilite') {
      this.isSubmenuOpen = !this.isSubmenuOpen;
    }
    if (module === 'mod_Guichet') {
      this.isSubmenuOpenGuichet = !this.isSubmenuOpenGuichet;
    }
    if (module === 'mod_patientAnnul') {
      this.isSubmenuOpenPatient = !this.isSubmenuOpenPatient;
    }

    this._adminService.active_menu_de_gauche =
      !this._adminService.active_menu_de_gauche;

    if (module == 'mod_dashboard') {
      this._router.navigate(['/admin/dashboard']);
    }

    if (module == 'mod_patient') {
      this._router.navigate(['/admin/patient']);
    }

    if (module == 'mod_CreationPatient') {
      this._router.navigate(['/admin/CreationPatient']);
    }

    if (module == 'mod_edition') {
      this._router.navigate(['/admin/edition']);
    }

    if (module == 'mod_trans_rapport') {
      this._router.navigate(['/admin/transmission/rapport']);
    }

    if (module == 'logout') {
      sessionStorage.clear();
      localStorage.clear();
      window.location.reload();
      // window.location.href = '/auth';
    }
  }

  SousMenuRouter(module: any, id_module: any) {
    if (module == 'mod_Guichet') {
      this._router.navigate(['/admin/Guichet/GuichetVersement']);
    }
    if (module == 'mod_guichet_op_caisse') {
      this._router.navigate(['/admin/guichet/operation_caisse']);
    }
    if (module == 'mod_guichet_reedition') {
      this._router.navigate(['/admin/guichet/reedition']);
    }
    if (module == 'mod_guichet_arreter_caisse') {
      this._router.navigate(['/admin/guichet/arreter_caisse']);
    }

    if (module == 'mod_compta_Extourne') {
      this._router.navigate(['/admin/comptabilite/ExtourneOperation']);
    }
    if (module == 'mod_compta_od_ord') {
      this._router.navigate(['/admin/comptabilite/od_ordinaire']);
    }
    if (module == 'mod_compta_od_auto') {
      this._router.navigate(['/admin/comptabilite/od_automatique']);
    }
  }

  RunOnInit() {
    setTimeout(() => {
      const savedTheme = this._themeService._avoirLeTheme();

      // @ts-ignore
      this.tab_id_menu.forEach((element) => {
        $(`#${element}`).css('background-color', 'transparent');
      });

      if (savedTheme == 'dark') {
        // @ts-ignore
        this.tab_id_menu.forEach((element) => {
          if (element == this.current_menu)
            $(`#${element}`).css('background-color', '#99bff0');
        });

        $(`#id_section_menu_left`).css('background-color', '#0d1b2a');
      } else {
        // @ts-ignore
        this.tab_id_menu.forEach((element) => {
          if (element == this.current_menu)
            $(`#${element}`).css('background-color', '#B87333');
        });

        $(`#id_section_menu_left`).css('background-color', '#1f4b43');
      }
    }, 1000);
  }

  ngOnInit(): void {
    // abonnement a levenement pour reagir lorsque la fonction est appelee
    this._themeService.triggerNgOnInit$.subscribe(() => {
      this.RunOnInit();
    });

    // initialisation normale
    this.RunOnInit();
  }

  /* ngOnInit(): void {
    setTimeout(() => {
      const savedTheme = this._themeService._avoirLeTheme();
      if (savedTheme == 'dark')
        $(`#${this.current_menu}`).css('background-color', '#99bff0');
      else $(`#${this.current_menu}`).css('background-color', '#B87333');
    }, 1000);
  } */
}
