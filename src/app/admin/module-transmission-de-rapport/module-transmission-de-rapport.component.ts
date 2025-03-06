import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ThemeService } from 'src/app/services/theme.service';
import { ToolsService } from 'src/app/services/tools.service';
import { AdminService } from '../admin.service';
import { HeaderMenuComponent } from '../includes/header-menu/header-menu.component';

@Component({
  selector: 'app-module-transmission-de-rapport',
  templateUrl: './module-transmission-de-rapport.component.html',
  styleUrls: ['./module-transmission-de-rapport.component.scss'],
})
export class ModuleTransmissionDeRapportComponent {
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

  AllerALenvoi() {
    this._router.navigate(['/admin/invoice/transmission_de_rapport']);
  }

  ngOnInit(): void {
    this._loaderService._show();
    // appel de service
    this._loaderService._hide();
  }
}
