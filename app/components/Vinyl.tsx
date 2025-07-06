// components/Vinyl.tsx
import Image from "next/image";

interface VinylProps {
    vinylName: string | "beesgees";
}

export default function Vinyl({ vinylName }: VinylProps) {
  return (
    <div className="group w-40 h-40 relative rounded-full overflow-hidden shadow-lg">
      <Image
        src={`/${vinylName}`}  // or jpg/webp — make sure it's circular!
        alt="Vinyl"
        layout="fill"
        objectFit="cover"
        className="rounded-full transition-transform duration-800 ease-in-out group-hover:rotate-[360deg] group-hover:rotate-0"
      />
    </div>
  );
}
