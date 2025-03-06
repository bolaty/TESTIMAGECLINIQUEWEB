import { Component } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ThemeService } from 'src/app/services/theme.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-solde-compte',
  templateUrl: './solde-compte.component.html',
  styleUrls: ['./solde-compte.component.scss'],
})
export class SoldeCompteComponent {
  constructor(
    public _toolsService: ToolsService,
    public _adminService: AdminService,
    public _alertService: AlertService,
    public _loaderService: LoaderService,
    private _themeService: ThemeService
  ) {}

  type_de_compte: string = '';
  nouveau_solde: any = 0;
  session_solde: any = JSON.parse(
    sessionStorage.getItem('et_solde_compte') || '[]'
  );
  ImprimerLetat() {
    window.print();
  }

  ngOnInit(): void {
    if (this.session_solde[0]['PL_TYPECOMPTE'] == 'C')
      this.type_de_compte = 'COMPTE COURANT';
    if (this.session_solde[0]['PL_TYPECOMPTE'] == 'I')
      this.type_de_compte = 'COMPTE INDIVIDUEL';

    //@ts-ignore
    this.session_solde.forEach((element, idx) => {
      if (idx == this.session_solde.length - 1) {
        this.nouveau_solde = element['SOLDE'];
      }
    });

    //@ts-ignore
    this.session_solde.forEach((element) => {
      //@ts-ignore
      if (element['MC_HEUREACTION'])
        element['MC_HEUREACTION'] = this._toolsService._getHeure(
          element.MC_HEUREACTION,
          'hms'
        );
    });

    console.log('session_solde', this.session_solde);
  }
}
