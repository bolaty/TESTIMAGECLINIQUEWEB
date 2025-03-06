import { Component, Input } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ThemeService } from 'src/app/services/theme.service';
import { ToolsService } from 'src/app/services/tools.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss'],
})
export class CopyrightComponent {
  constructor(
    public _toolsService: ToolsService,
    public _adminService: AdminService,
    public _alertService: AlertService,
    public _loaderService: LoaderService,
    private _themeService: ThemeService
  ) {}

  @Input() entreprise: string = '';
  annee_copyright: any = this._toolsService._avoirLaDateDuJour('a');
}
