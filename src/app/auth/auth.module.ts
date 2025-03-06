import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ModifPasswordComponent } from './modif-password/modif-password.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { LangueService } from '../services/langue.service';
import { DetectionDeviceAuthDirective } from './detection-device-auth.directive';

// Fonction qui charge les fichiers JSON de langue
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    LoginComponent,
    LoaderComponent,
    ChangePasswordComponent,
    ModifPasswordComponent,
    DetectionDeviceAuthDirective,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
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
  providers: [LangueService],
})
export class AuthModule {}
