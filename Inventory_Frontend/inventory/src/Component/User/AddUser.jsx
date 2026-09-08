import { Form, Link } from "react-router-dom";
import { UserPlus, ArrowLeft, User, Mail, Lock, Shield } from "lucide-react";

function AddUser() {
  return (
    <div style={{ maxWidth: "520px", margin: "1rem auto 3rem" }}>
      {/* Back Link */}
      <Link 
        to="/user" 
        style={{ 
          display: "inline-flex", 
          alignItems: "center", 
          gap: "0.4rem", 
          color: "#94a3b8", 
          textDecoration: "none", 
          fontSize: "0.85rem",
          fontWeight: "500",
          marginBottom: "1.25rem"
        }}
      >
        <ArrowLeft size={16} />
        <span>Back to Users</span>
      </Link>

      {/* Styled Form Card */}
      <div style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "16px",
        padding: "2rem",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(12px)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <div style={{
            width: "42px",
            height: "42px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, rgba(79, 70, 229, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)",
            color: "#a855f7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <UserPlus size={22} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: "700", color: "#f8fafc" }}>
              Create User Account
            </h2>
            <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#94a3b8" }}>
              Add a new administrator or employee to access the dashboard.
            </p>
          </div>
        </div>

        <Form method="post">
          <div style={{ marginBottom: "1.2rem" }}>
            <label style={labelStyle}>
              <User size={14} style={{ color: "#a855f7" }} />
              <span>Full Name / Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="e.g. Alex Johnson"
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "1.2rem" }}>
            <label style={labelStyle}>
              <Mail size={14} style={{ color: "#a855f7" }} />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="alex@company.com"
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "1.2rem" }}>
            <label style={labelStyle}>
              <Lock size={14} style={{ color: "#a855f7" }} />
              <span>Temporary Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "1.75rem" }}>
            <label style={labelStyle}>
              <Shield size={14} style={{ color: "#a855f7" }} />
              <span>System Role</span>
            </label>
            <select
              name="role"
              defaultValue="EMPLOYEE"
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              <option value="EMPLOYEE" style={{ background: "#1a1435", color: "#f8fafc" }}>
                Employee (Inventory Access)
              </option>
              <option value="ADMIN" style={{ background: "#1a1435", color: "#f8fafc" }}>
                Admin (Full Access & User Management)
              </option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Link to="/user" style={{ flex: 1, textDecoration: "none" }}>
              <button
                type="button"
                style={{
                  width: "100%",
                  background: "rgba(255, 255, 255, 0.05)",
                  color: "#cbd5e1",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "10px",
                  padding: "0.75rem",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                Cancel
              </button>
            </Link>

            <button
              type="submit"
              style={{
                flex: 2,
                background: "linear-gradient(135deg, #4f46e5 0%, #a855f7 100%)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "0.75rem",
                fontSize: "0.95rem",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(168, 85, 247, 0.35)",
                transition: "transform 0.2s, box-shadow 0.2s"
              }}
            >
              Create Account
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.4rem",
  fontSize: "0.82rem",
  color: "#cbd5e1",
  fontWeight: "600",
  marginBottom: "6px"
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  background: "rgba(0, 0, 0, 0.25)",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  color: "#f8fafc",
  padding: "0.75rem 0.9rem",
  borderRadius: "10px",
  outline: "none",
  fontSize: "0.9rem",
  fontFamily: "inherit"
};

export default AddUser;