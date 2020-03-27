import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';

import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(private httpClient: HttpClient) { }

  baseURL = 'https://swapi.co/api/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  public getAllFilms() {
    return this.httpClient.get(this.baseURL + 'films', this.httpOptions);
  }

  public getFilm(filmID) {
    return this.httpClient.get(this.baseURL + 'films/' + filmID, this.httpOptions);
  }

  public getCharacter(urlCharacter) {
    return this.httpClient.get(urlCharacter, this.httpOptions);
  }

  public getAllCharacters(obsArray) {
    return forkJoin(obsArray)
  }
}
