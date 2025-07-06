// components/Vinyl.tsx
import Image from "next/image";

interface BookProps {
    bookName: string | "stranger.jpg";
}

export default function Book({ bookName }: BookProps) {
  return (
    <div className="group w-35 h-50 relative overflow-hidden shadow-lg">
      <Image
        src={`/${bookName}`}  // or jpg/webp — make sure it's circular!
        alt="Vinyl"
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-800 ease-in-out cursor-pointer transition-transform duration-200 ease-out hover:scale-110 hover:-translate-y-1 hover"
      />
    </div>
  );
}
