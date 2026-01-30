import type { TreeFeature, TreeProperties } from "../types";

export default function MousePopup({
  popup,
}: {
  popup: {
    x: number;
    y: number;
    feature: TreeFeature;
  };
}) {
  const p = popup.feature.properties;

  const VIEWABLE_PROPS: (keyof TreeProperties)[] = ["DIAM", "SCIENTIFIC_NAME"];

  return (
    <div
      className="fixed bg-white p-2 rounded-md text-sm z-10"
      style={{ top: popup.y, left: popup.x }}
    >
      <div style={{ fontWeight: 600, marginBottom: 6 }}>
        {p.COMMON_NAME || "Unknown Tree"}
      </div>
      {VIEWABLE_PROPS.map((prop) => (
        <div className="text-xs" key={prop}>
          <span className="font-medium">{prop}</span>: {p[prop] ?? ""}
        </div>
      ))}
    </div>
  );
}
