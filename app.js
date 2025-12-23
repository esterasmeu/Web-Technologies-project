// ============================================
// Data Models and Storage
// ============================================

class TaskFlowApp {
    constructor() {
        this.DATA_VERSION = '2025-12-15-02';
        this.currentUser = null;
        this.users = [];
        this.tasks = [];
        this.messages = [];
        this.announcements = [];
        this.dataVersion = localStorage.getItem('taskflow_version');
        this.loadData();
        this.initializeDefaultData();
        this.init();
    }

    // Initialize the application
    init() {
        this.setupEventListeners();
        this.showView('login');
    }

    // ============================================
    // Data Management
    // ============================================

    loadData() {
        const usersData = localStorage.getItem('taskflow_users');
        const tasksData = localStorage.getItem('taskflow_tasks');
        const versionData = localStorage.getItem('taskflow_version');
        const messagesData = localStorage.getItem('taskflow_messages');
        const announcementsData = localStorage.getItem('taskflow_announcements');
        
        if (usersData) {
            this.users = JSON.parse(usersData);
        }
        
        if (tasksData) {
            this.tasks = JSON.parse(tasksData);
        }

        if (versionData) {
            this.dataVersion = versionData;
        }

        if (messagesData) {
            this.messages = JSON.parse(messagesData);
        }
        this.announcements = announcementsData ? JSON.parse(announcementsData) : [];
    }

    saveData() {
        localStorage.setItem('taskflow_users', JSON.stringify(this.users));
        localStorage.setItem('taskflow_tasks', JSON.stringify(this.tasks));
        localStorage.setItem('taskflow_version', this.DATA_VERSION);
        localStorage.setItem('taskflow_messages', JSON.stringify(this.messages));
        localStorage.setItem('taskflow_announcements', JSON.stringify(this.announcements));
        this.dataVersion = this.DATA_VERSION;
    }

