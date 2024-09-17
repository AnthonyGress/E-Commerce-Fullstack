import Swal from 'sweetalert2';

import './swal.css';
import { ConfirmationOptions } from '../../types';
import { PRIMARY_COLOR } from '../../constants';

const ThemedAlert = Swal.mixin({
    customClass: {
        confirmButton: 'confirm-btn',
        cancelButton: 'cancel-btn'
    }
});

export class PopupManager {
    constructor() {
        // no-op
    }
    public static success(text?: string, action?: () => any): void {
        ThemedAlert.fire({
            title: 'Success',
            text: text && text,
            icon: 'success',
            showConfirmButton: true,
            confirmButtonColor: PRIMARY_COLOR,
        }).then(() => action && action());
    }
    public static failure(text?: string, action?: () => any): void {
        ThemedAlert.fire({
            title: 'Error',
            text: text && text,
            confirmButtonColor: PRIMARY_COLOR,
            icon: 'error'
        }).then(() => action && action());
    }

    public static loading(text?: string, action?: () => any): void {
        ThemedAlert.fire({
            title: 'Loading',
            text: text && text,
            confirmButtonColor: PRIMARY_COLOR,
            icon: 'info'
        }).then(() => action && action());
    }

    public static confirmation (options: ConfirmationOptions) {
        Swal.fire({
            title: `${options.title}`,
            confirmButtonText: options.confirmText ? options.confirmText : 'Yes',
            confirmButtonColor: '#4caf50',
            icon: 'info',
            showDenyButton: true,
            denyButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                options.confirmAction();
            } else if (result.isDenied) {
                if (options.denyAction) {
                    options.denyAction();
                }
            }
        });
    }
}
