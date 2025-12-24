import { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

export const TaskModal = ({ taskId, onClose }) => {
  const {
    currentUser,
    tasks,
    getUserById,
    getManagers,
    getUsersByManager,
    assignTask,
    completeTask,
    approveCompletion,
    closeTask,
    updateTask,
    deleteTask
  } = useApp();

  const [completionDetails, setCompletionDetails] = useState('');
  const [completionFiles, setCompletionFiles] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPriority, setEditPriority] = useState('medium');
  const [editAssigneeId, setEditAssigneeId] = useState(null);

  const task = tasks.find(t => t.id === taskId);

  useEffect(() => {
    if (!task) onClose();
    if (task) {
      setEditTitle(task.title);
      setEditDescription(task.description);
      setEditPriority(task.priority);
      setEditAssigneeId(task.assigneeId);
      setEditMode(false);
    }
  }, [task, onClose]);

  if (!task) return null;

  const creator = getUserById(task.creatorId);
  const assignee = task.assigneeId ? getUserById(task.assigneeId) : null;
  const canEditTask = currentUser.role === 'admin' || (currentUser.role === 'manager' && task.creatorId === currentUser.id);

  const handleAssignTask = () => {
    if (selectedUserId) {
      assignTask(task.id, parseInt(selectedUserId));
      onClose();
    }
  };

  const handleCompleteTask = () => {
    completeTask(task.id, completionDetails, completionFiles);
    onClose();
  };

  const handleApproveCompletion = () => {
    approveCompletion(task.id);
    onClose();
  };

  const handleCloseTask = () => {
    closeTask(task.id);
    onClose();
  };

  const handleDeleteTask = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
      onClose();
    }
  };

  const handleSaveEdits = () => {
    if (!editTitle.trim() || !editDescription.trim()) {
      alert('Title and description are required.');
      return;
    }
    
    const updates = {
      title: editTitle.trim(),
      description: editDescription.trim(),
      priority: editPriority
    };
    
    // Handle assignee change
    if (editAssigneeId !== task.assigneeId) {
      updates.assigneeId = editAssigneeId;
      // Update status based on assignment
      if (editAssigneeId === null) {
        updates.status = 'OPEN';
      } else if (task.status === 'OPEN') {
        updates.status = 'PENDING';
      }
    }
    
    updateTask(task.id, updates);
    setEditMode(false);
  };

  const handleCancelEdits = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditPriority(task.priority);
    setEditAssigneeId(task.assigneeId);
    setEditMode(false);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).map(f => ({
      name: f.name,
      size: f.size
    }));
    setCompletionFiles(files);
  };

  const isCompleteButtonEnabled = completionDetails.trim() !== '' && completionFiles.length > 0;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editMode ? (
            <input
              className="form-control"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Task Title"
              style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
            />
          ) : task.title}</h2>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {canEditTask && !editMode && (
              <button onClick={() => setEditMode(true)} className="btn btn-edit btn-small">
                Edit
              </button>
            )}
            {editMode && (
              <button onClick={handleSaveEdits} className="btn btn-primary btn-small">Save</button>
            )}
            <button className="modal-close" onClick={onClose}>&times;</button>
          </div>
        </div>
        <div className="modal-body">
          <div className="task-detail-grid">
            <div className="detail-item">
              <label>Status</label>
              <span className={`task-status status-${task.status.toLowerCase()}`}>
                {task.status.replace('_', ' ')}
              </span>
            </div>
            <div className="detail-item">
              <label>Priority</label>
              {editMode ? (
                <select
                  className="form-control"
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                  style={{ maxWidth: '150px' }}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              ) : (
                <span className={`task-priority priority-${task.priority}`}>
                  {task.priority}
                </span>
              )}
            </div>
            <div className="detail-item">
              <label>Created By</label>
              <span>{creator?.fullName || 'Unknown'}</span>
            </div>
            <div className="detail-item">
              <label>Assigned To</label>
              {editMode && canEditTask ? (
                <select
                  className="form-control"
                  value={editAssigneeId || ''}
                  onChange={(e) => setEditAssigneeId(e.target.value ? parseInt(e.target.value) : null)}
                  style={{ maxWidth: '200px' }}
                >
                  <option value="">Unassigned</option>
                  {getUsersByManager(task.creatorId).map(user => (
                    <option key={user.id} value={user.id}>{user.fullName}</option>
                  ))}
                </select>
              ) : (
                <span>{assignee?.fullName || 'Unassigned'}</span>
              )}
            </div>
            <div className="detail-item full-width">
              <label>Description</label>
              {editMode ? (
                <textarea
                  className="form-control"
                  rows="4"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Task description"
                />
              ) : (
                <p>{task.description}</p>
              )}
            </div>
            <div className="detail-item">
              <label>Created</label>
              <span>{formatDateTime(task.createdAt)}</span>
            </div>
            <div className="detail-item">
              <label>Last Updated</label>
              <span>{formatDateTime(task.updatedAt)}</span>
            </div>
            
            {task.status === 'COMPLETION_REQUESTED' && task.completionDetails && (
              <div className="detail-item full-width">
                <label>Completion Details</label>
                <p>{task.completionDetails}</p>
                {task.completionFiles && task.completionFiles.length > 0 && (
                  <div>
                    <strong>Files:</strong>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {task.completionFiles.map((file, idx) => (
                        <li key={idx} style={{ marginBottom: '0.5rem' }}>
                          <a 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              alert(`File: ${file.name}\nSize: ${Math.round(file.size / 1024)}KB`);
                            }}
                            style={{ 
                              color: 'var(--primary-color)', 
                              textDecoration: 'none',
                              cursor: 'pointer',
                              fontWeight: '500'
                            }}
                            onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                            onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                          >
                            {file.name} ({Math.round(file.size / 1024)}KB)
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Manager Actions */}
          {currentUser.role === 'manager' && task.creatorId === currentUser.id && (
            <div className="modal-actions">
              {task.status === 'OPEN' && (
                <div id="assign-user-group">
                  <label htmlFor="assign-user-select">Assign to User</label>
                  <select
                    id="assign-user-select"
                    className="form-control"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                  >
                    <option value="">Select a user</option>
                    {getUsersByManager(currentUser.id).map(user => (
                      <option key={user.id} value={user.id}>{user.fullName}</option>
                    ))}
                  </select>
                  <button onClick={handleAssignTask} className="btn btn-primary">
                    Assign Task
                  </button>
                </div>
              )}
              
              {task.status === 'COMPLETION_REQUESTED' && (
                <button onClick={handleApproveCompletion} className="btn btn-primary">
                  Approve completion
                </button>
              )}
              
              {task.status === 'COMPLETED' && (
                <button onClick={handleCloseTask} className="btn btn-success">
                  Mark as Closed
                </button>
              )}
              
              <button onClick={handleDeleteTask} className="btn btn-danger">
                Delete Task
              </button>
            </div>
          )}

          {/* User Actions */}
          {currentUser.role === 'user' && task.assigneeId === currentUser.id && task.status === 'PENDING' && (
            <div className="modal-actions">
              <div className="form-group">
                <label htmlFor="completion-details">Completion Details</label>
                <textarea
                  id="completion-details"
                  className="form-control"
                  rows="4"
                  placeholder="Describe what you've accomplished and provide any relevant details..."
                  value={completionDetails}
                  onChange={(e) => setCompletionDetails(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="completion-files">Attach Files *</label>
                <input
                  type="file"
                  id="completion-files"
                  className="form-control"
                  multiple
                  onChange={handleFileChange}
                />
                {completionFiles.length > 0 && (
                  <small className="form-text">
                    {completionFiles.length} file(s) selected
                  </small>
                )}
              </div>
              <button
                onClick={handleCompleteTask}
                className="btn btn-success"
                disabled={!isCompleteButtonEnabled}
              >
                Mark as Completed
              </button>
            </div>
          )}

          {/* Admin View */}
          {currentUser.role === 'admin' && (
            <div className="modal-actions">
              <button onClick={handleDeleteTask} className="btn btn-danger">
                Delete Task
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
