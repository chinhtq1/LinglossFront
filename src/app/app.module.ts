import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ru_RU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AppRoutingModule } from './app-routing.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { HomeComponent } from './components/home/home.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { LoginComponent } from './components/login/login.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { SearchComponent } from './components/search/search.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { DisciplineComponent } from './components/discipline/discipline.component';
import { NavigationStackComponent } from './components/navigation-stack/navigation-stack.component';

registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    HomeComponent,
    AuthorizationComponent,
    LoginComponent,
    SearchComponent,
    PasswordResetComponent,
    DisciplineComponent,
    NavigationStackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzFormModule,
    NzInputModule,
    NzPageHeaderModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NzModalModule,
    NzButtonModule,
    NzMenuModule,
    NzLayoutModule,
    NzTypographyModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzSelectModule,
    NzCheckboxModule,
    NzTabsModule,
    NzDropDownModule
  ],
  providers: [{ provide: NZ_I18N, useValue: ru_RU }],
  bootstrap: [AppComponent]
})
export class AppModule { }
