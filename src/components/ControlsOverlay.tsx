import { useState } from "react";

type ControlsOverlayProps = {
  onStateChange?: (state: { showRemoved: boolean }) => void;
};

export default function ControlsOverlay({ onStateChange }: ControlsOverlayProps) {
  const [showRemoved, setShowRemoved] = useState(false);

  const handleChange = (checked: boolean) => {
    setShowRemoved(checked);
    onStateChange?.({ showRemoved: checked });
  };

  return (
    <div className="w-48 h-24 bg-white rounded-xl z-10 absolute left-8 top-4 p-4 shadow-md">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="show-removed"
          checked={showRemoved}
          onChange={(e) => handleChange(e.target.checked)}
        />
        <label htmlFor="show-removed" className="text-sm">
          Show Removed Trees
        </label>
      </div>
    </div>
  );
}