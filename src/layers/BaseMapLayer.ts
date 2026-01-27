/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BitmapLayer, TileLayer } from "deck.gl";

export function BaseMapLayer() {
  return new TileLayer({
    id: "osm-tiles",
    data: "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}.png",
    minZoom: 0,
    maxZoom: 20,
    tileSize: 256,
    renderSubLayers: (props) =>
      props.data
        ? new BitmapLayer({
            id: `${props.id}-bitmap`,
            image: props.data,
            bounds: [
              //@ts-expect-error Typing
              props.tile.bbox.west,
              //@ts-expect-error Typing

              props.tile.bbox.south,
              //@ts-expect-error Typing

              props.tile.bbox.east,
              //@ts-expect-error Typing

              props.tile.bbox.north,
            ],
          })
        : null,
  });
}
