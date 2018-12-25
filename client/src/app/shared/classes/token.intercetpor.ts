import { Injectable } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { HttpErrorResponse, HttpEvent,HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    constructor(private auth: AuthService, private router: Router){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.IsAuthenticated()) {
           req = req.clone({
               setHeaders: {
                   Authorization: this.auth.getToken()
               }
           }) 
        }
        return next.handle(req).pipe(
            catchError(
                (error: HttpErrorResponse) => this.handleAuthError(error)
            )
        )
    }

    private handleAuthError(error: HttpErrorResponse): Observable<any>{
        if (error.status === 401) {
            this.router.navigate(['/login'], {
                queryParams:{
                    sesssionFailed: true
                }
            })
        }
        return throwError(error)
    }
}