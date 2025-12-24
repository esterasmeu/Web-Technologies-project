import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { TaskCard } from './TaskCard';
import { TaskModal } from './TaskModal';
import { ChatBox } from './ChatBox';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

export const AdminView = () => {
  const {
    users,
    tasks,
    getManagers,
    addUser,
    getTasksByStatus,
    getAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
  } = useApp();

  const [activeTab, setActiveTab] = useState('users');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [taskStatusFilter, setTaskStatusFilter] = useState('all');
  
  // Form states
  const [newUsername, setNewUsername] = useState('');
  const [newFullname, setNewFullname] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('user');
  const [newManager, setNewManager] = useState('');
  const [annTitle, setAnnTitle] = useState('');
  const [annMessage, setAnnMessage] = useState('');
  const [editingAnnId, setEditingAnnId] = useState(null);
  const [editAnnTitle, setEditAnnTitle] = useState('');
  const [editAnnMessage, setEditAnnMessage] = useState('');

  const handleAddUser = (e) => {
    e.preventDefault();
    addUser({
      username: newUsername,
      fullName: newFullname,
      password: newPassword,
      role: newRole,
      managerId: newManager ? parseInt(newManager) : null
    });
    // Reset form
    setNewUsername('');
    setNewFullname('');
    setNewPassword('');
    setNewRole('user');
    setNewManager('');
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

  const handleDeleteAnnouncement = (annId) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      deleteAnnouncement(annId);
    }
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

  const filteredTasks = getTasksByStatus(taskStatusFilter);
  const announcements = getAnnouncements();
  const totalUsers = users.filter(u => u.role !== 'admin').length;
  const managers = users.filter(u => u.role === 'manager').length;
  const activeTasks = tasks.filter(t => t.status !== 'CLOSED').length;

  return (
    <div className="view active">
      <div className="container">
        <nav className="nav-tabs">
          <button className={`nav-tab ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
            Users
          </button>
          <button className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            Overview
          </button>
          <button className={`nav-tab ${activeTab === 'tasks' ? 'active' : ''}`} onClick={() => setActiveTab('tasks')}>
            Tasks
          </button>
          <button className={`nav-tab ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')}>
            Chat
          </button>
          <button className={`nav-tab ${activeTab === 'announcements' ? 'active' : ''}`} onClick={() => setActiveTab('announcements')}>
            Announcements
          </button>
        </nav>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="tab-content active">
            <div className="section">
              <h2>Add New User</h2>
              <form onSubmit={handleAddUser} className="form-inline">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="new-username">Username</label>
                    <input
                      type="text"
                      id="new-username"
                      className="form-control"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="new-fullname">Full Name</label>
                    <input
                      type="text"
                      id="new-fullname"
                      className="form-control"
                      value={newFullname}
                      onChange={(e) => setNewFullname(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="new-password">Password</label>
                    <input
                      type="password"
                      id="new-password"
                      className="form-control"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="new-role">Role</label>
                    <select
                      id="new-role"
                      className="form-control"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      required
                    >
                      <option value="user">User</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>
                  {newRole === 'user' && (
                    <div className="form-group">
                      <label htmlFor="new-manager">Assign Manager</label>
                      <select
                        id="new-manager"
                        className="form-control"
                        value={newManager}
                        onChange={(e) => setNewManager(e.target.value)}
                      >
                        <option value="">None</option>
                        {getManagers().map(manager => (
                          <option key={manager.id} value={manager.id}>{manager.fullName}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  <button type="submit" className="btn btn-primary">Add User</button>
                </div>
              </form>
            </div>

            <div className="section">
              <h2>All Users</h2>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Full Name</th>
                      <th>Role</th>
                      <th>Manager</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.filter(u => u.role !== 'admin').map(user => {
                      const manager = user.managerId ? users.find(u => u.id === user.managerId) : null;
                      return (
                        <tr key={user.id}>
                          <td>{user.username}</td>
                          <td>{user.fullName}</td>
                          <td>{user.role}</td>
                          <td>{manager ? manager.fullName : '-'}</td>
                          <td>Active</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="tab-content active">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Users</h3>
                <p className="stat-value">{totalUsers}</p>
              </div>
              <div className="stat-card">
                <h3>Managers</h3>
                <p className="stat-value">{managers}</p>
              </div>
              <div className="stat-card">
                <h3>Total Tasks</h3>
                <p className="stat-value">{tasks.length}</p>
              </div>
              <div className="stat-card">
                <h3>Active Tasks</h3>
                <p className="stat-value">{activeTasks}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="tab-content active">
            <div className="section">
              <div className="section-header">
                <h2>All Tasks</h2>
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
                    <option value="CLOSED">Closed</option>
                  </select>
                </div>
              </div>
              <div className="tasks-grid">
                {filteredTasks.length === 0 ? (
                  <div className="empty-state">
                    <h3>No tasks found</h3>
                    <p>There are no tasks matching the current filter.</p>
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

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="tab-content active">
            <div className="chat-container">
              <h2>Manager Communication</h2>
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
            </div>

            <div className="section">
              <h2>All Announcements</h2>
              <div className="announcements-grid">
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
