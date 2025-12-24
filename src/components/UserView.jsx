import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { TaskCard } from './TaskCard';
import { TaskModal } from './TaskModal';
import { ChatBox } from './ChatBox';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

export const UserView = () => {
  const { currentUser, getTasksForUser, getAnnouncements } = useApp();
  
  const [activeTab, setActiveTab] = useState('mytasks');
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const myTasks = getTasksForUser(currentUser.id).filter(
    t => t.status === 'PENDING' || t.status === 'COMPLETION_REQUESTED'
  );
  
  const completedTasks = getTasksForUser(currentUser.id).filter(
    t => t.status === 'COMPLETED' || t.status === 'CLOSED'
  );
  
  const announcements = getAnnouncements();

  return (
    <div className="view active">
      <div className="container">
        <nav className="nav-tabs">
          <button className={`nav-tab ${activeTab === 'mytasks' ? 'active' : ''}`} onClick={() => setActiveTab('mytasks')}>
            My Tasks
          </button>
          <button className={`nav-tab ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
            History
          </button>
          <button className={`nav-tab ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')}>
            Chat with Manager
          </button>
          <button className={`nav-tab ${activeTab === 'announcements' ? 'active' : ''}`} onClick={() => setActiveTab('announcements')}>
            Announcements
          </button>
        </nav>

        {/* My Tasks Tab */}
        {activeTab === 'mytasks' && (
          <div className="tab-content active">
            <div className="section">
              <h2>My Assigned Tasks</h2>
              <div className="tasks-grid">
                {myTasks.length === 0 ? (
                  <div className="empty-state">
                    <h3>No active tasks</h3>
                    <p>You don't have any tasks assigned at the moment.</p>
                  </div>
                ) : (
                  myTasks.map(task => (
                    <TaskCard key={task.id} task={task} onClick={setSelectedTaskId} />
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="tab-content active">
            <div className="section">
              <h2>My Task History</h2>
              <div className="tasks-grid">
                {completedTasks.length === 0 ? (
                  <div className="empty-state">
                    <h3>No completed tasks</h3>
                    <p>You haven't completed any tasks yet.</p>
                  </div>
                ) : (
                  completedTasks.map(task => (
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
              <h2>Chat with Your Manager</h2>
              <ChatBox chatType="user-manager" />
            </div>
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === 'announcements' && (
          <div className="tab-content active">
            <div className="section">
              <h2>Announcements</h2>
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
                      </div>
                      <p className="announcement-author">By {ann.authorName}</p>
                      <p className="announcement-date">{formatDate(ann.createdAt)}</p>
                      <p className="announcement-content">{ann.message}</p>
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
