import clsx from 'clsx';
import * as React from 'react';

export default function TagSelector({
  tags,
  onChange,
}: {
  tags: string[];
  onChange: (selectedTags: string[]) => unknown;
}) {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  return (
    <div className='text-xs'>
      {tags.map((tag) => (
        <button
          key={tag}
          className={clsx(
            'mb-2 mr-4 bg-gray-200 px-3 py-1 hover:bg-gray-300',
            selectedTags.indexOf(tag) === -1
              ? ''
              : 'bg-indigo-300 hover:bg-indigo-300'
          )}
          onClick={() => {
            const index = selectedTags.indexOf(tag);
            let toggle = selectedTags;
            if (index === -1) {
              toggle = [...selectedTags, tag];
            } else {
              toggle = toggle.slice(0, index).concat(toggle.slice(index + 1));
            }
            setSelectedTags(toggle);
            onChange(toggle);
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
