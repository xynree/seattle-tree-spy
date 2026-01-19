import { useEffect, useState } from "react";

type WikipediaImageProps = {
  scientificName: string;
  width?: number;
};

// Simple in-memory cache
const imageCache: Record<string, string | null> = {};

export default function WikipediaImage({ scientificName, width = 100 }: WikipediaImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!scientificName) return;

    // Check cache first
    if (scientificName in imageCache) {
      setImageUrl(imageCache[scientificName]);
      return;
    }

    const fetchImage = async () => {
      try {
        const title = encodeURIComponent(scientificName);
        const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);
        const data = await res.json();
        const url = data.thumbnail?.source || null;
        imageCache[scientificName] = url; // save to cache
        setImageUrl(url);
      } catch (err) {
        console.error("Failed to fetch Wikipedia image:", err);
        imageCache[scientificName] = null; // cache failure
        setImageUrl(null);
      }
    };

    fetchImage();
  }, [scientificName]);

  if (!imageUrl) return null;

  return (
    <img
      src={imageUrl}
      alt={scientificName}
      style={{ width, height: "auto", marginBottom: 6, borderRadius: 4 }}
    />
  );
}