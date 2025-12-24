import { useState } from 'react';
import { useApp } from '../contexts/AppContext';

export const LoginView = () => {
  const { login, resetData } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (login(username, password)) {
      setUsername('');
      setPassword('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleReset = () => {
    if (window.confirm('This will reset all data to default. Continue?')) {
      resetData();
      setError('');
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div className="view active">
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">StatCore TaskHub</h1>
          <p className="login-subtitle">Task Planning & Monitoring</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="login-username">Username</label>
              <input
                type="text"
                id="login-username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Login</button>
          </form>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
};
