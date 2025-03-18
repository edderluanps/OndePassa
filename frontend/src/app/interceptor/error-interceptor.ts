import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private toastr : ToastrService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMsg = 'Erro:' + error.message;
                if (error.error instanceof ErrorEvent) {
                    errorMsg = `Error: ${error.error.message}`;
                }
                else {
                    this.toastr.error("Erro no servidor: " + error.message, "Erro");
                    errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                }
                this.toastr.error("Erro: " + errorMsg, "Erro");
                return throwError(errorMsg);
            })
        )
    }
}

export const ErrorInterceptorProvider = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true
    }
]