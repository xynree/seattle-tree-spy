import { useEffect, useState, useRef } from "react";

const imageCache: Record<string, string | null> = {};

export default function WikipediaImage({
  scientificName,
}: {
  scientificName: string | null;
  width?: number;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const previousNameRef = useRef<string | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!scientificName) return;

    // If cached, return immediately
    if (scientificName in imageCache) {
      setImageUrl(imageCache[scientificName]);
      previousNameRef.current = scientificName; // track last requested
      return;
    }

    // If it's the same as last request, do nothing
    if (previousNameRef.current === scientificName) return;

    // Clear any pending debounce
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // Debounce network request
    debounceRef.current = setTimeout(() => {
      setIsLoading(true);

      previousNameRef.current = scientificName;

      const title = encodeURIComponent(scientificName);
      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`)
        .then((res) => res.json())
        .then((data) => {
          const url = data.thumbnail?.source || null;
          imageCache[scientificName] = url;
          setImageUrl(url);
          setIsLoading(false);
        })
        .catch(() => {
          imageCache[scientificName] = null;
          setImageUrl(null);
          setIsLoading(false);
        });
    }, 800); // debounce

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [scientificName]);

  return (
    <div className="bg-gray-200 rounded-lg my-2 h-48">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={scientificName}
          className="w-full object-contain max-h-48"
        />
      ) : !isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <span className="text-center m-auto text-gray-400 material-symbols-outlined text-2xl">
            hide_image
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
