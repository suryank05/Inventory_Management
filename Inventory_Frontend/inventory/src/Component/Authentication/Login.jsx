import { Form, Link, useActionData } from "react-router-dom";
import { useState } from "react";
import { Mail, Lock, LogIn, AlertCircle, Eye, EyeOff, Sparkles } from "lucide-react";

export default function Login() {
  const actionData = useActionData();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ width: "100%", maxWidth: "420px" }}>
      {/* Brand Header */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          background: "linear-gradient(135deg, #4f46e5 0%, #a855f7 100%)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1rem",
          boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)"
        }}>
          <Sparkles size={24} />
        </div>
        <h2 style={{ margin: "0 0 6px", fontWeight: "700", fontSize: "1.75rem", color: "#f8fafc" }}>
          Welcome Back
        </h2>
        <p style={{ margin: 0, fontSize: "0.88rem", color: "#94a3b8" }}>
          Sign in to access your inventory dashboard
        </p>
      </div>

      {/* Glass Card */}
      <div style={{
        background: "rgba(255, 255, 255, 0.04)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "18px",
        padding: "2rem",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(16px)"
      }}>
        {/* Error message from LoginAction */}
        {actionData?.error && (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "10px",
            padding: "0.75rem 1rem",
            marginBottom: "1.25rem",
            fontSize: "0.85rem",
            color: "#f87171"
          }}>
            <AlertCircle size={16} style={{ minWidth: "16px" }} />
            <span>{actionData.error}</span>
          </div>
        )}

        <Form method="post">
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={labelStyle}>
              <Mail size={14} style={{ color: "#a855f7" }} />
              <span>Email Address</span>
            </label>
            <div style={{ position: "relative" }}>
              <input
                name="email"
                type="email"
                placeholder="admin@example.com"
                required
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ marginBottom: "1.75rem" }}>
            <label style={labelStyle}>
              <Lock size={14} style={{ color: "#a855f7" }} />
              <span>Password</span>
            </label>
            <div style={{ position: "relative" }}>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                style={{ ...inputStyle, paddingRight: "2.5rem" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: "#94a3b8",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #4f46e5 0%, #a855f7 100%)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "0.85rem",
              fontSize: "0.95rem",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              boxShadow: "0 4px 15px rgba(168, 85, 247, 0.35)",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
          >
            <LogIn size={18} />
            <span>Sign In</span>
          </button>
        </Form>
      </div>

      {/* Register link */}
      <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.88rem", color: "#94a3b8" }}>
        Don't have an account?{" "}
        <Link to="/auth/register" style={{ color: "#a855f7", textDecoration: "none", fontWeight: "600" }}>
          Register here →
        </Link>
      </p>
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
  background: "rgba(0, 0, 0, 0.3)",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  color: "#f8fafc",
  padding: "0.75rem 0.9rem",
  borderRadius: "10px",
  outline: "none",
  fontSize: "0.9rem",
  fontFamily: "inherit"
};