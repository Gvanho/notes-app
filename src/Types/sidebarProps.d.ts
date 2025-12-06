interface SidebarProps {
  notes: NoteData[];
  currentNote: NoteData | null;
  onSelectNote: (note: NoteData) => void;
  onDeleteNote: (note: NoteData) => void;
}