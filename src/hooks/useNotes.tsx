import { useState, useEffect, useCallback, useMemo } from 'react';

// 在加载笔记前验证笔记是否有效
const isValidNote = (note: NoteData): boolean => {
  return note.title.trim() !== '' && note.body.trim() !== '';
}

// 验证并转换原始数据为 NoteData
const validateAndConvertNote = (item: unknown): NoteData | null => {
  if (
    item &&
    typeof item === 'object' &&
    'id' in item &&
    'title' in item &&
    'body' in item &&
    'createdAt' in item &&
    'updatedAt' in item &&
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    typeof item.body === 'string' &&
    typeof item.createdAt === 'string' &&
    typeof item.updatedAt === 'string'
  ) {
    // 创建 NoteData 对象
    const convertedNote: NoteData = {
      id: item.id,
      title: item.title,
      body: item.body,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    }

    if (isValidNote(convertedNote)) {
      return convertedNote;
    }
  }
  return null
}

// 初始加载函数，异步加载note数据
const loadInitialNotes = (): Promise<NoteData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const saved = localStorage.getItem('notesapp-notes');
      if (!saved) {
        resolve([]);
        return;
      }

      try {
        const parsed = JSON.parse(saved);
        if (!Array.isArray(parsed)) {
          console.warn('localStroage存储的数据无效');
          resolve([]);
          return;
        }

        const validNotes = parsed.map(validateAndConvertNote).filter((note): note is NoteData => note !== null);
        resolve(validNotes);
      } catch (error) {
        console.error('解析数据失败:', error);
        resolve([]);
      }
    }, 0);
  });
}

export const useNotes = () => {
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [currentNote, setCurrentNote] = useState<NoteData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 初始化时从 localStorage 异步加载笔记
  useEffect(() => {
    const initializeNotes = async () => {
      const initialNotes = await loadInitialNotes();
      setNotes(initialNotes);
      setIsLoading(false);
    }

    initializeNotes();
  }, []);

  // 保存笔记到 localStorage - 只保存有效的笔记
  useEffect(() => {
    if (!isLoading) {
      // 过滤掉无效的笔记
      const validNotes = notes.filter(isValidNote);
      localStorage.setItem('notesapp-notes', JSON.stringify(validNotes));
    }
  }, [notes, isLoading]);

  // 根据查询结果过滤笔记
  const filteredNotes = useMemo(() =>{
    if (!searchQuery) return notes;
    const query = searchQuery.toLowerCase();
    return notes.filter(note => 
      note.title.toLowerCase().includes(query) ||
      note.body.toLowerCase().includes(query)
    );
  }, [notes, searchQuery]);

  const saveNote = useCallback((noteToSave: NoteData) => {
    // 只有当笔记有效时才保存
    if (isValidNote(noteToSave)) {
      setNotes(prevNotes => {
        const existingIndex = prevNotes.findIndex(n => n.id === noteToSave.id);
        if (existingIndex !== -1) {
          const updatedNotes = [...prevNotes];
          updatedNotes[existingIndex] = noteToSave;
          return updatedNotes;
        } else {
          return [...prevNotes, noteToSave];
        }
      });
    }
  }, []);

  const createNewNote = useCallback(() => {
    const newNote: NoteData = {
      id: Date.now().toString(),
      title: '新建笔记',
      body: '开始记录...',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    // 新建笔记时先保存到状态，但只有当标题和内容都不为空时才会保存到 localStorage
    setNotes(prevNotes => [newNote, ...prevNotes]);
    setCurrentNote(newNote);
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    if (currentNote?.id === id) {
      setCurrentNote(null);
    }
  }, [currentNote]);

  const updateNote = useCallback((id: string, updates: Partial<NoteData>) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id ? { ...note, ...updates, updatedAt: new Date() } 
        : note
      )
    );

    if (currentNote?.id === id) {
      setCurrentNote(prevNote => 
        prevNote ? { ...prevNote, ...updates, updatedAt: new Date() } : null
      );
    }
  }, [currentNote]);

  return {
    notes: filteredNotes,
    currentNote,
    setCurrentNote,
    saveNote,
    deleteNote,
    createNewNote,
    updateNote,
    setSearchQuery,
    isLoading
  }
}