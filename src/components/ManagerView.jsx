import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { TaskCard } from './TaskCard';
import { TaskModal } from './TaskModal';
import { ChatBox } from './ChatBox';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

export const ManagerView = () => {
  const {
    currentUser,
    createTask,
    getTasksCreatedByManager,
    getUsersByManager,
    getTasksForUser,
    createAnnouncement,
    updateAnnouncement,
    getAnnouncements,
    deleteAnnouncement
  } = useApp();

  const [activeTab, setActiveTab] = useState('tasks');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [taskStatusFilter, setTaskStatusFilter] = useState('all');
  const [selectedTeamMember, setSelectedTeamMember] = useState('');
  
  // Create task form
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium');
  
  // Announcement form
  const [annTitle, setAnnTitle] = useState('');
  const [annMessage, setAnnMessage] = useState('');
  const [editingAnnId, setEditingAnnId] = useState(null);
  const [editAnnTitle, setEditAnnTitle] = useState('');
  const [editAnnMessage, setEditAnnMessage] = useState('');

  const handleCreateTask = (e) => {
    e.preventDefault();
    createTask({
      title: taskTitle,
      description: taskDescription,
      priority: taskPriority
    });
    setTaskTitle('');
    setTaskDescription('');
    setTaskPriority('medium');
    alert('Task created successfully!');
  };

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    createAnnouncement({
      title: annTitle,
      message: annMessage
    });
    setAnnTitle('');
    setAnnMessage('');
    alert('Announcement published!');
  };

  const startEditAnnouncement = (ann) => {
    setEditingAnnId(ann.id);
    setEditAnnTitle(ann.title);
    setEditAnnMessage(ann.message);
  };

  const handleSaveAnnouncement = (e) => {
    e.preventDefault();
    if (!editingAnnId) return;
    if (!editAnnTitle.trim() || !editAnnMessage.trim()) {
      alert('Title and message are required.');
      return;
    }
    updateAnnouncement(editingAnnId, {
      title: editAnnTitle.trim(),
      message: editAnnMessage.trim()
    });
    setEditingAnnId(null);
    setEditAnnTitle('');
    setEditAnnMessage('');
  };

  const handleCancelEditAnnouncement = () => {
    setEditingAnnId(null);
    setEditAnnTitle('');
    setEditAnnMessage('');
  };

  const handleDeleteAnnouncement = (annId) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      deleteAnnouncement(annId);
    }
  };

  const myTasks = getTasksCreatedByManager(currentUser.id);
  const filteredTasks = taskStatusFilter === 'all' 
    ? myTasks 
    : myTasks.filter(t => t.status === taskStatusFilter);
  
  const teamMembers = getUsersByManager(currentUser.id);
  const teamMemberTasks = selectedTeamMember 
    ? getTasksForUser(parseInt(selectedTeamMember))
    : [];
  
  const announcements = getAnnouncements();

  return (
    <div className="view active">
      <div className="container">
        <nav className="nav-tabs">
          <button className={`nav-tab ${activeTab === 'tasks' ? 'active' : ''}`} onClick={() => setActiveTab('tasks')}>
            All Tasks
          </button>
          <button className={`nav-tab ${activeTab === 'create' ? 'active' : ''}`} onClick={() => setActiveTab('create')}>
            Create Task
          </button>
          <button className={`nav-tab ${activeTab === 'team' ? 'active' : ''}`} onClick={() => setActiveTab('team')}>
            Team History
          </button>
          <button className={`nav-tab ${activeTab === 'team-chat' ? 'active' : ''}`} onClick={() => setActiveTab('team-chat')}>
            Team Chat
          </button>
          <button className={`nav-tab ${activeTab === 'admin-chat' ? 'active' : ''}`} onClick={() => setActiveTab('admin-chat')}>
            Managers & Admin
          </button>
          <button className={`nav-tab ${activeTab === 'announcements' ? 'active' : ''}`} onClick={() => setActiveTab('announcements')}>
            Announcements
          </button>
        </nav>

        {/* All Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="tab-content active">
            <div className="section">
              <div className="section-header">
                <h2>Task Management</h2>
                <div className="filter-group">
                  <select
                    className="form-control"
                    value={taskStatusFilter}
                    onChange={(e) => setTaskStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="OPEN">Open</option>
                    <option value="PENDING">Pending</option>
                    <option value="COMPLETION_REQUESTED">Awaiting Approval</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
              </div>
              <div className="tasks-grid">
                {filteredTasks.length === 0 ? (
                  <div className="empty-state">
                    <h3>No tasks found</h3>
                    <p>You haven't created any tasks yet.</p>
                  </div>
                ) : (
                  filteredTasks.map(task => (
                    <TaskCard key={task.id} task={task} onClick={setSelectedTaskId} />
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Create Task Tab */}
        {activeTab === 'create' && (
          <div className="tab-content active">
            <div className="section">
              <h2>Create New Task</h2>
              <form onSubmit={handleCreateTask}>
                <div className="form-group">
                  <label htmlFor="task-title">Task Title</label>
                  <input
                    type="text"
                    id="task-title"
                    className="form-control"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="task-description">Description</label>
                  <textarea
                    id="task-description"
                    className="form-control"
                    rows="6"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="task-priority">Priority</label>
                  <select
                    id="task-priority"
                    className="form-control"
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Create Task</button>
              </form>
            </div>
          </div>
        )}

        {/* Team History Tab */}
        {activeTab === 'team' && (
          <div className="tab-content active">
            <div className="section">
              <h2>Team Member Task History</h2>
              <div className="form-group">
                <label htmlFor="team-member-select">Select Team Member</label>
                <select
                  id="team-member-select"
                  className="form-control"
                  value={selectedTeamMember}
                  onChange={(e) => setSelectedTeamMember(e.target.value)}
                >
                  <option value="">Select a team member</option>
                  {teamMembers.map(member => (
                    <option key={member.id} value={member.id}>{member.fullName}</option>
                  ))}
                </select>
              </div>
              <div className="tasks-grid">
                {!selectedTeamMember ? (
                  <div className="empty-state">
                    <h3>Select a team member</h3>
                    <p>Choose a team member to view their task history.</p>
                  </div>
                ) : teamMemberTasks.length === 0 ? (
                  <div className="empty-state">
                    <h3>No tasks found</h3>
                    <p>This team member has no assigned tasks.</p>
                  </div>
                ) : (
                  teamMemberTasks.map(task => (
                    <TaskCard key={task.id} task={task} onClick={setSelectedTaskId} />
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Team Chat Tab */}
        {activeTab === 'team-chat' && (
          <div className="tab-content active">
            <div className="chat-container">
              <h2>Team Communication</h2>
              <ChatBox chatType="user-manager" />
            </div>
          </div>
        )}

        {/* Admin Chat Tab */}
        {activeTab === 'admin-chat' && (
          <div className="tab-content active">
            <div className="chat-container">
              <h2>Managers & Admin Communication</h2>
              <ChatBox chatType="manager-admin" />
            </div>
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === 'announcements' && (
          <div className="tab-content active">
            <div className="section">
              <h2>Announcements</h2>
              <form onSubmit={handleCreateAnnouncement} className="form-inline">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="announcement-title">Title</label>
                    <input
                      type="text"
                      id="announcement-title"
                      className="form-control"
                      value={annTitle}
                      onChange={(e) => setAnnTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="announcement-message">Message</label>
                    <textarea
                      id="announcement-message"
                      className="form-control"
                      rows="3"
                      value={annMessage}
                      onChange={(e) => setAnnMessage(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Publish</button>
              </form>
              <div className="announcements-grid" style={{ marginTop: '1rem' }}>
                {announcements.length === 0 ? (
                  <div className="empty-state">
                    <h3>No announcements</h3>
                    <p>There are no announcements yet.</p>
                  </div>
                ) : (
                  announcements.map(ann => (
                    <div key={ann.id} className="announcement-card">
                      <div className="announcement-header">
                        <h3 className="announcement-title">{ann.title}</h3>
                        {ann.authorId === currentUser.id && (
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => startEditAnnouncement(ann)}
                              className="btn btn-secondary btn-small"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteAnnouncement(ann.id)}
                              className="btn btn-danger btn-small"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="announcement-author">By {ann.authorName}</p>
                      <p className="announcement-date">{formatDate(ann.createdAt)}</p>
                      {editingAnnId === ann.id ? (
                        <form onSubmit={handleSaveAnnouncement} className="form-grid" style={{ display: 'grid', gap: '0.75rem' }}>
                          <input
                            className="form-control"
                            value={editAnnTitle}
                            onChange={(e) => setEditAnnTitle(e.target.value)}
                            placeholder="Title"
                            required
                          />
                          <textarea
                            className="form-control"
                            rows="3"
                            value={editAnnMessage}
                            onChange={(e) => setEditAnnMessage(e.target.value)}
                            placeholder="Message"
                            required
                          />
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <button type="submit" className="btn btn-primary btn-small">Save</button>
                            <button type="button" onClick={handleCancelEditAnnouncement} className="btn btn-secondary btn-small">Cancel</button>
                          </div>
                        </form>
                      ) : (
                        <p className="announcement-content">{ann.message}</p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedTaskId && (
        <TaskModal taskId={selectedTaskId} onClose={() => setSelectedTaskId(null)} />
      )}
    </div>
  );
};
