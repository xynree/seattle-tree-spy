import { useEffect, useRef, useState } from "react";

const imageCache: Record<string, string | null> = {};

export function useWikipediaImage(scientificName: string | null) {
  const cachedImage =
    scientificName != null ? imageCache[scientificName] : undefined;

  const [imageUrl, setImageUrl] = useState<string | null>(cachedImage ?? null);
  const [isLoading, setIsLoading] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const lastRequestedRef = useRef<string | null>(null);

  // Sync cached value immediately (no lint warning)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setImageUrl(cachedImage ?? null);
  }, [cachedImage]);

  useEffect(() => {
    if (!scientificName) return;
    if (cachedImage !== undefined) return;
    if (lastRequestedRef.current === scientificName) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setIsLoading(true);
      lastRequestedRef.current = scientificName;

      const title = encodeURIComponent(scientificName);

      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`)
        .then((res) => res.json())
        .then(
          (data: {
            thumbnail: {
              source: string;
              width: number;
              height: number;
            };
          }) => {
            const url = data.thumbnail?.source || null;
            imageCache[scientificName] = url;
            setImageUrl(url);
          },
        )
        .catch(() => {
          imageCache[scientificName] = null;
          setImageUrl(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 800);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [scientificName, cachedImage]);

  return {
    imageUrl,
    isLoading,
  };
}
