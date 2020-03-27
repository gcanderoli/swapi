import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SwapiService } from '../services/swapi.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  filmData;
  charactersURLS;
  charactersData;
  charactersObservables = [];
  filmID: string;

  charactersList = [];
  pagination = [];
  eyeColor = [];
  genderArray = [];
  currentList = [];

  constructor(private swapiservice: SwapiService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.filmID = this.route.snapshot.params['id'];

    this.swapiservice.getFilm(this.filmID).subscribe(
      (res: any) => {
        this.filmData = res;
        this.charactersURLS = res.characters;

        this.charactersURLS.forEach(
          url => this.charactersObservables.push(this.swapiservice.getCharacter(url))
        );

        this.swapiservice.getAllCharacters(this.charactersObservables).subscribe(
          res => {
            this.paginate(0, 10, res),
              this.charactersData = res,
              this.currentList = this.charactersData,
              this.getValuesToFilter(res);
          }
        );
      }
    );
  }

  paginate(selectedPage, elementsPerPage, arrayToFilter) {
    const totalPages = Math.floor(arrayToFilter.length / elementsPerPage);
    const pagination = []
    const indexMin = selectedPage * elementsPerPage;
    const indexMax = indexMin + elementsPerPage;
    const filteredArray = arrayToFilter.filter(
      (x, index) => index >= indexMin && index < indexMax
    );
    for (let i = 0; i <= totalPages; i++) {
      pagination.push(i);
    }

    this.pagination = pagination;
    this.charactersList = filteredArray;
  }

  getValuesToFilter(array) {
    array.forEach(element => {
      if (this.eyeColor.indexOf(element.eye_color) < 0) {
        this.eyeColor.push(element.eye_color)
      }
    });
    array.forEach(element => {
      if (this.genderArray.indexOf(element.gender) < 0) {
        this.genderArray.push(element.gender)
      }
    });
  }

  filterBy(value) {
    this.currentList = this.charactersData.filter(element => element.eye_color === value || element.gender === value);
    this.paginate(0, 10, this.currentList)
  }
}
