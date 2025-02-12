import React, { useRef, useState } from 'react';
import Image from 'next/image';

// Importa las imágenes de fondo
import papyroBackground from '../assets/backgrounds/papyro.png';
import dirtyPaperBackground from '../assets/backgrounds/dirtyPaper.png';
import concreteBackground from '../assets/backgrounds/concrete.png';
import metalBackground from '../assets/backgrounds/metal.png';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

interface OptionsPanelProps {
    setBackgroundImage: (src: string | null) => void;
}

const backgrounds = [
    { name: 'Blanco', src: null }, // Fondo blanco por defecto
    { name: 'Cemento', src: concreteBackground.src },
    { name: 'Papiro', src: papyroBackground.src },
    { name: 'Papel Sucio', src: dirtyPaperBackground.src },
    { name: 'Metal', src: metalBackground.src },
    { name: 'Custom', src: null },
];

const OptionsPanel: React.FC<OptionsPanelProps> = ({ setBackgroundImage }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleBackgroundChange = (
        name: string | null,
        src: string | null
    ) => {
        if (name === 'Custom') {
            inputRef.current?.click();
        } else {
            setBackgroundImage(src);
        }
    };

    return (
        <div className='p-4 border border-neutral-800 rounded w-full bg-neutral-900'>
            <input
                type='file'
                accept='image/*'
                className='hidden'
                ref={inputRef}
                onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                        const reader = new FileReader();
                        reader.onload = (ev) =>
                            handleBackgroundChange(
                                null,
                                ev.target?.result as string
                            );
                        reader.readAsDataURL(e.target.files[0]);
                    }
                }}
            />
            <h3 className='text-lg font-semibold text-white mb-2 text-center'>
                Opciones
            </h3>

            {/* Contenedor con transición de altura */}
            <div
                className={`overflow-hidden transition-all duration-300 ${
                    isExpanded
                        ? 'max-h-[500px] opacity-100'
                        : 'max-h-0 opacity-0'
                }`}
            >
                <div className='p-4 border border-neutral-800 rounded w-full bg-neutral-900'>
                    <p className='text-sm text-white mb-4 text-center'>Fondo</p>
                    <div className='grid grid-cols-3 gap-2'>
                        {backgrounds.map((bg) => (
                            <div className='flex justify-center' key={bg.name}>
                                <button
                                    onClick={() =>
                                        handleBackgroundChange(bg.name, bg.src)
                                    }
                                    className='relative w-20 h-20 rounded-lg overflow-hidden border border-gray-300 hover:scale-105 transition-transform'
                                >
                                    {bg.src ? (
                                        <Image
                                            src={bg.src}
                                            alt={bg.name}
                                            layout='fill'
                                            objectFit='cover'
                                        />
                                    ) : (
                                        <div className='w-full h-full bg-white flex items-center justify-center text-gray-500 text-sm'>
                                            {bg.name}
                                        </div>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Botón para expandir/retraer */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className='w-full py-2 bg-neutral-700 text-white rounded mt-2 hover:bg-neutral-800 transition flex justify-center'
            >
                {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
        </div>
    );
};

export default OptionsPanel;
