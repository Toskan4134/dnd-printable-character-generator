export function dragOverHandler(ev: any) {
    ev.preventDefault(); // Necesario para permitir el drop
    ev.dataTransfer!.dropEffect = 'copy';

    if (ev.dataTransfer?.items.length === 1) {
        const item = ev.dataTransfer.items[0];

        if (item.kind === 'file' && item.type.startsWith('image/')) {
            console.log('Imagen detectada sobre el área de drop.');
        }
    }
}
export function dropHandler(
    ev: any,
    setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>
) {
    console.log('Fichero arrastrado');

    ev.preventDefault();

    let file: File | null = null;

    if (ev.dataTransfer?.items) {
        if (ev.dataTransfer.items.length > 1) {
            console.warn('Solo se permite un archivo a la vez.');
            return;
        }

        const item = ev.dataTransfer.items[0];

        if (item.kind === 'file') {
            const selectedFile = item.getAsFile();
            if (selectedFile && selectedFile.type.startsWith('image/')) {
                file = selectedFile;
            } else {
                console.warn('El archivo no es una imagen válida.');
                return;
            }
        }
    } else if (ev.dataTransfer?.files.length === 1) {
        const selectedFile = ev.dataTransfer.files[0];

        if (selectedFile.type.startsWith('image/')) {
            file = selectedFile;
        } else {
            console.warn('El archivo no es una imagen válida.');
            return;
        }
    } else {
        console.warn('Solo se permite un archivo a la vez.');
        return;
    }

    if (file) {
        console.log('Archivo seleccionado:', file.name);
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target?.result) {
                setSelectedImage(event.target.result as string);
            }
        };
        reader.readAsDataURL(file);
    }

    removeDragData(ev);
}

function removeDragData(ev: DragEvent) {
    if (ev.dataTransfer) {
        ev.dataTransfer.clearData();
    }
}
