import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Bike } from './objects/Bike';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({ providedIn: 'root' })
export class BikesService {

  private bikesUrl = "http://localhost:3000/api/transport/bikes";  // URL to web api

  constructor(
    private http: HttpClient) { }

  /** GET rangers from the server */
  getBikes (): Observable<Bike[]> {
    return this.http.get<Bike[]>(this.bikesUrl)
      .pipe(
        catchError(this.handleError('getBikes', []))
      );
  }

   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead
      console.log(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
