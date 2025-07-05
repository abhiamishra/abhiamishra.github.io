'use client';
import React, { useEffect, useRef, useState } from 'react'

export interface InfiniteShelfType {
    id:  number;
    src: string | "/stranger.jpg";
}

interface InfiniteShelfProps {
    objects: InfiniteShelfType[];
}

const InfiniteShelf = ({objects}: InfiniteShelfProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const scrollSpeed = 10000;

  const [centerX, setCenterX] = useState(0);
  const [positions, setPositions] = useState<number[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);


  useEffect(() => {
    let frame: number;

    const scroll = () => {
        if (!scrollRef.current || !direction) return;

        const el = scrollRef.current;

        if (direction === "right") {
            el.scrollLeft += scrollSpeed;
            if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
                el.scrollLeft = 0;
            }
        }
        else {
            el.scrollLeft -= scrollSpeed;
            if (el.scrollLeft <= 0) {
                el.scrollLeft = el.scrollWidth;
            }
        }
        frame = requestAnimationFrame(scroll);
    };

    if (direction) {
        frame = requestAnimationFrame(scroll);
    }

    return () => cancelAnimationFrame(frame);
  }, [direction]);

  // useEffect(() => {
  //   if (!scrollRef.current) return;

  //   const handleScroll = () => {
  //     const container = scrollRef.current!;
  //     const scrollCenter = container.scrollLeft + container.offsetWidth / 2;
  //     const vinylElements = Array.from(container.children) as HTMLDivElement[];

  //     const newPositions = vinylElements.map((el) => {
  //       const rect = el.getBoundingClientRect();
  //       const center = rect.left + rect.width / 2;
  //       const distance = Math.abs(scrollCenter - (container.scrollLeft + center - container.getBoundingClientRect().left));
  //       return distance;
  //     });

  //     setPositions(newPositions);
  //     setCenterX(scrollCenter);
  //   };

  //   handleScroll(); // run once on mount
  //   scrollRef.current.addEventListener("scroll", handleScroll);
  //   return () => scrollRef.current?.removeEventListener("scroll", handleScroll);
  // }, []);

  // const objectsLooped = [...objects, ...objects];
  // return (
    
  //   <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
  //   {/* Hover Zones */}
  //   <div
  //     className="absolute top-0 left-0 h-full w-1/5 z-10"
  //     onMouseEnter={() => setDirection("left")}
  //     onMouseLeave={() => setDirection(null)}
  //   />
  //   <div
  //     className="absolute top-0 right-0 h-full w-1/5 z-10"
  //     onMouseEnter={() => setDirection("right")}
  //     onMouseLeave={() => setDirection(null)}
  //   />

  //   {/* <div className="relative w-full max-w-6xl mx-auto overflow-hidden"> */}
  //     <div
  //       ref={scrollRef}
  //       className="flex gap-8 w-max px-16 py-10 overflow-x-scroll scroll-smooth no-scrollbar"
  //     >
  //       {objectsLooped.map((v, i) => {
  //         const distance = positions[i] || 1000;
  //         const scale = Math.max(0.8, 1.2 - distance / 300);
  //         const blur = Math.min(10, distance / 50);
  //         const opacity = Math.max(0.3, 1 - distance / 400);

  //         return (
  //           // <div
  //           //   key={`${v.id}-${i}`}
  //           //   className="w-32 h-50 flex-shrink-0 bg-center bg-cover shadow-md transition-all duration-300"
  //           //   style={{
  //           //     backgroundImage: `url(${v.src})`,
  //           //   //   transform: `scale(${scale})`,
  //           //   //   filter: `blur(${blur}px)`,
  //           //   //   opacity: opacity,
  //           //   }}
  //           // />
  //           <div key={`${v.id}-${i}`} className="flex flex-col items-center flex-shrink-0">
  //             <img
  //               src={v.src}
  //               alt={`Book ${v.id}`}
  //               className="w-35 h-50 object-cover"
  //               // className="w-35 h-50 transition-transform duration-800 ease-in-out group-hover:rotate-[360deg] group-hover:rotate-0"
  //             />
  //         </div>
  //         );
  //       })}
  //     </div>
      
  //   </div>
  // );

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
    {/* Hover Zones */}
    <div
      className="absolute top-0 left-0 h-full w-1/5 z-10"
      onMouseEnter={() => setDirection("left")}
      onMouseLeave={() => setDirection(null)}
    />
    <div
      className="absolute top-0 right-0 h-full w-1/5 z-10"
      onMouseEnter={() => setDirection("right")}
      onMouseLeave={() => setDirection(null)}
    />

    {/* Carousel */}
    <div
      ref={scrollRef}
      className="flex gap-8 px-16 py-10 overflow-x-scroll no-scrollbar scroll-smooth"
    >
      {[...objects].map((v, i) => (
        <div key={`${v.id}-${i}`} className="flex flex-col items-center flex-shrink-0">
          <img
            src={v.src}
            alt={`Book ${v.id}`}
            className="w-35 h-50 object-cover"
            // className="w-35 h-50 transition-transform duration-800 ease-in-out group-hover:rotate-[360deg] group-hover:rotate-0"
          />
        </div>
      ))}
    </div>
  </div>
  );
}

export default InfiniteShelf