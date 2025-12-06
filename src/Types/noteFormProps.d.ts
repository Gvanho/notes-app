interface NoteFormProps {
  note: NoteData;
  onSave: (note: NoteData) => void;
  onUpdate: (id: string, updates: Partial<NoteData>) => void;
}