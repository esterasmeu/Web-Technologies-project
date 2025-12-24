import { useApp } from '../contexts/AppContext';

export const Header = () => {
  const { currentUser, logout } = useApp();

  if (!currentUser) return null;

  return (
    <header id="app-header" className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="logo">StatCore TaskHub</h1>
          <div className="user-info">
            <span className="user-name">Welcome back {currentUser.fullName}!</span>
            <span className="user-role">{currentUser.role.toUpperCase()}</span>
            <button onClick={logout} className="btn btn-secondary">Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
};
