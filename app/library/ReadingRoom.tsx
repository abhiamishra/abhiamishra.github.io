"use client";

import { useState } from "react";
import { type Album, type Book, RECORDS, SHELVES } from "./collection";

type Selection = { kind: "book"; item: Book } | { kind: "record"; item: Album } | null;

const isSelected = (sel: Selection, id: string) => sel?.item.id === id;

function Spine({ book, selected, onPick }: { book: Book; selected: boolean; onPick: () => void }) {
  const { bg, ink, height, width } = book.spine;
  return (
    <button
      type="button"
      className={`rr-spine ${selected ? "is-out" : ""}`}
      style={{ "--spine-bg": bg, "--spine-ink": ink, height, width } as React.CSSProperties}
      aria-pressed={selected}
      aria-label={`${book.title} by ${book.byline}`}
      onClick={onPick}
    >
      <span className="rr-spine-title">{book.spineTitle ?? book.title}</span>
      <span className="rr-spine-author">{book.byline.split(" ").pop()}</span>
    </button>
  );
}

function Sleeve({ album, selected, onPick }: { album: Album; selected: boolean; onPick: () => void }) {
  return (
    <button
      type="button"
      className={`rr-record ${selected ? "is-out" : ""}`}
      aria-pressed={selected}
      aria-label={`${album.title} by ${album.artist}`}
      onClick={onPick}
    >
      <span className="rr-disc" style={{ backgroundImage: `url(${album.cover})` }} />
      <span className="rr-sleeve" style={{ background: album.sleeve }}>
        <span className="rr-sleeve-title">{album.title}</span>
        <span className="rr-sleeve-hole" style={{ backgroundImage: `url(${album.cover})` }} />
      </span>
    </button>
  );
}

function CatalogueCard({ sel }: { sel: Selection }) {
  if (!sel) {
    return (
      <div className="rr-card is-empty">
        <p>Pick a book or a record from the shelves to pull its card.</p>
        <span className="rr-card-hole" aria-hidden />
      </div>
    );
  }

  const shelf =
    sel.kind === "book"
      ? SHELVES.find((s) => s.books.some((b) => b.id === sel.item.id))!.label
      : "records";

  return (
    <div className="rr-card" key={sel.item.id}>
      {sel.kind === "book" ? (
        <>
          <p className="rr-card-head">{sel.item.author}</p>
          <p className="rr-card-body">
            {sel.item.title} / {sel.item.byline}. — {sel.item.year}.
          </p>
        </>
      ) : (
        <>
          <p className="rr-card-head">{sel.item.artist}.</p>
          <p className="rr-card-body">
            {sel.item.title} [sound recording] / {sel.item.artist}. — {sel.item.year}.
          </p>
          <p className="rr-card-body">1 disc : analog, 33⅓ rpm ; 12 in.</p>
        </>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="rr-card-cover" src={sel.item.cover} alt={`Cover of ${sel.item.title}`} />
      <p className="rr-card-shelf">Shelved under {shelf}.</p>
      <span className="rr-card-hole" aria-hidden />
    </div>
  );
}

export default function ReadingRoom() {
  const [sel, setSel] = useState<Selection>(null);
  const toggle = (next: NonNullable<Selection>) =>
    setSel(isSelected(sel, next.item.id) ? null : next);

  return (
    <div className="rr-layout">
      <div className="rr-case">
        <div className="rr-shelf">
          {SHELVES.map((shelf) => (
            <div className="rr-group" key={shelf.label}>
              <div className="rr-row">
                {shelf.books.map((b) => (
                  <Spine
                    key={b.id}
                    book={b}
                    selected={isSelected(sel, b.id)}
                    onPick={() => toggle({ kind: "book", item: b })}
                  />
                ))}
              </div>
              <span className="rr-plate">{shelf.label}</span>
            </div>
          ))}
        </div>

        <div className="rr-shelf is-records">
          <div className="rr-group">
            <div className="rr-row">
              {RECORDS.map((r) => (
                <Sleeve
                  key={r.id}
                  album={r}
                  selected={isSelected(sel, r.id)}
                  onPick={() => toggle({ kind: "record", item: r })}
                />
              ))}
            </div>
            <span className="rr-plate">records</span>
          </div>
        </div>
      </div>

      <aside className="rr-catalogue" aria-live="polite">
        <CatalogueCard sel={sel} />
      </aside>
    </div>
  );
}
