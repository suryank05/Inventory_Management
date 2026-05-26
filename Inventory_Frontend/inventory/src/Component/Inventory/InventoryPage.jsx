import { useLoaderData, Form, Link } from "react-router-dom";

function InventoryPage() {
    const items = useLoaderData();

    console.log("Data from Spring Boot:", items);

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
                <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: "600" }}>📦 Inventory</h1>
                
                {/* NEW: Button Container for Side-by-Side Layout */}
                <div style={{ display: "flex", gap: "1rem" }}>
                    
                    {/* The New Recycle Bin Button */}
                    <Link to="/inventory/deleted" style={{ textDecoration: "none" }}>
                        <button style={{
                            background: "rgba(255, 255, 255, 0.05)", 
                            color: "#cbd5e1",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            padding: "0.6rem 1.5rem",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                        }}>
                            🗑️ Recycle Bin
                        </button>
                    </Link>

                    {/* Your Existing Add Item Button */}
                    <Link to="/inventory/add" style={{ textDecoration: "none" }}>
                        <button style={{
                            background: "#8b5cf6", // Matches your sidebar's purple vibe
                            color: "white",
                            border: "none",
                            padding: "0.6rem 1.5rem",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                        }}>
                            + Add Item
                        </button>
                    </Link>
                </div>
            </div>

            {/* Items Grid */}
            {items.length === 0 ? (
                <div style={{ textAlign: "center", padding: "4rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px" }}>
                    <h2 style={{ color: "#94a3b8" }}>No Items Found in Inventory</h2>
                    <p style={{ color: "#64748b" }}>Click the "Add Item" button to get started.</p>
                </div>
            ) : (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
                    gap: "1.5rem"
                }}>
                    {items.map((element, index) => (
                        <div key={element.id || index} style={{
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            borderRadius: "12px",
                            padding: "1.5rem",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}>
                            
                            {/* Card Top: Title and Description */}
                            <div>
                                <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.4rem", color: "#f1f5f9" }}>
                                    {element.itemName || "Unnamed Item"}
                                </h3>
                                <p style={{ margin: "0 0 1rem 0", color: "#94a3b8", fontSize: "0.95rem", lineHeight: "1.5" }}>
                                    {element.Description || "No description provided for this item."}
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
                                    <span style={{ color: "#cbd5e1" }}>Qty: <strong style={{ color: "#fff" }}>{element.Quantity}</strong></span>
                                    <span style={{ color: "#cbd5e1" }}>Price: <strong style={{ color: "#10b981" }}>₹{element.Price}</strong></span>
                                </div>

                                <Form method="post" action={`/inventory/delete/${element.id}`}>
                                    <button type="submit" style={{
                                        width: "100%",
                                        background: "rgba(239, 68, 68, 0.1)",
                                        color: "#ef4444",
                                        border: "1px solid rgba(239, 68, 68, 0.3)",
                                        padding: "0.6rem",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                    }}>
                                        🗑 Delete Item
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

export default InventoryPage;