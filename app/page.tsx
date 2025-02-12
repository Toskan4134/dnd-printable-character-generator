'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import ImageUploader from './components/imageUploader';
import ImageCropper from './components/imageCropper';
import CanvasPreview from './components/canvasPreview';
import OptionsPanel from './components/optionsPanel';

import miniatureImage from './assets/templates/miniature.png';
import tokenImage from './assets/templates/token.png';
import ReactCrop, { Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { dragOverHandler, dropHandler } from './utils/dragAndDrop';
import { downloadAllImagesAsZip } from './utils/downloadFiles';
import {
    generateTokenPreview,
    generateMiniaturePreview,
} from './utils/generateCanvas';
import InfoPanel from './components/infoPanel';

export default function Home() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [crop, setCrop] = useState<Crop | null>(null);
    const [initialized, setInitialized] = useState<boolean>(false);
    const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
    const imgRef = useRef<HTMLImageElement>(null!);
    const tokenCanvasRef = useRef<HTMLCanvasElement>(null!);
    const miniatureCanvasRef = useRef<HTMLCanvasElement>(null!);

    useEffect(() => {
        generateMiniaturePreview(
            selectedImage,
            miniatureCanvasRef,
            backgroundImage,
            miniatureImage
        );
        if (!completedCrop || !selectedImage) return;
        generateTokenPreview(
            completedCrop,
            imgRef,
            tokenCanvasRef,
            backgroundImage,
            tokenImage
        );
    }, [selectedImage, backgroundImage]);

    useEffect(() => {
        generateTokenPreview(
            completedCrop,
            imgRef,
            tokenCanvasRef,
            backgroundImage,
            tokenImage
        );
    }, [completedCrop]);

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!initialized) setInitialized(true);
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            const file = e.target.files[0];
            setSelectedImage(null);
            setCrop(null);
            setCompletedCrop(null);

            reader.onload = () => {
                const newImage = reader.result as string;
                setSelectedImage(newImage);
            };

            reader.readAsDataURL(file);

            e.target.value = '';
        }
    };

    const onImageLoad = (width: number, height: number) => {
        const newCrop = centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 50,
                },
                1,
                width,
                height
            ),
            width,
            height
        );

        setCrop(newCrop);
    };

    return (
        <div
            className='min-h-screen flex flex-col'
            onDragOver={dragOverHandler}
            onDrop={(e) => dropHandler(e, setSelectedImage)}
        >
            {/* Encabezado */}
            <div className='flex px-6 flex-col gap-6 justify-center h-[15vh]'>
                <h2 className='text-3xl font-bold text-center'>
                    DnD Printable Character Generator
                </h2>
            </div>

            {/* Contenido principal: Usa flex para ocupar toda la pantalla */}
            <div className='flex flex-1 px-6 flex-col lg:flex-row gap-6 justify-center lg:max-h-[80vh]'>
                {/* Panel de opciones */}
                <div className='w-full lg:w-1/3 flex flex-col gap-4'>
                    <InfoPanel />
                    <div className='flex gap-4 justify-between'>
                        <ImageUploader
                            onSelectFile={onSelectFile}
                            isImageSelected={!initialized}
                        />
                        <button
                            hidden={!initialized}
                            onClick={() =>
                                downloadAllImagesAsZip(
                                    tokenCanvasRef,
                                    miniatureCanvasRef
                                )
                            }
                            className='px-4 py-2 bg-green-500 text-white rounded w-full text-sm'
                        >
                            Descargar
                        </button>
                    </div>
                    {!initialized && (
                        <div className='text-center p-6'>
                            <h3 className='text-sm'>
                                Herramienta creada por y para jugadores
                            </h3>
                            <p className='text-sm text-neutral-500'>
                                Prohibido la venta de copias de esta herramienta
                                y/o de las fichas/miniaturas generadas
                            </p>
                        </div>
                    )}
                    {initialized && (
                        <OptionsPanel setBackgroundImage={setBackgroundImage} />
                    )}
                </div>

                {/* Panel de Previsualización */}
                {initialized && (
                    <div className='w-full lg:w-2/3 flex flex-col items-center gap-6'>
                        <div className='flex flex-col sm:flex-row w-full h-full gap-6 '>
                            {/* Contenedor izquierdo (Cropper y Token) */}
                            <div className='flex flex-col justify-start gap-5 flex-1 h-full'>
                                <ImageCropper
                                    selectedImage={
                                        selectedImage ??
                                        'https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif'
                                    }
                                    crop={crop ?? undefined}
                                    setCrop={setCrop}
                                    setCompletedCrop={setCompletedCrop}
                                    onImageLoad={(e) =>
                                        onImageLoad(
                                            e.currentTarget.width,
                                            e.currentTarget.height
                                        )
                                    }
                                    imgRef={imgRef}
                                />
                                <CanvasPreview
                                    tokenCanvasRef={tokenCanvasRef}
                                    miniatureCanvasRef={null}
                                />
                            </div>

                            {/* Contenedor derecho (Miniatura) */}
                            <div className='flex-1 flex flex-col h-full'>
                                <CanvasPreview
                                    tokenCanvasRef={null}
                                    miniatureCanvasRef={miniatureCanvasRef}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
