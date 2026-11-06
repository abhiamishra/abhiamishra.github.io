import type { Metadata } from "next";
import { IM_Fell_English } from "next/font/google";
import Link from "next/link";
import ReadingRoom from "./ReadingRoom";

const fell = IM_Fell_English({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-fell",
});

export const metadata: Metadata = {
  title: "abhi's library",
  description: "The books and records Abhi keeps coming back to.",
};

export default function LibraryPage() {
  return (
    <div className={`reading-room ${fell.variable}`}>
      <nav className="rr-crumbs">
        <Link href="/">abhi.md</Link>
        <span aria-hidden>/</span>
        <span>library</span>
      </nav>

      <header className="rr-header">
        <h1>abhi&apos;s library</h1>
        <p>
          the books and records i keep coming back to. not a board of culture, just a
          small vault of things i think you&apos;d get something out of too.
        </p>
      </header>

      <ReadingRoom />
    </div>
  );
}
