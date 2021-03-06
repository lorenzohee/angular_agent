import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {Comment} from './comment.model'

const httpOptions = {
  headers: new HttpHeaders({
    'contentType': 'application/json',
    'Authorization': 'eyJhbGciOiJSUzI1NiJ9.eyJ1dWlkIjoiYTdmOGNmY2MtMjdiNi00NmQ2LWI4NDYtMmZmNjI5ZjcwMjUwIiwiZW1haWwiOiJtYXRpYW5qdW5AaGFpZXIuY29tIn0.pKy4cOj3DOGd8CTM_gxvdI7s4rVHekDj1-mcXy0057tHHb5t3fRqphk4Wi1wS61s26tLdgiCSxAItAShQlDRxYFtcyB95gImQSm1yGsG_ZLEzl3hNDcuh21pl56hYr79RC4CTDnzPKQPb7oy2bpcXd0RyOtD0FfeKV8JY2XhM_jW_tU3Y_fX6EguHJVwpGVUQ5oUpP1cuIzyuwRrwleS89hfGfNErc_Q9gTNifQ1o_oQijIhqOLITk4IHB_EENIq6IDxDcKu8yAX31cGr9vXM85Kr5WlrArAy2dEk8lbCXs3vea747H3UOSCbF9BxAIY5VKyLzU_Zbz7MhsaZa1yqw',
    'dataType': 'json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  createComment(comment: Comment):Observable<Comment>{
    return this.http.post<Comment>(environment.baseApiPath + '/api/v1/comments', comment, httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
