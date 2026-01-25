import { useMemo } from "react";
import type { TreeFeature } from "../types";
import WikipediaImage from "./WikipediaImage";

export default function FeatureCard({
  feature,
}: {
  feature: TreeFeature | null;
}) {
  const properties = useMemo(() => {
    if (feature) {
      return Object.entries(feature.properties).filter(([, value]) => value);
    } else return null;
  }, [feature]);

  return properties ? (
    <div className="flex flex-col overflow-auto relative min-w-96 bg-white p-3 rounded-xl max-w-2xl z-10 shadow-md">
      <div style={{ fontWeight: 600, marginBottom: 6 }}>
        🌳 {feature.properties.COMMON_NAME || "Unknown Tree"}
      </div>

      <div className="italic"> {feature.properties.SCIENTIFIC_NAME || "—"}</div>

      <WikipediaImage scientificName={feature.properties.SCIENTIFIC_NAME} />

      <div className="flex flex-col overflow-auto gap-1">
        {properties.map(([title, value]) => (
          <div className="text-sm" key={title}>
            <span className="font-medium">{title}</span>:{" "}
            <span className="whitespace-break-spaces">{value}</span>
          </div>
        ))}
      </div>
    </div>
  ) : (
    ""
  );
}
