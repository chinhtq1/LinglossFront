import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DisciplineComponent } from './components/discipline/discipline.component';
import { MainComponent } from './components/main/main.component';
import { DisciplinesComponent } from './components/disciplines/disciplines.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { AboutComponent } from './components/about/about.component';
import {NetworkComponent} from './components/network/network.component';
import {TermComponent} from './components/term/term.component';

const routes: Routes = [
  {path: '', redirectTo: 'start', pathMatch: 'full'},
  {path: 'start', component: MainComponent},
  {path: 'disciplines/:name', component: DisciplineComponent},
  {path: 'disciplines/:name/:name', component: TermComponent}, // first parameter is discipline name, second is term name
  {path: 'disciplines', component: DisciplinesComponent},
  {path: 'preferences', component: PreferencesComponent},
  {path: 'about', component: AboutComponent},
  {path: 'network', component: NetworkComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
