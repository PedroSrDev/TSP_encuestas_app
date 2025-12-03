import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AlertService } from '../../services/alert.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const alertService = inject(AlertService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = 'Ocurrió un error inesperado';
            let errorTitle = 'Error';

            if (error.error instanceof ErrorEvent) {
                // Client-side error
                errorMessage = `Error: ${error.error.message}`;
            } else {
                // Server-side error
                switch (error.status) {
                    case 401:
                        errorTitle = 'No autorizado';
                        errorMessage = 'Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión nuevamente.';
                        break;
                    case 403:
                        errorTitle = 'Acceso Denegado';
                        errorMessage = 'No tienes permiso para realizar esta acción.';
                        break;
                    case 404:
                        errorTitle = 'No Encontrado';
                        errorMessage = 'El recurso solicitado no existe.';
                        break;
                    case 500:
                        errorTitle = 'Error del Servidor';
                        errorMessage = 'Hubo un problema en el servidor. Inténtalo más tarde.';
                        break;
                    default:
                        errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
                        if (error.error && error.error.message) {
                            errorMessage = error.error.message;
                        }
                }
            }

            // Show alert only for errors (skip 200s obviously, but also maybe skip some specific handled errors if needed)
            // For now, we show alert for all HTTP errors.
            alertService.error(errorTitle, errorMessage);

            return throwError(() => error);
        })
    );
};
