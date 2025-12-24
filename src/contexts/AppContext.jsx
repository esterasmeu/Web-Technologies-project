import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const DATA_VERSION = '2025-12-15-02';
  
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [messages, setMessages] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    loadData();
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (users.length > 0) {
      saveData();
    }
  }, [users, tasks, messages, announcements]);

  const loadData = () => {
    const usersData = localStorage.getItem('taskflow_users');
    const tasksData = localStorage.getItem('taskflow_tasks');
    const versionData = localStorage.getItem('taskflow_version');
    const messagesData = localStorage.getItem('taskflow_messages');
    const announcementsData = localStorage.getItem('taskflow_announcements');
    
    if (usersData) setUsers(JSON.parse(usersData));
    if (tasksData) setTasks(JSON.parse(tasksData));
    if (messagesData) setMessages(JSON.parse(messagesData));
    if (announcementsData) setAnnouncements(JSON.parse(announcementsData));

    // Initialize default data if needed
    if (!usersData || versionData !== DATA_VERSION) {
      initializeDefaultData();
    }
  };

  const saveData = () => {
    localStorage.setItem('taskflow_users', JSON.stringify(users));
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
    localStorage.setItem('taskflow_version', DATA_VERSION);
    localStorage.setItem('taskflow_messages', JSON.stringify(messages));
    localStorage.setItem('taskflow_announcements', JSON.stringify(announcements));
  };

  const initializeDefaultData = () => {
    const defaultUsers = [
      {
        id: 1,
        username: 'Tudor',
        password: 'adminT',
        fullName: 'Ianculescu Tudor',
        role: 'admin',
        managerId: null,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        username: 'Estera-Valentina',
        password: 'managerE',
        fullName: 'Smeu Estera-Valentina',
        role: 'manager',
        managerId: null,
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        username: 'Teodora-Florina',
        password: 'managerF',
        fullName: 'Tulea Teodora-Florina',
        role: 'manager',
        managerId: null,
        createdAt: new Date().toISOString()
      },
      {
        id: 4,
        username: 'Ioana-Rebeca',
        password: 'managerR',
        fullName: 'Vătui Ioana-Rebeca',
        role: 'manager',
        managerId: null,
        createdAt: new Date().toISOString()
      },
      {
        id: 5,
        username: 'Leyla',
        password: 'user123',
        fullName: 'Nyzamova Leyla Maksadovna',
        role: 'user',
        managerId: 2,
        createdAt: new Date().toISOString()
      },
      {
        id: 6,
        username: 'Saadet',
        password: 'user123',
        fullName: 'Paş Saadet Nur',
        role: 'user',
        managerId: 3,
        createdAt: new Date().toISOString()
      },
      {
        id: 7,
        username: 'Bogdan',
        password: 'user123',
        fullName: 'Radu Bogdan',
        role: 'user',
        managerId: 4,
        createdAt: new Date().toISOString()
      },
      {
        id: 8,
        username: 'Ana-Teodora',
        password: 'user123',
        fullName: 'Raevschi Ana-Teodora',
        role: 'user',
        managerId: 2,
        createdAt: new Date().toISOString()
      },
      {
        id: 9,
        username: 'Liviu-Mihai',
        password: 'user123',
        fullName: 'Roşu Liviu-Mihai',
        role: 'user',
        managerId: 3,
        createdAt: new Date().toISOString()
      },
      {
        id: 10,
        username: 'Mihnea-Ionuţ',
        password: 'user123',
        fullName: 'Rusu Mihnea-Ionuţ',
        role: 'user',
        managerId: 4,
        createdAt: new Date().toISOString()
      },
      {
        id: 11,
        username: 'Leonard-Florentin',
        password: 'user123',
        fullName: 'Sandu Leonard-Florentin',
        role: 'user',
        managerId: 2,
        createdAt: new Date().toISOString()
      },
      {
        id: 12,
        username: 'Diana-Maria',
        password: 'user123',
        fullName: 'Secărea Diana-Maria',
        role: 'user',
        managerId: 3,
        createdAt: new Date().toISOString()
      },
      {
        id: 13,
        username: 'Luca-Andrei',
        password: 'user123',
        fullName: 'Şerban Luca-Andrei',
        role: 'user',
        managerId: 4,
        createdAt: new Date().toISOString()
      },
      {
        id: 14,
        username: 'Nurmuhammet',
        password: 'user123',
        fullName: 'Sohbetov Nurmuhammet',
        role: 'user',
        managerId: 2,
        createdAt: new Date().toISOString()
      },
      {
        id: 15,
        username: 'Ştefan',
        password: 'user123',
        fullName: 'Stanciu Ştefan',
        role: 'user',
        managerId: 3,
        createdAt: new Date().toISOString()
      },
      {
        id: 16,
        username: 'Robert-Marius',
        password: 'user123',
        fullName: 'Stoian Robert-Marius',
        role: 'user',
        managerId: 4,
        createdAt: new Date().toISOString()
      },
      {
        id: 17,
        username: 'Mihai-Alexandru',
        password: 'user123',
        fullName: 'Stoian Mihai-Alexandru',
        role: 'user',
        managerId: 2,
        createdAt: new Date().toISOString()
      },
      {
        id: 18,
        username: 'Stela',
        password: 'user123',
        fullName: 'Stoimenova Stela Stefanova',
        role: 'user',
        managerId: 3,
        createdAt: new Date().toISOString()
      },
      {
        id: 19,
        username: 'Mara-Bianca',
        password: 'user123',
        fullName: 'Sűtő Mara-Bianca',
        role: 'user',
        managerId: 4,
        createdAt: new Date().toISOString()
      },
      {
        id: 20,
        username: 'Alin-Mihai',
        password: 'user123',
        fullName: 'Tanislav Alin-Mihai',
        role: 'user',
        managerId: 2,
        createdAt: new Date().toISOString()
      },
      {
        id: 21,
        username: 'Eduard-Andrei',
        password: 'user123',
        fullName: 'Ticu-Jianu Eduard-Andrei',
        role: 'user',
        managerId: 3,
        createdAt: new Date().toISOString()
      },
      {
        id: 22,
        username: 'Daria-Elena',
        password: 'user123',
        fullName: 'Toma Daria-Elena',
        role: 'user',
        managerId: 4,
        createdAt: new Date().toISOString()
      },
      {
        id: 23,
        username: 'Bianca-Mihaela',
        password: 'user123',
        fullName: 'Toma Bianca-Mihaela',
        role: 'user',
        managerId: 2,
        createdAt: new Date().toISOString()
      },
      {
        id: 24,
        username: 'Fabian',
        password: 'user123',
        fullName: 'Truşcă Fabian',
        role: 'user',
        managerId: 3,
        createdAt: new Date().toISOString()
      },
      {
        id: 25,
        username: 'Daniel',
        password: 'user123',
        fullName: 'Tudor Daniel',
        role: 'user',
        managerId: 4,
        createdAt: new Date().toISOString()
      },
      {
        id: 26,
        username: 'Teodor',
        password: 'user123',
        fullName: 'Ţurcanu Teodor',
        role: 'user',
        managerId: 2,
        createdAt: new Date().toISOString()
      }
    ];

    const defaultTasks = [
      {
        id: 1,
        title: 'Prepare project kickoff',
        description: 'Confirm scope, milestones, and communication cadence with the full team.',
        status: 'PENDING',
        priority: 'high',
        creatorId: 2,
        assigneeId: 5,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        title: 'Define architecture draft',
        description: 'Outline service boundaries, data contracts, and deployment approach for the MVP.',
        status: 'COMPLETED',
        priority: 'medium',
        creatorId: 3,
        assigneeId: 9,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 3,
        title: 'QA checklist for release',
        description: 'Prepare regression checklist, entry/exit criteria, and test data needs.',
        status: 'OPEN',
        priority: 'medium',
        creatorId: 4,
        assigneeId: null,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    setUsers(defaultUsers);
    setTasks(defaultTasks);
    setMessages([]);
    setAnnouncements([]);
  };

  // Authentication
  const login = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const resetData = () => {
    localStorage.clear();
    setUsers([]);
    setTasks([]);
    setMessages([]);
    setAnnouncements([]);
    setCurrentUser(null);
    initializeDefaultData();
  };

  // User Management
  const addUser = (userData) => {
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      username: userData.username,
      password: userData.password,
      fullName: userData.fullName,
      role: userData.role,
      managerId: userData.managerId || null,
      createdAt: new Date().toISOString()
    };
    setUsers([...users, newUser]);
    return newUser;
  };

  const getManagers = () => users.filter(u => u.role === 'manager');
  
  const getUsersByManager = (managerId) => users.filter(u => u.managerId === managerId);
  
  const getUserById = (userId) => users.find(u => u.id === userId);

  // Task Management
  const createTask = (taskData) => {
    const newTask = {
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      title: taskData.title,
      description: taskData.description,
      status: 'OPEN',
      priority: taskData.priority || 'medium',
      creatorId: currentUser.id,
      assigneeId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
    return newTask;
  };

  const assignTask = (taskId, userId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId && task.status === 'OPEN') {
        return {
          ...task,
          assigneeId: userId,
          status: 'PENDING',
          updatedAt: new Date().toISOString()
        };
      }
      return task;
    }));
  };

  const completeTask = (taskId, completionDetails, files) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId && task.status === 'PENDING' && task.assigneeId === currentUser.id) {
        return {
          ...task,
          status: 'COMPLETION_REQUESTED',
          completionDetails: completionDetails || '',
          completionFiles: files || [],
          updatedAt: new Date().toISOString()
        };
      }
      return task;
    }));
  };

  const approveCompletion = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId && task.status === 'COMPLETION_REQUESTED') {
        return {
          ...task,
          status: 'COMPLETED',
          updatedAt: new Date().toISOString()
        };
      }
      return task;
    }));
  };

  const closeTask = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId && task.status === 'COMPLETED') {
        return {
          ...task,
          status: 'CLOSED',
          updatedAt: new Date().toISOString()
        };
      }
      return task;
    }));
  };

  const updateTask = (taskId, updates) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          ...updates,
          updatedAt: new Date().toISOString()
        };
      }
      return task;
    }));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getTasksByStatus = (status) => {
    if (status === 'all') return tasks;
    return tasks.filter(t => t.status === status);
  };

  const getTasksForUser = (userId) => tasks.filter(t => t.assigneeId === userId);
  
  const getTasksCreatedByManager = (managerId) => tasks.filter(t => t.creatorId === managerId);

  // Chat Management
  const sendMessage = (chatType, message) => {
    const newMessage = {
      id: Date.now(),
      chatType,
      senderId: currentUser.id,
      senderName: currentUser.fullName,
      message,
      createdAt: new Date().toISOString()
    };
    setMessages([...messages, newMessage]);
    return newMessage;
  };

  const getMessagesForChat = (chatType) => messages.filter(m => m.chatType === chatType);

  const getUserManagerMessages = () => {
    if (currentUser?.role === 'user' || currentUser?.role === 'manager') {
      return messages.filter(m => m.chatType === 'user-manager');
    }
    return [];
  };

  const getManagerAdminMessages = () => messages.filter(m => m.chatType === 'manager-admin');

  // Announcement Management
  const createAnnouncement = (data) => {
    const newAnnouncement = {
      id: Date.now(),
      title: data.title,
      message: data.message,
      authorId: currentUser.id,
      authorName: currentUser.fullName,
      createdAt: new Date().toISOString()
    };
    setAnnouncements([...announcements, newAnnouncement]);
    return newAnnouncement;
  };

  const updateAnnouncement = (annId, updates) => {
    setAnnouncements(announcements.map(ann => {
      if (ann.id === annId) {
        return { ...ann, ...updates };
      }
      return ann;
    }));
  };

  const deleteAnnouncement = (annId) => {
    setAnnouncements(announcements.filter(ann => ann.id !== annId));
  };

  const getAnnouncements = () => {
    return [...announcements].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const value = {
    currentUser,
    users,
    tasks,
    messages,
    announcements,
    login,
    logout,
    resetData,
    addUser,
    getManagers,
    getUsersByManager,
    getUserById,
    createTask,
    assignTask,
    completeTask,
    approveCompletion,
    closeTask,
    updateTask,
    deleteTask,
    getTasksByStatus,
    getTasksForUser,
    getTasksCreatedByManager,
    sendMessage,
    getMessagesForChat,
    getUserManagerMessages,
    getManagerAdminMessages,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    getAnnouncements
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
