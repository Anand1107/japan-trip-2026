'use client';

import { useEffect, useRef } from 'react';
import { useEdit } from './EditContext';

type Props = {
  storageKey: string;
  defaultValue: string;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  tag?: string;
};

export default function EditableText({
  storageKey,
  defaultValue,
  className = '',
  multiline = false,
  placeholder = 'Click to edit...',
  tag = 'span',
}: Props) {
  const { isEditing, markSaved } = useEdit();
  const ref = useRef<HTMLElement>(null);
  const key = `edit_${storageKey}`;

  useEffect(() => {
    if (ref.current) {
      const saved = localStorage.getItem(key);
      ref.current.textContent = saved ?? defaultValue;
    }
  }, [key, defaultValue]);

  const handleInput = () => {
    if (ref.current) {
      localStorage.setItem(key, ref.current.textContent ?? '');
      markSaved();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      (ref.current as HTMLElement)?.blur();
    }
  };

  const Tag = tag as React.ElementType;

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      contentEditable={isEditing}
      suppressContentEditableWarning
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      data-placeholder={placeholder}
      className={`editable-field ${className}`}
      style={{ outline: 'none', minWidth: '2em' }}
    />
  );
}
