import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { ThemeService } from 'src/app/services/theme.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  constructor(
    public _adminService: AdminService,
    private _router: Router,
    private _themeService: ThemeService,
    public _toolsService: ToolsService
  ) {}

  session_de_connexion: any = JSON.parse(
    sessionStorage.getItem('donnee_de_connexion') || '{}'
  );

  show: boolean = false; // permet dafficher soit le linfo soit les activites recente

  ngOnInit(): void {}

  ngAfterViewInit() {
    // Appliquer le thème sauvegardé lors du chargement de l'application
    const savedTheme = this._themeService._avoirLeTheme();
    this._themeService._appliquerLeTheme(savedTheme, false);
  }
}
