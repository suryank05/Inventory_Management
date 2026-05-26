import { Form, Link } from "react-router-dom";

export default function Login() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--color-background-tertiary)"
    }}>
      <div style={{ width: "100%", maxWidth: "400px", padding: "1rem" }}>

        {/* Logo / Brand */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          
            
          <h2 style={{ margin: "0 0 4px", fontWeight: 500, fontSize: "20px" }}>
            Inventory Management
          </h2>
          <p style={{ margin: 0, fontSize: "13px", color: "var(--color-text-secondary)" }}>
            Sign in to your account
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "var(--color-background-primary)",
          border: "0.5px solid var(--color-border-tertiary)",
          borderRadius: "16px",
          padding: "1.75rem"
        }}>
          <Form method="post">

            <div style={{ marginBottom: "12px" }}>
              <label style={{
                display: "block", fontSize: "13px",
                color: "var(--color-text-secondary)", marginBottom: "4px"
              }}>
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                style={{ width: "100%", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{
                display: "block", fontSize: "13px",
                color: "var(--color-text-secondary)", marginBottom: "4px"
              }}>
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                required
                style={{ width: "100%", boxSizing: "border-box" }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                background: "#185FA5",
                color: "#E6F1FB",
                border: "none",
                borderRadius: "8px",
                padding: "9px",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer"
              }}>
              Sign in
            </button>

          </Form>
        </div>

        {/* Register link */}
        <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "13px", color: "var(--color-text-secondary)" }}>
          Don't have an account?{" "}
          <Link to="/auth/register" style={{ color: "#185FA5", textDecoration: "none", fontWeight: 500 }}>
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
}