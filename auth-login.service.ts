import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserAuth } from '../models/userAuth';

@Injectable({
  providedIn: 'root'
})

export class AuthLoginService {

  constructor(private httpClient: HttpClient) {}

  userSignin(userObj: UserAuth): Observable<UserAuth> {
    return this.httpClient.post<UserAuth>(`${environment.BASE_URL}${AUTHLOGIN}`, userObj).pipe(catchError(this.handleError));
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
  }

  authService() {
    const user = sessionStorage.getItem('token');
    return !(user === null);
  }

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
