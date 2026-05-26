import { Form } from "react-router-dom";

function AddUser() {
  return (
    <div style={{ padding: "1.5rem 2rem", maxWidth: "480px" }}>

      <h2 style={{ margin: "0 0 1.5rem", fontWeight: 500, fontSize: "18px" }}>
        Add User
      </h2>

      <Form method="post" style={{
        background: "var(--color-background-primary)",
        border: "0.5px solid var(--color-border-tertiary)",
        borderRadius: "12px",
        padding: "1.25rem"
      }}>

        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", fontSize: "13px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="suryank"
            required
            style={{ width: "100%", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", fontSize: "13px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="suryank@gmail.com"
            required
            style={{ width: "100%", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ display: "block", fontSize: "13px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>
            Password
          </label>
          <input
            type="password"
            name="password"
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
            padding: "8px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer"
          }}>
          Add User
        </button>

      </Form>
    </div>
  );
}

export default AddUser;