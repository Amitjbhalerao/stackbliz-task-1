import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()

export class FblInterceptor implements HttpInterceptor {
    constructor() { }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq;
        if (localStorage.getItem('Auth')) {
            authReq = req.clone({
                setHeaders: {
                'Content-type':'application/json',
                'Authorization': "Bearer " +localStorage.getItem('Auth')
                }
            });
        } else {
            authReq = req.clone();
        }
        return next.handle(authReq);
    }
}