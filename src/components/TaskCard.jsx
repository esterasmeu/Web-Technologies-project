import { useApp } from '../contexts/AppContext';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
};

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const TaskCard = ({ task, onClick }) => {
  const { getUserById } = useApp();
  
  const creator = getUserById(task.creatorId);
  const assignee = task.assigneeId ? getUserById(task.assigneeId) : null;

  return (
    <div
      className={`task-card priority-${task.priority}`}
      onClick={() => onClick(task.id)}
    >
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-badges">
          <span className={`task-status status-${task.status.toLowerCase()}`}>
            {task.status.replace('_', ' ')}
          </span>
          <span className={`task-priority priority-${task.priority}`}>
            {task.priority}
          </span>
        </div>
      </div>
      <p className="task-description">{truncateText(task.description, 100)}</p>
      <div className="task-meta">
        <span className="task-assignee">
          {assignee ? `Assigned to: ${assignee.fullName}` : 'Unassigned'}
        </span>
        <span className="task-date">{formatDate(task.createdAt)}</span>
      </div>
    </div>
  );
};
