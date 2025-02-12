import React, { useState } from 'react';

import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

const InfoPanel: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className='p-4 border border-neutral-800 rounded w-full bg-neutral-900'>
            <h3 className='text-lg font-semibold text-white mb-2 text-center'>
                Información
            </h3>

            <div
                className={`overflow-hidden transition-all duration-300 ${
                    isExpanded
                        ? 'max-h-[500px] opacity-100'
                        : 'max-h-0 opacity-0'
                }`}
            >
                <div className='text-neutral-400 text-sm'>
                    <p className='py-[6px]'>
                        Esta herramienta te permite generar{' '}
                        <u>fichas y miniaturas de juego imprimibles</u> para tus
                        personajes de DnD.
                    </p>
                    <p className='py-[6px]'>
                        Inserta la imágen de tu personaje y recorta la imágen
                        para la ficha, una vez hecho genera una preview y
                        descárgala si te gusta
                    </p>
                    <p className='py-[6px]'>
                        A la hora de imprimir, la ficha debe medir{' '}
                        <u>2,5 x 2,5 cm o 1 x 1 pulgadas</u> y la miniatura debe
                        medir <u>2,5 x 12 cm o 1 x 4,8 pulgadas</u>
                    </p>
                    <p className='py-[6px]'>
                        La miniatura, se dobla por las líneas discontínuas y se
                        corta por las líneas contínuas
                    </p>
                </div>
            </div>

            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className='w-full py-2 bg-neutral-700 text-white rounded mt-2 hover:bg-neutral-800 transition flex justify-center'
            >
                {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
        </div>
    );
};

export default InfoPanel;
