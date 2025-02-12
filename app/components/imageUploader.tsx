import React, { useRef } from 'react';

interface ImageUploaderProps {
    onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isImageSelected: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
    onSelectFile,
    isImageSelected,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className='w-full flex justify-center'>
            <label htmlFor='image_uploads' className='cursor-pointer w-full'>
                <button
                    className='px-4 py-2 bg-blue-500 text-white text-sm rounded pointer-events-none w-full'
                    onClick={() => fileInputRef.current?.click()}
                >
                    {isImageSelected
                        ? 'Selecciona una imagen'
                        : 'Cambiar imagen'}
                </button>
            </label>
            <input
                ref={fileInputRef}
                id='image_uploads'
                name='image_uploads'
                type='file'
                accept='image/*'
                onChange={onSelectFile}
                className='hidden'
            />
        </div>
    );
};

export default ImageUploader;
