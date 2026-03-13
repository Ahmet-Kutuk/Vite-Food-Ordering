import { EMOJIS } from "../constants/initialMenu";

interface EmojiPickerProps {
  selected: string;
  onChange: (emoji: string) => void;
}

export default function EmojiPicker({ selected, onChange }: EmojiPickerProps) {
  return (
    <div className="mb-4">
      <label className="form-label fw-semibold small text-uppercase text-muted ls-05">
        Emoji
      </label>
      <div className="text-center fs-1 mb-2">{selected}</div>
      <div className="emoji-grid p-2 rounded-3 border bg-light">
        {EMOJIS.map((e) => (
          <button
            key={e}
            className={`emoji-btn ${selected === e ? "selected" : ""}`}
            onClick={() => onChange(e)}
          >
            {e}
          </button>
        ))}
      </div>
    </div>
  );
}
