import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WhatService {
  whatUrl = 'http://mariner.whatbox.ca:11720/jtree/';

  constructor(private http: HttpClient) {}

	getWhat(dir?: string): Observable<HttpResponse<string[]>> {

		let whatUrl = this.whatUrl;
		if (dir) {
			whatUrl = this.whatUrl + dir + '/';
		}
		return this.http.get<string[]>(whatUrl, {observe: 'response'});
		/**
			.pipe(
			catchError(
			this.handleError(new HttpResponse<string[]>())
			)
			);
		 */
	}

  /**
   * from angular.io http tutorial
   * Handle Http operation that failed.
   * Let the app continue.
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (result? : T) {
	  return (error: any): Observable<T> => {
		  console.error(error);
		  return of(result as T);
    };
  }
}
