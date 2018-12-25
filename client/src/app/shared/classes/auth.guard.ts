import { CanActivate } from "@angular/router/src/utils/preactivation";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from "../../../../node_modules/@angular/router";
import { Observable, of } from "rxjs";
import { Injectable } from "../../../../node_modules/@angular/core";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild{
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;
    constructor(private auth: AuthService,
                private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
        if (this.auth.IsAuthenticated()){
            return of(true)
        } else {
            this.router.navigate(['/login'],{
                queryParams: {
                    accessDenied: true
                }
            })
            return of(false)
        }
    }

    canActivatChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
        return this.canActivate(route, state)
    }
}