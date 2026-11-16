import { useState } from 'react';

export default function Poster({ src, alt, title }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className="poster poster-fallback" role="img" aria-label={title || alt || 'Movie poster'}>
        <span className="poster-fallback-title">{title || alt || 'Movie'}</span>
      </div>
    );
  }

  return (
    <img
      className="poster"
      src={src}
      alt={alt || title}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
