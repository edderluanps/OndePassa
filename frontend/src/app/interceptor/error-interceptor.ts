import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { LocalUser } from '../login/local_user';
import { StorageService } from '../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private toastr: ToastrService, public storageService: StorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMsg = 'Erro:' + error;
                if (typeof ErrorEvent !== 'undefined' && error.error instanceof ErrorEvent) { 
                    this.toastr.error('Erro no Client: ' + error.message, "Erro");
                    errorMsg = `Error: ${error.error.message}`;
                }
                else {
                    this.toastr.error('Erro no Servidor: ' + error.message, "Erro");
                    errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                }
                this.toastr.error("Erro: " + errorMsg, "Erro");

                switch (error.status) {
                    case 401:
                        this.handle401();
                        break;

                    case 403:
                        this.handle403();
                        break;

                    default:
                        this.handleDefaultError(errorMsg);
                }
                return throwError(errorMsg);
            })
        )
    }

    handle401() {
        this.toastr.error('Login e senha incorretos');
    }

    handle403() {
        let user: LocalUser = {
            token: '',
            email: ''
        }
        this.storageService.setLocalUser(user);
    }

    handleDefaultError(errorMsg: any) {
        this.toastr.error('404: ' + errorMsg);
    }
}

export const ErrorInterceptorProvider = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true
    }
]