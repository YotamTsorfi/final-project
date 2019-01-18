import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Ranger } from './ranger';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class RangerService {

  private rangersUrl = "http://localhost:3000/api/rangers/";  // URL to web api

  constructor(
    private http: HttpClient) { }

  /** GET rangers from the server */
  getRangers (): Observable<Ranger[]> {
    return this.http.get<Ranger[]>(this.rangersUrl)
      .pipe(
        catchError(this.handleError('getRangers', []))
      );
  }

  /** GET ranger by id. Return `undefined` when id not found */
  getRangerNo404<Data>(id: number): Observable<Ranger> {
    const url = `${this.rangersUrl}/?id=${id}`;
    return this.http.get<Ranger[]>(url)
      .pipe(
        map(rangers => rangers[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
        }),
        catchError(this.handleError<Ranger>(`getRanger id=${id}`))
      );
  }

  /** GET Ranger by id. Will 404 if id not found */
  getBook(id: number): Observable<Ranger> {
    const url = `${this.rangersUrl}/${id}`;
    return this.http.get<Ranger>(url).pipe(
      catchError(this.handleError<Ranger>(`getRanger id=${id}`))
    );
  }
  
    /** POST: report num of trees to the server*/
    reportTrees (ranger: Ranger): Observable<Ranger> {
      const reportTreesUrl = "http://localhost:3000/api/ranger";
      
      console.log("post report trees");
      return this.http.post<Ranger>('http://localhost:3000/api/ranger', ranger, httpOptions).pipe(
        catchError(this.handleError<Ranger>('report num of trees'))
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
