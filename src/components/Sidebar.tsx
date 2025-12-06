import { JSX, memo, useMemo } from "react";

export const SidebarComponent: (props: SidebarProps) => JSX.Element = ({
  notes, 
  currentNote, 
  onSelectNote, 
  onDeleteNote 
}) => {
  // 按修改时间倒序排序
  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [notes]);

  return (
    <div className="notes-list">
      {sortedNotes.map(note => (
        <div
          key={note.id}
          className={`note-item ${currentNote?.id === note.id ? 'active' : ''}`}
          onClick={() => onSelectNote(note)}
        >
          <div className="note-preview">
            <h3 className="note-title">{note.title.substring(0, 15)}{note.title.length > 15 ? '...' : ''}</h3>
            <p className="note-body">{note.body.substring(0, 20)}{note.body.length > 20 ? '...' : ''}</p>
            <div className="note-meta">
              {new Date(note.updatedAt).toLocaleDateString()}
            </div>
          </div>
          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteNote(note);
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

export const Sidebar = memo(SidebarComponent);
Sidebar.displayName = 'Sidebar';