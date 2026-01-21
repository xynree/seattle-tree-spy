import type { ControlOptions } from "../types/controls.types";

type ControlsOverlayProps = {
  options: ControlOptions,
  setOptions: React.Dispatch<React.SetStateAction<ControlOptions>>
};

export default function ControlsOverlay({ options, setOptions }: ControlsOverlayProps) {
  function handleChange(checked: boolean, id: string) {
    setOptions({
      showRemoved: id === "show-removed" ? checked : options.showRemoved,
      showPrivate: id === "show-private" ? checked : options.showPrivate,
      showPlanned: id === "show-planned" ? checked : options.showPlanned
    })
  };

  return (
    <div className=" bg-white rounded-xl z-10 absolute left-8 top-4 p-4 shadow-md">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="show-removed"
          checked={options.showRemoved}
          onChange={(e) => handleChange(e.target.checked, e.target.id)}
        />

        <label htmlFor="show-removed" className="text-sm">
          Removed
        </label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="show-planned"
          checked={options.showPlanned}
          onChange={(e) => handleChange(e.target.checked, e.target.id)}
        />
        <label htmlFor="show-private" className="text-sm">
          Planned
        </label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="show-private"
          checked={options.showPrivate}
          onChange={(e) => handleChange(e.target.checked, e.target.id)}
        />
        <label htmlFor="show-private" className="text-sm">
          Privately Owned
        </label>
      </div>
    </div>
  );
}