    initializeDefaultData() {
        const needsSeed = this.users.length === 0 || this.dataVersion !== this.DATA_VERSION;

        if (needsSeed) {
            // Create default users
            this.users = [
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

            // Create sample tasks
            this.tasks = [
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

            this.saveData();
        }
    }

    // ============================================
    // Authentication
    // ============================================

    login(username, password) {
        const user = this.users.find(u => u.username === username && u.password === password);
        
        if (user) {
            this.currentUser = user;
            this.showUserInterface();
            return true;
        }
        
        return false;
    }

    logout() {
        this.currentUser = null;
        this.showView('login');
        document.getElementById('login-form').reset();
    }

    resetData() {
        localStorage.removeItem('taskflow_users');
        localStorage.removeItem('taskflow_tasks');
        localStorage.removeItem('taskflow_version');
        localStorage.removeItem('taskflow_messages');
        localStorage.removeItem('taskflow_announcements');
        this.users = [];
        this.tasks = [];
        this.messages = [];
        this.announcements = [];
        this.dataVersion = null;
        this.initializeDefaultData();
        this.showView('login');
        const loginError = document.getElementById('login-error');
        if (loginError) {
            loginError.classList.add('hidden');
        }
        alert('Demo data has been reset. You can now log in with the updated accounts.');
    }

    // ============================================
    // User Management
    // ============================================

    addUser(userData) {
        const newUser = {
            id: this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1,
            username: userData.username,
            password: userData.password,
            fullName: userData.fullName,
            role: userData.role,
            managerId: userData.managerId || null,
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        this.saveData();
        return newUser;
    }

    getManagers() {
        return this.users.filter(u => u.role === 'manager');
    }

    getUsersByManager(managerId) {
        return this.users.filter(u => u.managerId === managerId);
    }

    getUserById(userId) {
        return this.users.find(u => u.id === userId);
    }

    // ============================================
    // Chat Management
    // ============================================

    sendMessage(chatType, message) {
        const newMessage = {
            id: Date.now(),
            chatType: chatType, // 'user-manager' or 'manager-admin'
            senderId: this.currentUser.id,
            senderName: this.currentUser.fullName,
            message: message,
            createdAt: new Date().toISOString()
        };
        this.messages.push(newMessage);
        this.saveData();
        return newMessage;
    }

    getMessagesForChat(chatType) {
        return this.messages.filter(m => m.chatType === chatType);
    }

    getUserManagerMessages() {
        // Show all user-manager chat messages to any logged in user or manager
        // This makes the user-manager chat a shared channel visible across the team
        if (this.currentUser.role === 'user' || this.currentUser.role === 'manager') {
            return this.messages.filter(m => m.chatType === 'user-manager');
        }
        return [];
    }

    getManagerAdminMessages() {
        // Messages between managers and admin
        return this.messages.filter(m => m.chatType === 'manager-admin');
    }

    // ============================================
    // ============================================
    // Task Management
    // ============================================

    createTask(taskData) {
        const newTask = {
            id: this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1,
            title: taskData.title,
            description: taskData.description,
            status: 'OPEN',
            priority: taskData.priority || 'medium',
            creatorId: this.currentUser.id,
            assigneeId: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.tasks.push(newTask);
        this.saveData();
        return newTask;
    }

    assignTask(taskId, userId) {
        const task = this.tasks.find(t => t.id === taskId);
        
        if (task && task.status === 'OPEN') {
            task.assigneeId = userId;
            task.status = 'PENDING';
            task.updatedAt = new Date().toISOString();
            this.saveData();
            
            return true;
        }
        
        return false;
    }

    completeTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        
        if (task && task.status === 'PENDING' && task.assigneeId === this.currentUser.id) {
            // Get completion details
            const completionDetails = document.getElementById('completion-details');
            const completionFiles = document.getElementById('completion-files');
            
            if (!completionDetails || !completionDetails.value.trim()) {
                return false;
            }
            
            task.status = 'COMPLETION_REQUESTED';
            task.completionDetails = completionDetails.value.trim();
            task.completionFiles = [];
            
            // Store file names (in a real app, you'd upload files to a server)
            if (completionFiles && completionFiles.files.length > 0) {
                for (let i = 0; i < completionFiles.files.length; i++) {
                    task.completionFiles.push({
                        name: completionFiles.files[i].name,
                        size: completionFiles.files[i].size,
                        type: completionFiles.files[i].type,
                        uploadedAt: new Date().toISOString()
                    });
                }
            }
            
            task.updatedAt = new Date().toISOString();
            this.saveData();
            
            return true;
        }
        
        return false;
    }

    approveCompletion(taskId) {
        const task = this.tasks.find(t => t.id === taskId);

        if (task && task.status === 'COMPLETION_REQUESTED' && this.currentUser.role === 'manager') {
            task.status = 'COMPLETED';
            task.updatedAt = new Date().toISOString();
            this.saveData();
            
            return true;
        }

        return false;
    }

    closeTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        
        if (task && task.status === 'COMPLETED' && this.currentUser.role === 'manager') {
            task.status = 'CLOSED';
            task.updatedAt = new Date().toISOString();
            this.saveData();
            return true;
        }
        
        return false;
    }

    editTask(task) {
        // Open the task modal for editing
        const modal = document.getElementById('task-modal');
        if (!modal) return;

        const modalContent = modal.querySelector('.modal-content');
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>Edit Task</h2>
                <button type="button" class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form id="edit-task-form">
                    <div class="task-detail-grid">
                        <div class="detail-item full-width">
                            <label>Title</label>
                            <input type="text" id="edit-task-title" class="form-control" value="${this.escapeHtml(task.title)}" required>
                        </div>
                        <div class="detail-item full-width">
                            <label>Description</label>
                            <textarea id="edit-task-desc" class="form-control" rows="4" required>${this.escapeHtml(task.description)}</textarea>
                        </div>
                        <div class="detail-item">
                            <label>Status</label>
                            <select id="edit-task-status" class="form-control" required>
                                <option value="OPEN" ${task.status === 'OPEN' ? 'selected' : ''}>Open</option>
                                <option value="PENDING" ${task.status === 'PENDING' ? 'selected' : ''}>Pending</option>
                                <option value="COMPLETION_REQUESTED" ${task.status === 'COMPLETION_REQUESTED' ? 'selected' : ''}>Awaiting Approval</option>
                                <option value="COMPLETED" ${task.status === 'COMPLETED' ? 'selected' : ''}>Completed</option>
                                <option value="CLOSED" ${task.status === 'CLOSED' ? 'selected' : ''}>Closed</option>
                            </select>
                        </div>
                        <div class="detail-item">
                            <label>Priority</label>
                            <select id="edit-task-priority" class="form-control" required>
                                <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low</option>
                                <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>Medium</option>
                                <option value="high" ${task.priority === 'high' ? 'selected' : ''}>High</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button type="submit" class="btn btn-primary">Save Changes</button>
                        <button type="button" class="btn btn-secondary modal-close-btn">Cancel</button>
                    </div>
                </form>
            </div>
        `;

        modal.classList.remove('hidden');

        document.getElementById('edit-task-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateTask(task.id, {
                title: document.getElementById('edit-task-title').value,
                description: document.getElementById('edit-task-desc').value,
                status: document.getElementById('edit-task-status').value,
                priority: document.getElementById('edit-task-priority').value
            });
        });

        document.querySelector('.modal-close').addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        document.querySelector('.modal-close-btn').addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    updateTask(taskId, updates) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return false;

        task.title = updates.title;
        task.description = updates.description;
        task.status = updates.status;
        task.priority = updates.priority;
        task.updatedAt = new Date().toISOString();

        this.saveData();

        // Refresh the appropriate view
        if (this.currentUser.role === 'admin') {
            this.renderAdminTasks();
            const modal = document.getElementById('task-modal');
            if (modal) modal.classList.add('hidden');
        } else if (this.currentUser.role === 'manager') {
            this.renderManagerTasks();
            const modal = document.getElementById('task-modal');
            if (modal) modal.classList.add('hidden');
        }

        return true;
    }

    showEditAnnouncementModal(announcement) {
        const modal = document.getElementById('announcement-modal');
        if (!modal) {
            // Create modal if it doesn't exist
            const newModal = document.createElement('div');
            newModal.id = 'announcement-modal';
            newModal.className = 'modal hidden';
            document.body.appendChild(newModal);
            return this.showEditAnnouncementModal(announcement);
        }

        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Edit Announcement</h2>
                    <button type="button" class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="edit-announcement-form">
                        <div class="detail-item full-width" style="margin-bottom: 1rem;">
                            <label>Title</label>
                            <input type="text" id="edit-ann-title" class="form-control" value="${this.escapeHtml(announcement.title)}" required>
                        </div>
                        <div class="detail-item full-width">
                            <label>Message</label>
                            <textarea id="edit-ann-message" class="form-control" rows="6" required>${this.escapeHtml(announcement.message)}</textarea>
                        </div>
                        <div class="modal-actions">
                            <button type="submit" class="btn btn-primary">Save Changes</button>
                            <button type="button" class="btn btn-secondary modal-close-btn">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');

        document.getElementById('edit-announcement-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateAnnouncement(announcement.id, {
                title: document.getElementById('edit-ann-title').value,
                message: document.getElementById('edit-ann-message').value
            });
        });

        document.querySelector('#announcement-modal .modal-close').addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        document.querySelector('#announcement-modal .modal-close-btn').addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    updateAnnouncement(annId, updates) {
        const ann = this.announcements.find(a => a.id === annId);
        if (!ann) return false;

        ann.title = updates.title;
        ann.message = updates.message;

        this.saveData();

        // Refresh announcements
        if (this.currentUser.role === 'admin') {
            this.renderAdminAnnouncements();
        } else if (this.currentUser.role === 'manager') {
            this.renderManagerAnnouncements();
        }

        const modal = document.getElementById('announcement-modal');
        if (modal) modal.classList.add('hidden');

        return true;
    }

    getTasksByStatus(status) {
        if (status === 'all') {
            return this.tasks;
        }
        return this.tasks.filter(t => t.status === status);
    }

    getTasksForUser(userId) {
        return this.tasks.filter(t => t.assigneeId === userId);
    }

    getTasksCreatedByManager(managerId) {
        return this.tasks.filter(t => t.creatorId === managerId);
    }

    // ============================================
    // UI Management
    // ============================================

    showView(viewName) {
        // Hide all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });

        // Show selected view
        document.getElementById(`${viewName}-view`).classList.add('active');

        // Show/hide header
        const header = document.getElementById('app-header');
        if (viewName === 'login') {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
    }

    showUserInterface() {
        // Update header
        document.getElementById('current-user-name').textContent = `Welcome back ${this.currentUser.fullName}!`;
        document.getElementById('current-user-role').textContent = this.currentUser.role.toUpperCase();

        // Show appropriate view based on role
        if (this.currentUser.role === 'admin') {
            this.showView('admin');
            this.renderAdminView();
        } else if (this.currentUser.role === 'manager') {
            this.showView('manager');
            this.renderManagerView();
        } else {
            this.showView('user');
            this.renderUserView();
        }
    }

    // ============================================
    // Admin View Rendering
    // ============================================

    renderAdminView() {
        this.renderUsersList();
        this.renderManagersDropdown();
        this.renderAdminStats();
        this.renderAdminTasks();
        this.renderAdminAnnouncements();
    }

    renderUsersList() {
        const tbody = document.getElementById('users-list');
        tbody.innerHTML = '';

        this.users.forEach(user => {
            if (user.role !== 'admin') {
                const tr = document.createElement('tr');
                const manager = user.managerId ? this.getUserById(user.managerId) : null;
                
                tr.innerHTML = `
                    <td>${user.username}</td>
                    <td>${user.fullName}</td>
                    <td><span class="task-status status-${user.role}">${user.role.toUpperCase()}</span></td>
                    <td>${manager ? manager.fullName : '-'}</td>
                    <td><span class="task-status status-completed">Active</span></td>
                `;
                
                tbody.appendChild(tr);
            }
        });
    }

    renderManagersDropdown() {
        const select = document.getElementById('new-manager');
        select.innerHTML = '<option value="">None</option>';
        
        this.getManagers().forEach(manager => {
            const option = document.createElement('option');
            option.value = manager.id;
            option.textContent = manager.fullName;
            select.appendChild(option);
        });
    }

    renderAdminStats() {
        const totalUsers = this.users.filter(u => u.role !== 'admin').length;
        const managers = this.users.filter(u => u.role === 'manager').length;
        const totalTasks = this.tasks.length;
        const activeTasks = this.tasks.filter(t => t.status !== 'CLOSED').length;

        document.getElementById('stat-total-users').textContent = totalUsers;
        document.getElementById('stat-managers').textContent = managers;
        document.getElementById('stat-total-tasks').textContent = totalTasks;
        document.getElementById('stat-active-tasks').textContent = activeTasks;
    }

    // ============================================
    // Manager View Rendering
    // ============================================

    renderManagerView() {
        this.renderManagerTasks();
        this.renderTeamMembersDropdown();
        this.renderManagerAnnouncements();
    }

    createAnnouncement(data) {
        const newAnnouncement = {
            id: Date.now(),
            title: data.title,
            message: data.message,
            authorId: this.currentUser.id,
            authorName: this.currentUser.fullName,
            createdAt: new Date().toISOString()
        };
        this.announcements.push(newAnnouncement);
        this.saveData();
        return newAnnouncement;
    }

    getAnnouncements() {
        // Visible to all roles
        return this.announcements.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    renderManagerAnnouncements() {
        const container = document.getElementById('manager-announcements-list');
        if (!container) return;
        const items = this.getAnnouncements();
        container.innerHTML = '';
        if (items.length === 0) {
            container.innerHTML = '<p class="muted">No announcements yet.</p>';
            return;
        }
        items.forEach(a => {
            const card = document.createElement('div');
            card.className = 'announcement-card';
            card.innerHTML = `
                <div class="announcement-header">
                    <h3>${this.escapeHtml(a.title)}</h3>
                    <span class="announcement-meta">${this.escapeHtml(a.authorName)} • ${this.formatDateTime(a.createdAt)}</span>
                </div>
                <p class="announcement-message">${this.escapeHtml(a.message)}</p>
            `;
            container.appendChild(card);
        });
    }

    renderAdminAnnouncements() {
        const container = document.getElementById('admin-announcements-list');
        if (!container) return;
        const items = this.getAnnouncements();
        container.innerHTML = '';
        if (items.length === 0) {
            container.innerHTML = '<p class="muted">No announcements yet.</p>';
            return;
        }
        items.forEach(a => {
            const card = document.createElement('div');
            card.className = 'announcement-card';
            const isAuthor = a.authorId === this.currentUser.id;
            card.innerHTML = `
                <div class="announcement-header">
                    <h3>${this.escapeHtml(a.title)}</h3>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <span class="announcement-meta">${this.escapeHtml(a.authorName)} • ${this.formatDateTime(a.createdAt)}</span>
                        <button class="btn btn-small btn-primary edit-announcement-btn" data-announcement-id="${a.id}">Edit</button>
                        <button class="btn btn-small btn-danger delete-announcement-btn" data-announcement-id="${a.id}">Delete</button>
                    </div>
                </div>
                <p class="announcement-message">${this.escapeHtml(a.message)}</p>
            `;
            container.appendChild(card);
        });

        // Add event listeners for edit and delete
        document.querySelectorAll('.edit-announcement-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const annId = parseInt(e.target.getAttribute('data-announcement-id'));
                const ann = this.announcements.find(a => a.id === annId);
                if (ann) this.showEditAnnouncementModal(ann);
            });
        });

        document.querySelectorAll('.delete-announcement-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const annId = parseInt(e.target.getAttribute('data-announcement-id'));
                if (confirm('Are you sure you want to delete this announcement?')) {
                    this.announcements = this.announcements.filter(a => a.id !== annId);
                    this.saveData();
                    this.renderAdminAnnouncements();
                }
            });
        });
    }

    renderUserAnnouncements() {
        const container = document.getElementById('user-announcements-list');
        if (!container) return;
        const items = this.getAnnouncements();
        container.innerHTML = '';
        if (items.length === 0) {
            container.innerHTML = '<p class="muted">No announcements yet.</p>';
            return;
        }
        items.forEach(a => {
            const card = document.createElement('div');
            card.className = 'announcement-card';
            card.innerHTML = `
                <div class="announcement-header">
                    <h3>${this.escapeHtml(a.title)}</h3>
                    <span class="announcement-meta">${this.escapeHtml(a.authorName)} • ${this.formatDateTime(a.createdAt)}</span>
                </div>
                <p class="announcement-message">${this.escapeHtml(a.message)}</p>
            `;
            container.appendChild(card);
        });
    }

    renderAdminTasks(statusFilter = 'all') {
        const container = document.getElementById('admin-tasks-list');
        if (!container) return;
        
        const tasks = this.getTasksByStatus(statusFilter);
        container.innerHTML = '';
        
        if (tasks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No tasks found</h3>
                    <p>All tasks are displayed here</p>
                </div>
            `;
            return;
        }

        tasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = `task-card priority-${task.priority}`;
            taskCard.innerHTML = `
                <div class="task-card-header">
                    <h4 class="task-title">${this.escapeHtml(task.title)}</h4>
                    <div class="task-badges">
                        <span class="task-status status-${task.status}">${task.status.replace(/_/g, ' ')}</span>
                        <span class="task-priority priority-${task.priority}">${task.priority}</span>
                    </div>
                </div>
                <p class="task-description">${this.escapeHtml(task.description)}</p>
                <div class="task-meta">
                    <span class="task-assignee">Assigned to: ${task.assigneeId ? this.getUserById(task.assigneeId).fullName : 'Unassigned'}</span>
                    <span class="task-creator">Created by: ${this.getUserById(task.creatorId).fullName}</span>
                    <div class="task-actions">
                        <button class="btn btn-small btn-primary edit-task-btn" data-task-id="${task.id}">Edit</button>
                        <button class="btn btn-small btn-danger delete-task-btn" data-task-id="${task.id}">Delete</button>
                    </div>
                </div>
            `;
            container.appendChild(taskCard);
        });

