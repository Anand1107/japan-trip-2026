'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type SaveStatus = 'idle' | 'saving' | 'saved';

type EditContextType = {
  isEditing: boolean;
  toggleEdit: () => void;
  saveStatus: SaveStatus;
  markSaved: () => void;
};

const EditContext = createContext<EditContextType>({
  isEditing: false,
  toggleEdit: () => {},
  saveStatus: 'idle',
  markSaved: () => {},
});

export function EditProvider({ children }: { children: ReactNode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  const markSaved = useCallback(() => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 400);
  }, []);

  const toggleEdit = useCallback(() => {
    if (isEditing) {
      markSaved();
    }
    setIsEditing((prev) => !prev);
  }, [isEditing, markSaved]);

  return (
    <EditContext.Provider value={{ isEditing, toggleEdit, saveStatus, markSaved }}>
      <div className={isEditing ? 'edit-mode' : ''}>
        {children}
      </div>
    </EditContext.Provider>
  );
}

export function useEdit() {
  return useContext(EditContext);
}
