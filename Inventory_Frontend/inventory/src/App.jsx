import { Outlet, NavLink, useLocation } from "react-router-dom";
import './App.css';

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  // Don't show sidebar on landing page
  if (isLandingPage) {
    return (
      <div className="app-container landing">
        <nav className="landing-nav">
          <div className="container">
            <div className="nav-wrapper">
              <div className="logo">
                <h2 className="logo-text">Inventory App</h2>
              </div>
              
              <div className="nav-actions">
                <NavLink to="/auth" className="nav-link-landing">
                  Login
                </NavLink>
                <NavLink to="/auth/register" className="btn btn-primary">
                  Sign Up
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="landing-main">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      <nav className="sidebar">
        <div className="nav-header">
          <h2 className="app-title">Inventory App</h2>
        </div>
        
        <div className="nav-links">
          <NavLink 
            to="/inventory" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            <span className="nav-icon">📦</span>
            <span className="nav-text">Inventory</span>
          </NavLink>
          
          <NavLink 
            to="/user" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            <span className="nav-icon">👤</span>
            <span className="nav-text">Users</span>
          </NavLink>
        </div>
        
        <div className="nav-footer">
          <p className="footer-text">© 2026 Inventory</p>
        </div>
      </nav>
      
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
