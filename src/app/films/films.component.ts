import { Component, OnInit } from '@angular/core';

import { SwapiService } from '../services/swapi.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {

  filmsData;

  constructor(private swapiservice: SwapiService) { }

  ngOnInit(): void {

    this.swapiservice.getAllFilms().subscribe(
      (res: any) => {
        this.filmsData = res.results;
      }
    );
  }
}
