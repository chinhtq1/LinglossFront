import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DisciplineComponent } from './components/discipline/discipline.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {path: '', redirectTo: 'start', pathMatch: 'full'},
  {path: 'start', component: MainComponent},
  {path: 'discipline/:name', component: DisciplineComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
