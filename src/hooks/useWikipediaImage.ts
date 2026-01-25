import { useEffect, useRef, useState } from "react";

const imageCache: Record<string, string | null> = {};

export function useWikipediaImage(scientificName: string | null) {
  const cachedImage = scientificName
    ? (imageCache[scientificName] ?? null)
    : null;

  // Initialize from cache
  const [imageUrl, setImageUrl] = useState<string | null>(cachedImage);
  const [isLoading, setIsLoading] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setImageUrl(cachedImage);
  }, [cachedImage]);

  useEffect(() => {
    if (!scientificName || scientificName in imageCache) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (abortRef.current) abortRef.current.abort();

    debounceRef.current = setTimeout(() => {
      setIsLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;

      const title = encodeURIComponent(scientificName);

      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`, {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then(
          (data: {
            thumbnail?: {
              source: string;
              width: number;
              height: number;
            };
          }) => {
            const url = data.thumbnail?.source ?? null;
            imageCache[scientificName] = url;
            setImageUrl(url);
          },
        )
        .catch((err: Error) => {
          if (err.name === "AbortError") return;
          imageCache[scientificName] = null;
          setImageUrl(null);
        })
        .finally(() => setIsLoading(false));
    }, 800);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [scientificName]);

  return { imageUrl, isLoading };
}
