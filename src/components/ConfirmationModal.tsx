export const ConfirmationModal = ({
  isOpen,
  isDeleting,
  onConfirm,
  onCancel,
  noteTitle
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>删除笔记</h3>
        <p>您确定要删除笔记 "{noteTitle}" 吗?</p>
        <div className="modal-actions">
          <button 
            className="model-btn model-btn-danger" 
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? '删除中' : '删除'}
          </button>
          <button 
            className="model-btn model-btn-secondary" 
            onClick={onCancel}
            disabled={isDeleting}
          >
            取消
          </button>
        </div>
        {isDeleting && (
          <div className="model-deletion-progress">
            <div className="model-progress-bar">
              <div className="model-progress-fill"></div>
            </div>
            <p>正在删除笔记中，请稍候...</p>
          </div>
        )}
      </div>
    </div>
  );
}