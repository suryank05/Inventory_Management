import { Form, Link } from "react-router-dom";

function AddItem() {
  return (
    <div style={{ padding: "2rem", color: "#f8fafc", fontFamily: "system-ui, sans-serif", display: "flex", justifyContent: "center" }}>
      
      <div style={{ width: "100%", maxWidth: "500px" }}>
        
        {/* Header with Cancel Link */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "600" }}>➕ Add Inventory Item</h2>
            <Link to="/inventory" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem" }}>
              ✕ Cancel
            </Link>
        </div>

        {/* Styled Form Card */}
        <Form method="post" style={{
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "12px",
          padding: "2rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}>

          <div style={{ marginBottom: "1.2rem" }}>
            <label style={{ display: "block", fontSize: "14px", color: "#cbd5e1", marginBottom: "6px" }}>Item Name</label>
            <input
              type="text"
              name="itemName"
              placeholder="e.g. Laptop"
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "1.2rem" }}>
            <label style={{ display: "block", fontSize: "14px", color: "#cbd5e1", marginBottom: "6px" }}>Description</label>
            <textarea
              name="description"
              placeholder="e.g. 16GB RAM, 512GB SSD"
              rows="3"
              required
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontSize: "14px", color: "#cbd5e1", marginBottom: "6px" }}>Quantity</label>
              <input
                type="number"
                name="quantity"
                placeholder="0"
                min="0"
                required
                style={inputStyle}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontSize: "14px", color: "#cbd5e1", marginBottom: "6px" }}>Price (₹)</label>
              <input
                type="number"
                name="price"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
                style={inputStyle}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              background: "#8b5cf6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "0.8rem",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
              transition: "background 0.2s"
            }}>
            Save Item
          </button>
        </Form>
      </div>
    </div>
  );
}

// Common style object for inputs to keep the JSX clean
const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    background: "rgba(0,0,0,0.2)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#f8fafc",
    padding: "0.8rem",
    borderRadius: "6px",
    outline: "none",
    fontFamily: "inherit"
};

export default AddItem;