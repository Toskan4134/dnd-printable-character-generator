import { StaticImageData } from 'next/image';

export const generateTokenPreview = (
    completedCrop: any,
    imgRef: React.RefObject<HTMLImageElement>,
    tokenCanvasRef: React.RefObject<HTMLCanvasElement>,
    backgroundImage: string | null,
    tokenImage: StaticImageData
): void => {
    if (!completedCrop || !imgRef.current || !tokenCanvasRef.current) return;

    const image = imgRef.current;
    const canvas = tokenCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = Math.floor(completedCrop.width * scaleX);
    canvas.height = Math.floor(completedCrop.height * scaleY);

    ctx.imageSmoothingQuality = 'high';

    ctx.beginPath();
    ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        Math.min(canvas.width, canvas.height) / 2,
        0,
        2 * Math.PI
    );
    ctx.clip();

    if (backgroundImage) {
        const bgImg = new Image();
        bgImg.src = backgroundImage;
        bgImg.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const scale = Math.max(
                canvas.width / bgImg.width,
                canvas.height / bgImg.height
            );
            const bgWidth = bgImg.width * scale;
            const bgHeight = bgImg.height * scale;
            const offsetX = (canvas.width - bgWidth) / 2;
            const offsetY = (canvas.height - bgHeight) / 2;

            ctx.drawImage(bgImg, offsetX, offsetY, bgWidth, bgHeight);
            drawTokenImage(
                ctx,
                image,
                canvas,
                scaleX,
                scaleY,
                completedCrop,
                tokenImage
            );
        };
    } else {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawTokenImage(
            ctx,
            image,
            canvas,
            scaleX,
            scaleY,
            completedCrop,
            tokenImage
        );
    }
};

const drawTokenImage = (
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    canvas: HTMLCanvasElement,
    scaleX: number,
    scaleY: number,
    completedCrop: any,
    tokenImage: StaticImageData
) => {
    if (!tokenImage) return;

    const tokenImg = new Image();
    tokenImg.src = tokenImage.src;
    tokenImg.onload = () => {
        ctx.drawImage(tokenImg, 0, 0, canvas.width, canvas.height);

        const imgSize =
            Math.min(canvas.width, canvas.height) -
            0.025 * Math.min(canvas.width, canvas.height);
        const imgX = (canvas.width - imgSize) / 2;
        const imgY = (canvas.height - imgSize) / 2;
        ctx.beginPath();
        ctx.arc(
            canvas.width / 2,
            canvas.height / 2,
            imgSize / 2,
            0,
            2 * Math.PI
        );
        ctx.clip();
        ctx.drawImage(
            image,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            imgX,
            imgY,
            imgSize,
            imgSize
        );
    };
};

export const generateMiniaturePreview = (
    selectedImage: string | null,
    miniatureCanvasRef: React.RefObject<HTMLCanvasElement>,
    backgroundImage: string | null,
    miniatureImage: StaticImageData
): void => {
    if (!selectedImage || !miniatureCanvasRef.current) return;
    const canvas = miniatureCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const boardImage = new Image();
    const originalImage = new Image();

    let boardLoaded = false;
    let imageLoaded = false;
    let bgLoaded = false;

    const drawImages = () => {
        if (!boardLoaded || !imageLoaded || (backgroundImage && !bgLoaded))
            return;

        canvas.width = boardImage.width;
        canvas.height = boardImage.height;

        if (backgroundImage) {
            const bgImg = new Image();
            bgImg.src = backgroundImage;
            bgImg.onload = () => {
                const scale = Math.max(
                    canvas.width / bgImg.width,
                    canvas.height / bgImg.height
                );
                const bgWidth = bgImg.width * scale;
                const bgHeight = bgImg.height * scale;
                const offsetX = (canvas.width - bgWidth) / 2;
                const offsetY = (canvas.height - bgHeight) / 2;

                ctx.drawImage(bgImg, offsetX, offsetY, bgWidth, bgHeight);
                ctx.drawImage(boardImage, 0, 0);
                drawCharacter(ctx, originalImage);
            };
        } else {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(boardImage, 0, 0);
            drawCharacter(ctx, originalImage);
        }
    };

    boardImage.onload = () => {
        boardLoaded = true;
        drawImages();
    };
    originalImage.onload = () => {
        imageLoaded = true;
        drawImages();
    };

    if (backgroundImage) {
        const bgImg = new Image();
        bgImg.src = backgroundImage;
        bgImg.onload = () => {
            bgLoaded = true;
            drawImages();
        };
    }

    boardImage.src = miniatureImage?.src || '';
    originalImage.src = selectedImage;
};

const drawCharacter = (
    ctx: CanvasRenderingContext2D,
    originalImage: HTMLImageElement
) => {
    const scaleFactor = Math.min(
        800 / originalImage.width,
        1160 / originalImage.height
    );
    const newWidth = originalImage.width * scaleFactor;
    const newHeight = originalImage.height * scaleFactor;

    ctx.save();
    ctx.translate(450, 1080);
    ctx.scale(1, -1);
    ctx.drawImage(
        originalImage,
        -newWidth / 2,
        -newHeight / 2,
        newWidth,
        newHeight
    );
    ctx.restore();

    ctx.drawImage(
        originalImage,
        450 - newWidth / 2,
        2340 - newHeight / 2,
        newWidth,
        newHeight
    );
};

export const generateAllPreviews = (
    generateTokenPreview: () => void,
    generateMiniaturePreview: () => void
) => {
    generateTokenPreview();
    generateMiniaturePreview();
};
