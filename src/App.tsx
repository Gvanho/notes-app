import { JSX, useCallback, useState } from 'react';
import { useNotes } from './hooks/useNotes';
import { ConfirmationModal } from './components/ConfirmationModal';
import { Sidebar } from './components/Sidebar';
import { SearchBar } from './components/SearchBar';
import { NoteForm } from './components/NoteForm';
import './style.css';

const App: () => JSX.Element = () => {
  const {
    notes,
    currentNote,
    setCurrentNote,
    saveNote,
    deleteNote,
    createNewNote,
    updateNote,
    setSearchQuery
  } = useNotes();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<NoteData | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = useCallback((note: NoteData) => {
    if (note.title.trim() && note.body.trim()) {
      saveNote(note);
    }
  }, [saveNote]);

  const handleDeleteClick = (note: NoteData) => {
    setNoteToDelete(note);
    setIsDeleteModalOpen(true);
  }

  const confirmDelete = async () => {
    if (noteToDelete) {
      setIsDeleting(true);
      // 模拟等待5秒删除时间
      await new Promise(resolve => setTimeout(resolve, 5000));
      deleteNote(noteToDelete.id);
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setNoteToDelete(null);
      if (currentNote?.id === noteToDelete.id) {
        setCurrentNote(null);
      }
    }
  }

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setNoteToDelete(null);
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  }

  return (
    <div className="app">
      <div className='sidebar'>
        <div className="sidebar-header">
          <h2>Notes</h2>
          <button className="new-note-btn" onClick={createNewNote}>
            添加新的笔记 📒
          </button>
        </div>

        <SearchBar onSearch={handleSearch} />

        <Sidebar
          notes={notes}
          currentNote={currentNote}
          onSelectNote={setCurrentNote}
          onDeleteNote={handleDeleteClick}
        />
      </div>

      <div className="editor">
        {currentNote ? (
          <NoteForm
            note={currentNote}
            onSave={handleSave}
            onUpdate={updateNote}
          />
        ) : (
          <div className="empty-state">
            <p>请选择笔记或者新建笔记</p>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        isDeleting={isDeleting}
        onConfirm={confirmDelete}
        onCancel={handleCancelDelete}
        noteTitle={noteToDelete?.title || ''}
      />
    </div>
  );

}

export default App;