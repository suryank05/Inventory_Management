import { useLoaderData, Form, Link } from "react-router-dom";

export default function DeletedInventoryPage() {
    const deletedItems = useLoaderData();

    return (
        <div style={{ padding: "2rem", color: "#f8fafc", fontFamily: "system-ui, sans-serif" }}>
            
            {/* Header Section */}
            <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                marginBottom: "2rem",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                paddingBottom: "1rem"
            }}>
                <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: "600", color: "#ef4444" }}>🗑️ Deleted Items</h1>
                <Link to="/inventory" style={{ 
                    color: "#94a3b8", 
                    textDecoration: "none", 
                    fontWeight: "500",
                    padding: "0.5rem 1rem",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "6px"
                }}>
                    ← Back to Inventory
                </Link>
            </div>

            {/* Items Grid */}
            {deletedItems.length === 0 ? (
                <div style={{ textAlign: "center", padding: "4rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px" }}>
                    <h2 style={{ color: "#94a3b8" }}>No Deleted Items</h2>
                    <p style={{ color: "#64748b" }}>Your recycle bin is empty.</p>
                </div>
            ) : (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
                    gap: "1.5rem"
                }}>
                    {deletedItems.map((item, index) => (
                        <div key={item.id || index} style={{
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            borderRadius: "12px",
                            padding: "1.5rem",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}>
                            
                            {/* Card Top: Title & Timestamp */}
                            <div>
                                <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.4rem", color: "#f1f5f9" }}>
                                    {/* Using fallback logic just in case backend sends lowercase or uppercase */}
                                    {item.ItemName || item.itemName || "Unnamed Item"}
                                </h3>
                                <p style={{ margin: "0 0 1rem 0", color: "#64748b", fontSize: "0.85rem" }}>
                                    Deleted at: {item.deletedAt ? new Date(item.deletedAt).toLocaleString() : "Unknown"}
                                </p>
                            </div>

                            {/* Card Bottom: Stats and Button */}
                            <div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    background: "rgba(0,0,0,0.2)",
                                    padding: "0.8rem",
                                    borderRadius: "8px",
                                    marginBottom: "1rem"
                                }}>
                                    <span style={{ color: "#cbd5e1" }}>Qty: <strong style={{ color: "#fff" }}>{item.Quantity || item.quantity}</strong></span>
                                    <span style={{ color: "#cbd5e1" }}>Price: <strong style={{ color: "#10b981" }}>₹{item.Price || item.price}</strong></span>
                                </div>

                                <Form method="post" action={`/inventory/restore/${item.id}`}>
                                    <button type="submit" style={{
                                        width: "100%",
                                        background: "rgba(34, 197, 94, 0.15)", // Soft Green Tint
                                        color: "#22c55e",
                                        border: "1px solid rgba(34, 197, 94, 0.3)",
                                        padding: "0.6rem",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                        transition: "all 0.2s ease"
                                    }}>
                                        ↩ Restore Item
                                    </button>
                                </Form>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}