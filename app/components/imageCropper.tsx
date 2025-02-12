import React, { RefObject } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropperProps {
    imgRef: RefObject<HTMLImageElement | null>;
    crop: Crop | undefined;
    setCrop: (crop: Crop) => void;
    setCompletedCrop: (crop: Crop) => void;
    selectedImage: string | undefined;
    onImageLoad: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
    imgRef,
    crop,
    setCrop,
    setCompletedCrop,
    selectedImage,
    onImageLoad,
}) => {
    return (
        <div className='flex justify-center items-center'>
            <ReactCrop
                className='max-h-96 sm:max-h-[40vh] w-auto border rounded-sm'
                crop={crop}
                onChange={(newCrop) => setCrop(newCrop)}
                onComplete={(c) => {
                    setCompletedCrop(c);
                }}
                aspect={1}
                keepSelection
                circularCrop
            >
                <img
                    ref={imgRef}
                    src={selectedImage}
                    alt='Source'
                    onLoad={onImageLoad}
                />
            </ReactCrop>
        </div>
    );
};

export default ImageCropper;
