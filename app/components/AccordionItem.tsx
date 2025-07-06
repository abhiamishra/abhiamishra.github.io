// components/AccordionItem.tsx
'use client';
import { ReactNode, useState, useRef, useLayoutEffect } from 'react';

interface AccordionItemProps {
  title: string;
  children: ReactNode;
}

export default function AccordionItem({ title, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState<string>('0px');
  const contentRef = useRef<HTMLDivElement>(null);

  // Update max-height whenever isOpen changes
  useLayoutEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen, children]);

  return (
    <div className="border-b mb-3">
      <button
        type="button"
        aria-expanded={isOpen}
        className="w-full flex justify-between items-center py-2 focus:outline-none"
        onClick={() => setIsOpen(o => !o)}
      >
        <h1 className="text-3xl mb-3">{title}</h1>
        <span
          className={`transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          ▼
        </span>
      </button>

      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className="overflow-hidden transition-[max-height] duration-300 will-change-[max-height]"
        aria-hidden={!isOpen}

      >
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
