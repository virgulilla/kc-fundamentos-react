type Props = {
  tags: string[];
  selected: string[];
  onToggle: (tag: string) => void;
};

export function TagsSelector({ tags, selected, onToggle }: Props) {
  return (
    <fieldset>
      <legend className="text-sm font-medium mb-2">Tags</legend>
      <div className="flex flex-wrap gap-4">
        {tags.map((tag) => (
          <label key={tag} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              value={tag}
              checked={selected.includes(tag)}
              onChange={() => onToggle(tag)}
              className="accent-primary"
            />
            {tag}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
