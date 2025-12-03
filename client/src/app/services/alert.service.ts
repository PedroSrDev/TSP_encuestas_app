import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor() { }

    private showAlert(title: string, text: string, icon: SweetAlertIcon) {
        Swal.fire({
            title,
            text,
            icon,
            confirmButtonColor: '#3b82f6', // primary color
            confirmButtonText: 'Aceptar'
        });
    }

    success(title: string, text: string = '') {
        this.showAlert(title, text, 'success');
    }

    error(title: string, text: string = '') {
        this.showAlert(title, text, 'error');
    }

    warning(title: string, text: string = '') {
        this.showAlert(title, text, 'warning');
    }

    info(title: string, text: string = '') {
        this.showAlert(title, text, 'info');
    }

    confirm(title: string, text: string): Promise<any> {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3b82f6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });
    }
}
