interface CanvasPreviewProps {
    tokenCanvasRef: React.RefObject<HTMLCanvasElement> | null;
    miniatureCanvasRef: React.RefObject<HTMLCanvasElement> | null;
}

const CanvasPreview: React.FC<CanvasPreviewProps> = ({
    tokenCanvasRef,
    miniatureCanvasRef,
}) => {
    return (
        <>
            {tokenCanvasRef && (
                <div className='flex flex-col justify-start gap-3 '>
                    <h3 className='text-lg font-semibold text-center'>
                        Previsualización de la Ficha
                    </h3>
                    <div className='flex justify-center'>
                        <canvas
                            ref={tokenCanvasRef}
                            className='border h-full sm:max-h-[25vh] w-3/5 sm:w-auto shadow-md rounded-full'
                        />
                    </div>
                </div>
            )}
            {miniatureCanvasRef && (
                <div className='flex flex-col justify-start gap-3'>
                    <h3 className='text-lg font-semibold text-center'>
                        Previsualización de la Miniatura
                    </h3>
                    <div className='flex justify-center '>
                        <canvas
                            ref={miniatureCanvasRef}
                            className='border shadow-md h-full max-h-[65vh]'
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default CanvasPreview;
