import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Package, Trash2, Users, LogOut, ShieldCheck, User as UserIcon, ArrowRight } from "lucide-react";
import { getUserInfo, logout } from "./Axions/api";
import './App.css';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === '/';
  const isAuthPage = location.pathname.startsWith('/auth');

  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUserInfo());
  }, [location.pathname]);

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

  // Standalone Auth Layout (no sidebar on Login / Register)
  if (isAuthPage) {
    return (
      <div className="auth-layout">
        <header className="auth-top-nav">
          <NavLink to="/" className="auth-brand">
            <Package size={24} className="auth-brand-icon" />
            <span className="logo-text">Inventory App</span>
          </NavLink>
          <NavLink to="/" className="auth-back-link">
            Back to Home →
          </NavLink>
        </header>
        <main className="auth-main-container">
          <Outlet />
        </main>
      </div>
    );
  }

  // Authenticated Dashboard Layout
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="nav-header">
          <div className="brand-badge">
            <Package size={28} className="brand-icon" />
            <div className="brand-text">
              <h2 className="app-title">Inventory</h2>
              <span className="app-subtitle">Management Suite</span>
            </div>
          </div>
        </div>
        
        <div className="nav-links">
          <div className="nav-section-title">MAIN NAVIGATION</div>

          <NavLink 
            to="/inventory" 
            end
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            <Package size={20} className="nav-icon" />
            <span className="nav-text">Inventory</span>
          </NavLink>

          <NavLink 
            to="/inventory/deleted" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            <Trash2 size={20} className="nav-icon" />
            <span className="nav-text">Recycle Bin</span>
          </NavLink>
          
          {user?.isAdmin && (
            <NavLink 
              to="/user" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              <Users size={20} className="nav-icon" />
              <span className="nav-text">Users</span>
              <span className="nav-pill-admin">Admin</span>
            </NavLink>
          )}
        </div>
        
        <div className="nav-footer">
          <div className="user-profile-widget">
            <div className="user-avatar-circle">
              {user?.email ? user.email.charAt(0).toUpperCase() : <UserIcon size={18} />}
            </div>
            <div className="user-meta">
              <span className="user-email" title={user?.email || "User"}>
                {user?.email || "Active User"}
              </span>
              <span className={`user-role-badge ${user?.isAdmin ? 'admin' : 'employee'}`}>
                {user?.isAdmin ? "Admin" : "Employee"}
              </span>
            </div>
            <button 
              className="btn-logout" 
              title="Sign Out" 
              onClick={() => logout()}
            >
              <LogOut size={16} />
            </button>
          </div>
          <p className="footer-text">© 2026 Inventory Management</p>
        </div>
      </aside>
      
      <main className="main-content">
        <header className="dashboard-topbar">
          <div className="topbar-breadcrumb">
            <span className="breadcrumb-root">Dashboard</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">
              {location.pathname.includes('deleted') 
                ? 'Recycle Bin' 
                : location.pathname.includes('user') 
                  ? 'User Management' 
                  : location.pathname.includes('add') 
                    ? 'Add Item' 
                    : 'Inventory Overview'}
            </span>
          </div>
          <div className="topbar-actions">
            {user?.email && (
              <div className="topbar-user-pill">
                <span className="status-dot"></span>
                <span className="topbar-user-email">{user.email}</span>
                <span className={`topbar-role-badge ${user.isAdmin ? 'admin' : 'employee'}`}>
                  {user.isAdmin ? 'Admin' : 'Employee'}
                </span>
              </div>
            )}
            <button className="topbar-logout-btn" onClick={() => logout()} title="Logout">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        <div className="dashboard-content-area">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;
