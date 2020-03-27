import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilmsComponent } from './films/films.component';
import { CharactersComponent } from "./characters/characters.component";

const routes: Routes = [
  {
    path: '',
    component: FilmsComponent
  },
  {
    path: 'films',
    component: FilmsComponent
  },
  {
    path: 'film-characters/:id',
    component: CharactersComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
