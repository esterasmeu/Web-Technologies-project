import { AppProvider, useApp } from './contexts/AppContext';
import { Header } from './components/Header';
import { LoginView } from './components/LoginView';
import { AdminView } from './components/AdminView';
import { ManagerView } from './components/ManagerView';
import { UserView } from './components/UserView';

function AppContent() {
  const { currentUser } = useApp();

  if (!currentUser) {
    return <LoginView />;
  }

  return (
    <>
      <Header />
      {currentUser.role === 'admin' && <AdminView />}
      {currentUser.role === 'manager' && <ManagerView />}
      {currentUser.role === 'user' && <UserView />}
      <footer className="footer">
        <p>webtechTeam @HTMLadies</p>
      </footer>
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
