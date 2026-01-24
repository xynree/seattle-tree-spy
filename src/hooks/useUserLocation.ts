import type { MapViewState } from "deck.gl";
import { useEffect, useState } from "react";

const SEATTLE_FALLBACK_VIEW = {
  longitude: -122.335167,
  latitude: 47.608013,
  zoom: 18,
  pitch: 50,
};

export function useUserLocation() {
  const [viewState, setViewState] = useState<MapViewState>(
    SEATTLE_FALLBACK_VIEW,
  );

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setViewState((vs: MapViewState) => ({
          ...vs,
          longitude: pos.coords.longitude,
          latitude: pos.coords.latitude,
        }));
      },
      () => {},
      { enableHighAccuracy: true },
    );
  }, []);

  return [viewState, setViewState] as const;
}
