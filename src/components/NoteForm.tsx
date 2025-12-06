import React, { useEffect, useMemo, useState } from "react"

export const NoteForm = ({ note, onSave, onUpdate }: NoteFormProps) => {
  // 使用 note.id 作为 key 来强制组件在切换笔记时重新创建
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // 当 note.id 改变时，重置本地状态
  useEffect(() => {
    setTitle(note.title);
    setBody(note.body);
    setLastSaved(null);  // 重置最后保存时间
  }, [note.id]);

  // 缓存验证结果
  const validation = useMemo(() => {
    const errors: { title?: string, body?: string } = {}

    if (!title.trim()) {
      errors.title = '请输入标题';
    }
    
    if (!body.trim()) {
      errors.body = '请输入笔记内容';
    }

    return errors

  }, [title, body]);

  // 只有在验证通过时才自动保存
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      const hasErrors = Object.keys(validation).length > 0;

      if (!hasErrors) {
        const updatedNote = {
          ...note,
          title,
          body,
          updatedAt: new Date()
        };
        onSave(updatedNote);
        setLastSaved(new Date());
      }
    }, 1000);

    return () => clearTimeout(saveTimeout);
  }, [title, body, note, onSave, validation]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    onUpdate(note.id, { title: newTitle });
  }

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newBody = event.target.value;
    setBody(newBody);
    onUpdate(note.id, { body: newBody });
  }

  return (
    <div className="note-form">
      <div className="input-group">
        <input
          type="text"
          className={`title-input ${validation.title ? 'error' : ''}`}
          value={title}
          onChange={handleTitleChange}
          placeholder="标题"
        />
        {validation.title && <div className="error-message">{validation.title}</div>}
      </div>
      
      <div className="input-group">
        <textarea
          className={`body-input ${validation.body ? 'error' : ''}`}
          value={body}
          onChange={handleBodyChange}
          placeholder="开始记录..."
        />
        {validation.body && <div className="error-message">{validation.body}</div>}
      </div>
      
      {lastSaved && (
        <div className="last-saved">
          更新时间: {lastSaved.toLocaleString()}
        </div>
      )}
    </div>
  );
}