        // Add event listeners for edit and delete
        document.querySelectorAll('.edit-task-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const taskId = parseInt(e.target.getAttribute('data-task-id'));
                const task = this.tasks.find(t => t.id === taskId);
                if (task) this.editTask(task);
            });
        });

        document.querySelectorAll('.delete-task-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const taskId = parseInt(e.target.getAttribute('data-task-id'));
                if (confirm('Are you sure you want to delete this task?')) {
                    this.tasks = this.tasks.filter(t => t.id !== taskId);
                    this.saveData();
                    this.renderAdminTasks(statusFilter);
                }
            });
        });
    }

    renderManagerTasks(statusFilter = 'all') {
        const container = document.getElementById('manager-tasks-list');
        container.innerHTML = '';

        // Managers only see tasks they created
        let tasks = this.getTasksCreatedByManager(this.currentUser.id);
        
        // Apply status filter
        if (statusFilter !== 'all') {
            tasks = tasks.filter(t => t.status === statusFilter);
        }
        
        if (tasks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No tasks found</h3>
                    <p>Create a new task to get started</p>
                </div>
            `;
            return;
        }

        tasks.forEach(task => {
            const taskCard = this.createTaskCard(task);
            container.appendChild(taskCard);
        });
    }

    renderTeamMembersDropdown() {
        const select = document.getElementById('team-member-select');
        select.innerHTML = '<option value="">Select a team member</option>';
        
        const teamMembers = this.getUsersByManager(this.currentUser.id);
        
        teamMembers.forEach(member => {
            const option = document.createElement('option');
            option.value = member.id;
            option.textContent = member.fullName;
            select.appendChild(option);
        });
    }

    renderTeamMemberHistory(userId) {
        const container = document.getElementById('team-member-history');
        container.innerHTML = '';

        if (!userId) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>Select a team member</h3>
                    <p>Choose a team member to view their task history</p>
                </div>
            `;
            return;
        }

        const tasks = this.getTasksForUser(parseInt(userId));
        
        if (tasks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No tasks found</h3>
                    <p>This user has no assigned tasks</p>
                </div>
            `;
            return;
        }

        tasks.forEach(task => {
            const taskCard = this.createTaskCard(task);
            container.appendChild(taskCard);
        });
    }

    // ============================================
    // User View Rendering
    // ============================================

    renderUserView() {
        this.renderUserTasks();
        this.renderUserHistory();
        this.renderUserAnnouncements();
    }

    renderUserTasks() {
        const container = document.getElementById('user-tasks-list');
        container.innerHTML = '';

        const tasks = this.getTasksForUser(this.currentUser.id).filter(t => 
            t.status === 'PENDING' || t.status === 'COMPLETED' || t.status === 'COMPLETION_REQUESTED'
        );
        
        if (tasks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No active tasks</h3>
                    <p>You don't have any tasks assigned at the moment</p>
                </div>
            `;
            return;
        }

        tasks.forEach(task => {
            const taskCard = this.createTaskCard(task);
            container.appendChild(taskCard);
        });
    }

    renderUserHistory() {
        const container = document.getElementById('user-history-list');
        container.innerHTML = '';

        const tasks = this.getTasksForUser(this.currentUser.id);
        
        if (tasks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No task history</h3>
                    <p>Your completed tasks will appear here</p>
                </div>
            `;
            return;
        }

        tasks.forEach(task => {
            const taskCard = this.createTaskCard(task);
            container.appendChild(taskCard);
        });
    }

    // ============================================
    // Task Card Creation
    // ============================================

    createTaskCard(task) {
        const card = document.createElement('div');
        card.className = `task-card priority-${task.priority}`;
        card.dataset.taskId = task.id;

        const creator = this.getUserById(task.creatorId);
        const assignee = task.assigneeId ? this.getUserById(task.assigneeId) : null;

        card.innerHTML = `
            <div class="task-card-header">
                <h3 class="task-title">${this.escapeHtml(task.title)}</h3>
                <div class="task-badges">
                    <span class="task-status status-${task.status.toLowerCase()}">${task.status}</span>
                    <span class="task-priority priority-${task.priority}">${task.priority.toUpperCase()}</span>
                </div>
            </div>
            <p class="task-description">${this.escapeHtml(this.truncateText(task.description, 150))}</p>
            <div class="task-meta">
                <span class="task-assignee">
                    ${assignee ? `Assigned to: ${assignee.fullName}` : 'Unassigned'}
                </span>
                <span class="task-date">${this.formatDate(task.createdAt)}</span>
            </div>
        `;

        card.addEventListener('click', () => {
            this.showTaskModal(task.id);
        });

        return card;
    }

    // ============================================
    // Task Modal
    // ============================================

    showTaskModal(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;

        const modal = document.getElementById('task-modal');
        const creator = this.getUserById(task.creatorId);
        const assignee = task.assigneeId ? this.getUserById(task.assigneeId) : null;

        // Populate modal
        document.getElementById('modal-task-title').textContent = task.title;
        document.getElementById('modal-task-description').textContent = task.description;
        document.getElementById('modal-task-status').textContent = task.status;
        document.getElementById('modal-task-status').className = `task-status status-${task.status.toLowerCase()}`;
        document.getElementById('modal-task-priority').textContent = task.priority.toUpperCase();
        document.getElementById('modal-task-priority').className = `task-priority priority-${task.priority}`;
        document.getElementById('modal-task-creator').textContent = creator.fullName;
        document.getElementById('modal-task-assignee').textContent = assignee ? assignee.fullName : 'Unassigned';
        document.getElementById('modal-task-created').textContent = this.formatDateTime(task.createdAt);
        document.getElementById('modal-task-updated').textContent = this.formatDateTime(task.updatedAt);

        // Show/hide completion details
        const completionInfoSection = document.getElementById('completion-info-section');
        const modalCompletionDetails = document.getElementById('modal-completion-details');
        const modalCompletionFiles = document.getElementById('modal-completion-files');
        
        if (task.completionDetails || (task.completionFiles && task.completionFiles.length > 0)) {
            if (completionInfoSection) completionInfoSection.classList.remove('hidden');
            if (modalCompletionDetails) modalCompletionDetails.textContent = task.completionDetails || 'No details provided';
            
            if (modalCompletionFiles) {
                if (task.completionFiles && task.completionFiles.length > 0) {
                    modalCompletionFiles.innerHTML = '<strong>Attached files:</strong><ul>' + 
                        task.completionFiles.map(file => `<li>${this.escapeHtml(file.name)} (${this.formatFileSize(file.size)})</li>`).join('') + 
                        '</ul>';
                } else {
                    modalCompletionFiles.innerHTML = '';
                }
            }
        } else {
            if (completionInfoSection) completionInfoSection.classList.add('hidden');
        }

        // Show/hide actions based on role and task status
        const managerActions = document.getElementById('manager-actions');
        const userActions = document.getElementById('user-actions');
        const assignUserGroup = document.getElementById('assign-user-group');
        const closeTaskBtn = document.getElementById('close-task-btn');
        const approveCompletionBtn = document.getElementById('approve-completion-btn');
        const managerEditTaskBtn = document.getElementById('manager-edit-task-btn');
        const managerDeleteTaskBtn = document.getElementById('manager-delete-task-btn');

        managerActions.classList.add('hidden');
        userActions.classList.add('hidden');
        closeTaskBtn.classList.add('hidden');
        approveCompletionBtn.classList.add('hidden');
        if (managerEditTaskBtn) managerEditTaskBtn.classList.add('hidden');
        if (managerDeleteTaskBtn) managerDeleteTaskBtn.classList.add('hidden');

        if (this.currentUser.role === 'manager') {
            managerActions.classList.remove('hidden');
            
            if (managerEditTaskBtn) managerEditTaskBtn.classList.remove('hidden');
            if (managerDeleteTaskBtn) managerDeleteTaskBtn.classList.remove('hidden');
            
            // Show assign option for OPEN tasks
            if (task.status === 'OPEN') {
                assignUserGroup.classList.remove('hidden');
                closeTaskBtn.classList.add('hidden');
                approveCompletionBtn.classList.add('hidden');
                this.populateAssignUserSelect();
            } else {
                assignUserGroup.classList.add('hidden');
            }

            // Show close button for COMPLETED tasks
            if (task.status === 'COMPLETED') {
                closeTaskBtn.classList.remove('hidden');
            } else {
                closeTaskBtn.classList.add('hidden');
            }

            // Show approve button for completion requests
            if (task.status === 'COMPLETION_REQUESTED') {
                approveCompletionBtn.classList.remove('hidden');
            }
        } else if (this.currentUser.role === 'user' && task.assigneeId === this.currentUser.id && task.status === 'PENDING') {
            userActions.classList.remove('hidden');
            
            // Completion form
            const completionDetails = document.getElementById('completion-details');
            const completionFiles = document.getElementById('completion-files');
            const completeTaskBtn = document.getElementById('complete-task-btn');
            const filesInfo = document.getElementById('files-info');
            
            if (completionDetails) completionDetails.value = '';
            if (completionFiles) completionFiles.value = '';
            if (filesInfo) filesInfo.textContent = '';
            if (completeTaskBtn) completeTaskBtn.disabled = true;
            
            // Setup validation for completion button
            this.setupCompletionValidation();
        }

        // Store current task ID for action handlers
        modal.dataset.taskId = taskId;

        modal.classList.remove('hidden');
    }

    populateAssignUserSelect() {
        const select = document.getElementById('assign-user-select');
        select.innerHTML = '<option value="">Select user</option>';
        
        const teamMembers = this.getUsersByManager(this.currentUser.id);
        
        teamMembers.forEach(member => {
            const option = document.createElement('option');
            option.value = member.id;
            option.textContent = member.fullName;
            select.appendChild(option);
        });
    }

    closeTaskModal() {
        document.getElementById('task-modal').classList.add('hidden');
    }

    setupCompletionValidation() {
        const completionDetails = document.getElementById('completion-details');
        const completionFiles = document.getElementById('completion-files');
        const completeTaskBtn = document.getElementById('complete-task-btn');
        const filesInfo = document.getElementById('files-info');
        
        const validateCompletion = () => {
            const hasDetails = completionDetails && completionDetails.value.trim().length > 0;
            const hasFiles = completionFiles && completionFiles.files.length > 0;
            
            // Enable button only when files are uploaded
            if (completeTaskBtn) {
                completeTaskBtn.disabled = !hasFiles;
            }
            
            // Update files info
            if (filesInfo && completionFiles && completionFiles.files.length > 0) {
                filesInfo.textContent = `${completionFiles.files.length} file(s) selected`;
            } else if (filesInfo) {
                filesInfo.textContent = '';
            }
        };
        
        if (completionDetails) {
            completionDetails.addEventListener('input', validateCompletion);
        }
        
        if (completionFiles) {
            completionFiles.addEventListener('change', validateCompletion);
        }
    }

    renderUserChat() {
        const container = document.getElementById('user-chat-messages');
        const messages = this.getUserManagerMessages();
        container.innerHTML = '';

        messages.forEach(msg => {
            const isOwn = msg.senderId === this.currentUser.id;
            const msgDiv = document.createElement('div');
            msgDiv.className = `chat-message ${isOwn ? 'own' : 'other'}`;
            msgDiv.innerHTML = `
                <div class="chat-message-header">
                    <strong>${this.escapeHtml(msg.senderName)}</strong>
                    <span class="chat-time">${this.formatDateTime(msg.createdAt)}</span>
                </div>
                <div class="chat-message-body">${this.escapeHtml(msg.message)}</div>
            `;
            container.appendChild(msgDiv);
        });

        container.scrollTop = container.scrollHeight;
    }

    renderManagerChat() {
        const container = document.getElementById('manager-chat-messages');
        const messages = this.getUserManagerMessages();
        container.innerHTML = '';

        messages.forEach(msg => {
            const isOwn = msg.senderId === this.currentUser.id;
            const msgDiv = document.createElement('div');
            msgDiv.className = `chat-message ${isOwn ? 'own' : 'other'}`;
            msgDiv.innerHTML = `
                <div class="chat-message-header">
                    <strong>${this.escapeHtml(msg.senderName)}</strong>
                    <span class="chat-time">${this.formatDateTime(msg.createdAt)}</span>
                </div>
                <div class="chat-message-body">${this.escapeHtml(msg.message)}</div>
            `;
            container.appendChild(msgDiv);
        });

        container.scrollTop = container.scrollHeight;
    }

    renderManagerAdminChat() {
        const container = document.getElementById('manager-admin-chat-messages');
        const messages = this.getManagerAdminMessages();
        container.innerHTML = '';

        messages.forEach(msg => {
            const isOwn = msg.senderId === this.currentUser.id;
            const msgDiv = document.createElement('div');
            msgDiv.className = `chat-message ${isOwn ? 'own' : 'other'}`;
            msgDiv.innerHTML = `
                <div class="chat-message-header">
                    <strong>${this.escapeHtml(msg.senderName)}</strong>
                    <span class="chat-time">${this.formatDateTime(msg.createdAt)}</span>
                </div>
                <div class="chat-message-body">${this.escapeHtml(msg.message)}</div>
            `;
            container.appendChild(msgDiv);
        });

        container.scrollTop = container.scrollHeight;
    }

    renderAdminChat() {
        const container = document.getElementById('admin-chat-messages');
        const messages = this.getManagerAdminMessages();
        container.innerHTML = '';

        messages.forEach(msg => {
            const isOwn = msg.senderId === this.currentUser.id;
            const msgDiv = document.createElement('div');
            msgDiv.className = `chat-message ${isOwn ? 'own' : 'other'}`;
            msgDiv.innerHTML = `
                <div class="chat-message-header">
                    <strong>${this.escapeHtml(msg.senderName)}</strong>
                    <span class="chat-time">${this.formatDateTime(msg.createdAt)}</span>
                </div>
                <div class="chat-message-body">${this.escapeHtml(msg.message)}</div>
            `;
            container.appendChild(msgDiv);
        });

        container.scrollTop = container.scrollHeight;
    }

    // ============================================
    // Event Listeners Setup
    // ============================================

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const username = document.getElementById('login-username').value;
                const password = document.getElementById('login-password').value;
                
                if (this.login(username, password)) {
                    document.getElementById('login-error').classList.add('hidden');
                } else {
                    const errorDiv = document.getElementById('login-error');
                    errorDiv.textContent = 'Invalid username or password';
                    errorDiv.classList.remove('hidden');
                }
            });
        }

        // Reset demo data button
        const resetBtn = document.getElementById('reset-data-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetData();
            });
        }

        // Logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.logout();
            });
        }

        // Admin - Add user form
        const addUserForm = document.getElementById('add-user-form');
        if (addUserForm) {
            addUserForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const userData = {
                    username: document.getElementById('new-username').value,
                    fullName: document.getElementById('new-fullname').value,
                    password: document.getElementById('new-password').value,
                    role: document.getElementById('new-role').value,
                    managerId: document.getElementById('new-manager').value ? 
                        parseInt(document.getElementById('new-manager').value) : null
                };

                this.addUser(userData);
                e.target.reset();
                this.renderAdminView();
                alert('User added successfully!');
            });
        }

        // Admin - Role change handler
        const newRoleSelect = document.getElementById('new-role');
        if (newRoleSelect) {
            newRoleSelect.addEventListener('change', (e) => {
                const managerGroup = document.getElementById('manager-select-group');
                if (e.target.value === 'user') {
                    managerGroup.style.display = 'block';
                } else {
                    managerGroup.style.display = 'none';
                }
            });
        }

        // Manager - Create task form
        const createTaskForm = document.getElementById('create-task-form');
        if (createTaskForm) {
            createTaskForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const taskData = {
                    title: document.getElementById('task-title').value,
                    description: document.getElementById('task-description').value,
                    priority: document.getElementById('task-priority').value
                };

                this.createTask(taskData);
                e.target.reset();
                this.renderManagerTasks();
                alert('Task created successfully!');
            });
        }

        // Manager - Task status filter
        const taskStatusFilter = document.getElementById('task-status-filter');
        if (taskStatusFilter) {
            taskStatusFilter.addEventListener('change', (e) => {
                this.renderManagerTasks(e.target.value);
            });
        }

        // Admin - Task status filter
        const adminTaskStatusFilter = document.getElementById('admin-task-status-filter');
        if (adminTaskStatusFilter) {
            adminTaskStatusFilter.addEventListener('change', (e) => {
                this.renderAdminTasks(e.target.value);
            });
        }

        // Manager - Team member select
        const teamMemberSelect = document.getElementById('team-member-select');
        if (teamMemberSelect) {
            teamMemberSelect.addEventListener('change', (e) => {
                this.renderTeamMemberHistory(e.target.value);
            });
        }

        // Modal close button
        const modalCloseBtn = document.querySelector('.modal-close');
        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', () => {
                this.closeTaskModal();
            });
        }

        // Modal - Assign task button
        const assignTaskBtn = document.getElementById('assign-task-btn');
        if (assignTaskBtn) {
            assignTaskBtn.addEventListener('click', () => {
                const modal = document.getElementById('task-modal');
                const taskId = parseInt(modal.dataset.taskId);
                const userId = parseInt(document.getElementById('assign-user-select').value);
                
                if (userId) {
                    if (this.assignTask(taskId, userId)) {
                        alert('Task assigned successfully!');
                        this.closeTaskModal();
                        this.renderManagerTasks();
                    } else {
                        alert('Failed to assign task');
                    }
                } else {
                    alert('Please select a user');
                }
            });
        }

        // Modal - Close task button
        const closeTaskBtn = document.getElementById('close-task-btn');
        if (closeTaskBtn) {
            closeTaskBtn.addEventListener('click', () => {
                const modal = document.getElementById('task-modal');
                const taskId = parseInt(modal.dataset.taskId);
                
                if (this.closeTask(taskId)) {
                    alert('Task closed successfully!');
                    this.closeTaskModal();
                    this.renderManagerTasks();
                } else {
                    alert('Failed to close task');
                }
            });
        }

        // Modal - Approve completion button
        const approveCompletionBtn = document.getElementById('approve-completion-btn');
        if (approveCompletionBtn) {
            approveCompletionBtn.addEventListener('click', () => {
                const modal = document.getElementById('task-modal');
                const taskId = parseInt(modal.dataset.taskId);

                if (this.approveCompletion(taskId)) {
                    alert('Task marked as completed.');
                    this.closeTaskModal();
                    this.renderManagerTasks();
                } else {
                    alert('Failed to mark task as completed.');
                }
            });
        }

        // Modal - Manager edit task button
        const managerEditTaskBtn = document.getElementById('manager-edit-task-btn');
        if (managerEditTaskBtn) {
            managerEditTaskBtn.addEventListener('click', () => {
                const modal = document.getElementById('task-modal');
                const taskId = parseInt(modal.dataset.taskId);
                const task = this.tasks.find(t => t.id === taskId);
                
                if (task) {
                    this.closeTaskModal();
                    this.editTask(task);
                }
            });
        }

        // Modal - Manager/Admin delete task button
        const managerDeleteTaskBtn = document.getElementById('manager-delete-task-btn');
        if (managerDeleteTaskBtn) {
            managerDeleteTaskBtn.addEventListener('click', () => {
                const modal = document.getElementById('task-modal');
                const taskId = parseInt(modal.dataset.taskId);
                
                if (confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
                    this.tasks = this.tasks.filter(t => t.id !== taskId);
                    this.saveData();
                    this.closeTaskModal();
                    
                    if (this.currentUser.role === 'admin') {
                        this.renderAdminTasks();
                    } else if (this.currentUser.role === 'manager') {
                        this.renderManagerTasks();
                    }
                    
                    alert('Task deleted successfully.');
                }
            });
        }

        // Modal - Complete task button
        const completeTaskBtn = document.getElementById('complete-task-btn');
        if (completeTaskBtn) {
            completeTaskBtn.addEventListener('click', () => {
                const modal = document.getElementById('task-modal');
                const taskId = parseInt(modal.dataset.taskId);
                
                if (this.completeTask(taskId)) {
                    alert('Completion request sent to your manager.');
                    this.closeTaskModal();
                    this.renderUserTasks();
                    this.renderUserHistory();
                } else {
                    alert('Failed to complete task');
                }
            });
        }

        // Close modal on outside click
        const taskModal = document.getElementById('task-modal');
        if (taskModal) {
            taskModal.addEventListener('click', (e) => {
                if (e.target.id === 'task-modal') {
                    this.closeTaskModal();
                }
            });
        }

        // Tab navigation - Admin
        document.querySelectorAll('#admin-view .nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                
                // Update active tab
                document.querySelectorAll('#admin-view .nav-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                
                // Show active content
                document.querySelectorAll('#admin-view .tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(`admin-${tabName}-tab`).classList.add('active');

                if (tabName === 'chat') {
                    this.renderAdminChat();
                } else if (tabName === 'announcements') {
                    this.renderAdminAnnouncements();
                }
            });
        });

        // Tab navigation - Manager
        document.querySelectorAll('#manager-view .nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                
                // Update active tab
                document.querySelectorAll('#manager-view .nav-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                
                // Show active content
                document.querySelectorAll('#manager-view .tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(`manager-${tabName}-tab`).classList.add('active');

                if (tabName === 'team-chat') {
                    this.renderManagerChat();
                } else if (tabName === 'admin-chat') {
                    this.renderManagerAdminChat();
                } else if (tabName === 'announcements') {
                    this.renderManagerAnnouncements();
                }
            });
        });

        // Tab navigation - User
        document.querySelectorAll('#user-view .nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                
                // Update active tab
                document.querySelectorAll('#user-view .nav-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                
                // Show active content
                document.querySelectorAll('#user-view .tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(`user-${tabName}-tab`).classList.add('active');

                if (tabName === 'chat') {
                    this.renderUserChat();
                } else if (tabName === 'announcements') {
                    this.renderUserAnnouncements();
                }
            });
        });

        // Chat - User send message
        const userChatForm = document.getElementById('user-chat-form');
        if (userChatForm) {
            userChatForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const input = document.getElementById('user-chat-input');
                const message = input.value.trim();
                
                if (message) {
                    this.sendMessage('user-manager', message);
                    input.value = '';
                    this.renderUserChat();
                }
            });
        }

        // Chat - Manager send message (team chat)
        const managerChatForm = document.getElementById('manager-chat-form');
        if (managerChatForm) {
            managerChatForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const input = document.getElementById('manager-chat-input');
                const message = input.value.trim();
                
                if (message) {
                    this.sendMessage('user-manager', message);
                    input.value = '';
                    this.renderManagerChat();
                }
            });
        }

        // Chat - Manager send message (admin/managers chat)
        const managerAdminChatForm = document.getElementById('manager-admin-chat-form');
        if (managerAdminChatForm) {
            managerAdminChatForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const input = document.getElementById('manager-admin-chat-input');
                const message = input.value.trim();
                
                if (message) {
                    this.sendMessage('manager-admin', message);
                    input.value = '';
                    this.renderManagerAdminChat();
                }
            });
        }

        // Manager - Create announcement
        const createAnnouncementForm = document.getElementById('create-announcement-form');
        if (createAnnouncementForm) {
            createAnnouncementForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const title = document.getElementById('announcement-title').value.trim();
                const msg = document.getElementById('announcement-message').value.trim();
                if (!title || !msg) return;
                this.createAnnouncement({ title, message: msg });
                createAnnouncementForm.reset();
                this.renderManagerAnnouncements();
                alert('Announcement published');
            });
        }

        // Chat - Admin send message
        const adminChatForm = document.getElementById('admin-chat-form');
        if (adminChatForm) {
            adminChatForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const input = document.getElementById('admin-chat-input');
                const message = input.value.trim();
                
                if (message) {
                    this.sendMessage('manager-admin', message);
                    input.value = '';
                    this.renderAdminChat();
                }
            });
        }
    }

    // ============================================
    // Utility Functions
    // ============================================

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) return 'Today';
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days} days ago`;
        
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    formatDateTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.taskFlowApp = new TaskFlowApp();
});
