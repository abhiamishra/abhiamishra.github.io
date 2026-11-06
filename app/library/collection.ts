// what's on the shelves. spine colors are sampled from each cover.

export type Book = {
  id: string;
  title: string;
  spineTitle?: string; // shorter title when the full one won't fit on a spine
  author: string; // "Last, First." as on a catalogue card
  byline: string; // as printed: "Albert Camus"
  year: number;
  cover: string;
  spine: { bg: string; ink: string; height: number; width: number };
};

export type Shelf = { label: string; books: Book[] };

export type Album = {
  id: string;
  title: string;
  artist: string;
  year: number;
  cover: string; // a photo of the disc itself
  sleeve: string; // paper inner-sleeve tone
};

export const SHELVES: Shelf[] = [
  {
    label: "philosophy",
    books: [
      {
        id: "sisyphus",
        title: "The Myth of Sisyphus",
        author: "Camus, Albert.",
        byline: "Albert Camus",
        year: 1942,
        cover: "/mos.jpg",
        spine: { bg: "#ece7dc", ink: "#141414", height: 248, width: 44 },
      },
      {
        id: "mans-search",
        title: "Man's Search for Meaning",
        author: "Frankl, Viktor E.",
        byline: "Viktor E. Frankl",
        year: 1946,
        cover: "/mansearch.jpg",
        spine: { bg: "#a6827f", ink: "#25180f", height: 262, width: 46 },
      },
    ],
  },
  {
    label: "novels",
    books: [
      {
        id: "stranger",
        title: "The Stranger",
        author: "Camus, Albert.",
        byline: "Albert Camus",
        year: 1942,
        cover: "/stranger.png",
        spine: { bg: "#161514", ink: "#e9e4da", height: 238, width: 40 },
      },
      {
        id: "small-things",
        title: "The God of Small Things",
        author: "Roy, Arundhati.",
        byline: "Arundhati Roy",
        year: 1997,
        cover: "/gdsmthing.jpg",
        spine: { bg: "#8c2e29", ink: "#e8c547", height: 270, width: 58 },
      },
      {
        id: "alchemist",
        title: "The Alchemist",
        author: "Coelho, Paulo.",
        byline: "Paulo Coelho",
        year: 1988,
        cover: "/alchemist.jpeg",
        spine: { bg: "#c4532f", ink: "#f3d27a", height: 244, width: 42 },
      },
    ],
  },
  {
    label: "adventures",
    books: [
      {
        id: "eragon",
        title: "Eragon",
        author: "Paolini, Christopher.",
        byline: "Christopher Paolini",
        year: 2002,
        cover: "/eragon.png",
        spine: { bg: "#1c2046", ink: "#c9b27a", height: 266, width: 62 },
      },
      {
        id: "hp1",
        title: "Harry Potter and the Sorcerer's Stone",
        spineTitle: "Harry Potter",
        author: "Rowling, J. K.",
        byline: "J. K. Rowling",
        year: 1997,
        cover: "/hp1.png",
        spine: { bg: "#9a593b", ink: "#f0d48a", height: 252, width: 50 },
      },
      {
        id: "hail-mary",
        title: "Project Hail Mary",
        author: "Weir, Andy.",
        byline: "Andy Weir",
        year: 2021,
        cover: "/hailmary.png",
        spine: { bg: "#171717", ink: "#d4b236", height: 258, width: 54 },
      },
    ],
  },
];

export const RECORDS: Album[] = [
  { id: "bee-gees", title: "Greatest", artist: "Bee Gees", year: 1979, cover: "/beesgees.png", sleeve: "#ddd2ba" },
  { id: "cmiygl", title: "Call Me If You Get Lost", artist: "Tyler, the Creator", year: 2021, cover: "/cmiygl.jpg", sleeve: "#c8ad83" },
  { id: "flower-boy", title: "Flower Boy", artist: "Tyler, the Creator", year: 2017, cover: "/flowerboy.webp", sleeve: "#e6dfcf" },
  { id: "madvillainy", title: "Madvillainy", artist: "Madvillain", year: 2004, cover: "/madvillainy.png", sleeve: "#bfa47b" },
  { id: "trench", title: "Trench", artist: "Twenty One Pilots", year: 2018, cover: "/trench.png", sleeve: "#d6c9ad" },
];
