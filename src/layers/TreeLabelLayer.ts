import { TextLayer } from "@deck.gl/layers";
import type { ControlOptions, TreeFeature } from "../types";
import { processTrees } from "../helpers";

export function TreeLabelLayer({
  trees,
  options,
  zoom,
}: {
  trees: TreeFeature[];
  options: ControlOptions;
  zoom: number;
}): TextLayer {
  return new TextLayer<TreeFeature>({
    id: "tree-labels",
    data: processTrees(trees, options),
    pickable: false,
    getPosition: (f: TreeFeature) => [
      f.geometry.coordinates[0],
      f.geometry.coordinates[1],
      0,
    ],
    parameters: {
      //@ts-expect-error type
      depthTest: false,
    },

    getText: (f: TreeFeature) =>
      f.properties?.COMMON_NAME || f.properties?.SCIENTIFIC_NAME || "",

    getSize: () => {
      const scaleFactor = Math.max(1, Math.min(2, zoom / 20));
      return 10 * scaleFactor;
    },

    getColor: [255, 255, 255, 255],

    sizeMinPixels: 2,
    sizeMaxPixels: 20,

    getTextAnchor: "middle",
    getAlignmentBaseline: "top",

    billboard: true,
    background: true,
    backgroundPadding: [8, 4],
    getBackgroundColor: [0, 0, 0, 255],
    backgroundBorderRadius: 12,
    fontFamily: "sans-serif",
  });
}
