import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DisciplineComponent } from './components/discipline/discipline.component';
import { MainComponent } from './components/main/main.component';
import { DisciplinesComponent } from './components/disciplines/disciplines.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {path: '', redirectTo: 'start', pathMatch: 'full'},
  {path: 'start', component: MainComponent},
  {path: 'disciplines/:name', component: DisciplineComponent},
  {path: 'disciplines', component: DisciplinesComponent},
  {path: 'preferences', component: PreferencesComponent},
  {path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
