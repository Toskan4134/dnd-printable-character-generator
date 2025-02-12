import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { RefObject } from 'react';

export async function downloadAllImagesAsZip(
    tokenCanvasRef: RefObject<HTMLCanvasElement>,
    miniatureCanvasRef: RefObject<HTMLCanvasElement>
) {
    const zip = new JSZip();
    if (tokenCanvasRef.current) {
        zip.file(
            'token.png',
            tokenCanvasRef.current.toDataURL('image/png').split(',')[1],
            { base64: true }
        );
    }
    if (miniatureCanvasRef.current) {
        zip.file(
            'miniature.png',
            miniatureCanvasRef.current.toDataURL('image/png').split(',')[1],
            { base64: true }
        );
    }
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'dnd-printables.zip');
}
