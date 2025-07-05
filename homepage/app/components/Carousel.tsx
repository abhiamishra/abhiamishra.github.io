'use client';

import Image from 'next/image'
import React, {useEffect, useRef, useState} from 'react';

type CarouselDataType = {
    imageLink: string;
}
type CarouselProps = {
    data: CarouselDataType[]
  };

const Carousel = ({data}: CarouselProps) => {
    const [currentImg, setCurrentImg] = useState(0);
    const [carouselSize, setCarouselSize] = useState({ width: 0, height: 0})
    const carouselRef = useRef<HTMLDivElement>(null);

    // extract the initial size
    useEffect(() => {
        const elem = carouselRef.current as unknown as HTMLDivElement
        const { width, height } = elem.getBoundingClientRect()
        if (carouselRef.current) {
            setCarouselSize({
                width,
                height
            })
        }
    }, []);

    return (
        <div>
            <div className="relative h-60 w-80 overflow-hidden rounded-md">
                <div
                    ref={carouselRef}
                    style={{
                        left: -currentImg * carouselSize.width,
                        perspective: '100px'
                    }}
                    className="absolute flex h-full w-full transition-all duration-300"
                >
                    {data.map((v, i) => (
                        <div key={i} className="relative h-full w-full shrink-0">
                            <Image className="pointer-events-none" alt="random image" fill src={v.imageLink} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-3 flex justify-center">
                <button
                    onClick={
                        () => setCurrentImg((prev) => (prev === 0 ? data.length - 1 : prev-1))
                    }
                    className={`border px-4 py-2 font-bold mr-16`}
                >
                    {'<'}
                </button>
                <button
                    className={`border px-4 py-2 font-bold`}
                    onClick={
                        () => setCurrentImg((prev) => (prev === data.length-1 ? 0 : prev+1))
                    }
                >
                    {'>'}
                </button>
            </div>
        </div>
    )
}

export default Carousel