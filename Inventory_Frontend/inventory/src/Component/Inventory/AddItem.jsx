import { Form, Link } from "react-router-dom";
import { PlusCircle, ArrowLeft, Package, FileText, Layers, IndianRupee } from "lucide-react";

function AddItem() {
  return (
    <div style={{ maxWidth: "560px", margin: "1rem auto 3rem" }}>
      {/* Back Link */}
      <Link 
        to="/inventory" 
        style={{ 
          display: "inline-flex", 
          alignItems: "center", 
          gap: "0.4rem", 
          color: "#94a3b8", 
          textDecoration: "none", 
          fontSize: "0.85rem",
          fontWeight: "500",
          marginBottom: "1.25rem",
          transition: "color 0.2s ease"
        }}
      >
        <ArrowLeft size={16} />
        <span>Back to Inventory</span>
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
            <PlusCircle size={22} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: "700", color: "#f8fafc" }}>
              Add New Product
            </h2>
            <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#94a3b8" }}>
              Fill in the details below to add an item to your inventory catalog.
            </p>
          </div>
        </div>

        <Form method="post">
          {/* Item Name */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={labelStyle}>
              <Package size={14} style={{ color: "#a855f7" }} />
              <span>Product Name</span>
            </label>
            <input
              type="text"
              name="itemName"
              placeholder="e.g. Wireless Ergonomic Mouse"
              required
              style={inputStyle}
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={labelStyle}>
              <FileText size={14} style={{ color: "#a855f7" }} />
              <span>Description / Specifications</span>
            </label>
            <textarea
              name="description"
              placeholder="e.g. Bluetooth 5.0, rechargeable battery, silent clicks"
              rows="3"
              required
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          {/* Quantity & Price Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
            <div>
              <label style={labelStyle}>
                <Layers size={14} style={{ color: "#a855f7" }} />
                <span>Quantity</span>
              </label>
              <input
                type="number"
                name="quantity"
                placeholder="0"
                min="0"
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>
                <IndianRupee size={14} style={{ color: "#a855f7" }} />
                <span>Unit Price (₹)</span>
              </label>
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

          {/* Form Actions */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Link to="/inventory" style={{ flex: 1, textDecoration: "none" }}>
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
              Add Product
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
  fontFamily: "inherit",
  transition: "border-color 0.2s, box-shadow 0.2s"
};

export default AddItem;