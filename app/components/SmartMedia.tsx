'use client'
import { useState, useEffect } from 'react';

interface SmartMediaProps {
  src: string;
  alt?: string;
  mediaType?: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  loop?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
}

const SmartMedia = ({
  src,
  alt = '',
  className = '',
  width,
  height,
  muted,
  loop,
  autoPlay,
  controls,
  loading = 'lazy' // Default to lazy loading
}: SmartMediaProps) => {
  const [finalUrl, setFinalUrl] = useState<string>(src);
  const [mediaType, setMediaType] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkUrlAndType = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Extract the path from the original URL
        const originalUrlPath = new URL(src).pathname;
        const localhostUrl = `http://127.0.0.1:8080${originalUrlPath}`;

        // Check if resource exists on localhost
        try {
          const localResponse = await fetch(localhostUrl, { method: 'HEAD' });
          if (localResponse.ok) {
            setFinalUrl(localhostUrl);
          } else {
            setFinalUrl(src); // Keep original URL if localhost version doesn't exist
          }
        } catch (error) {
          // If localhost check fails, fallback to original URL
          console.log(error);
          setFinalUrl(src);
        }

        // Check content type
        const response = await fetch(finalUrl, { method: 'HEAD' });
        const contentType = response.headers.get('content-type') || '';

        if (contentType.startsWith('image/')) {
          setMediaType('image');
        } else if (contentType.startsWith('video/')) {
          setMediaType('video');
        } else {
          throw new Error('Unsupported media type');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    checkUrlAndType();
  }, [src]);

  if (isLoading) {
    return <div className="animate-pulse bg-gray-200 rounded-md" style={{ width, height }
    } />
  }

  if (error) {
    return <div className="text-red-500" > Error: {error} </div>;
  }

  if (mediaType === 'image') {
    return (
      <img
        src={finalUrl}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
      />
    );
  }

  if (mediaType === 'video') {
    return (
      <video
        width={width}
        height={height}
        loop={loop}
        muted={muted}
        controls={controls}
        preload="none" // "metadata", "auto", or "none"
        autoPlay={autoPlay} // If you want to control autoplay behavior
        playsInline // Optional for inline playback on mobile devices
        className={className}
      >
        <source src={finalUrl} type={"video/mp4"} />
      </video>
    );
  }

  return null;
};

export default SmartMedia;