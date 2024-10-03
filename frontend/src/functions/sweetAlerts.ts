import Swal from 'sweetalert2'

export const deleteAlert = (id : number | string, fn: (id : number | string) => void) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminarlo!',
        cancelButtonText: 'No, cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            fn(id);
            Swal.fire(
                '¡Eliminado!',
                'El producto ha sido eliminado.',
                'success'
            );
        } else {
            Swal.fire(
                'Cancelado',
                'El producto está a salvo :)',
                'error'
            );
        }
    });
}