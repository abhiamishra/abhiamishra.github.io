// components/SpotifyEmbed.tsx
export default function SpotifyEmbed() {
    return (
      <div className="rounded-xl overflow-hidden shadow-lg w-full max-w-md flex-center">
        <iframe
          src="https://open.spotify.com/embed/track/6DzXaIgVIH7oLA1pkUtFaG?utm_source=generator&theme=0" width="100%" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"
        ></iframe>
      </div>
    );
  }
  