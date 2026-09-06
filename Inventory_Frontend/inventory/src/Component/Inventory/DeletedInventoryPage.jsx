import { useLoaderData, Form, Link } from "react-router-dom";
import { Trash2, ArrowLeft, RotateCcw, Calendar, Layers, IndianRupee, AlertCircle } from "lucide-react";

export default function DeletedInventoryPage() {
    const rawData = useLoaderData();
    const deletedItems = Array.isArray(rawData) ? rawData : [];

    return (
        <div style={{ padding: "0 0.5rem" }}>
            {/* Header Section */}
            <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "2rem",
                paddingBottom: "1.25rem",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
            }}>
                <div>
                    <h1 style={{ 
                        margin: 0, 
                        fontSize: "1.75rem", 
                        fontWeight: "700", 
                        color: "#f8fafc",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem"
                    }}>
                        <div style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            background: "rgba(239, 68, 68, 0.15)",
                            color: "#f87171",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Trash2 size={20} />
                        </div>
                        Recycle Bin
                    </h1>
                    <p style={{ margin: "4px 0 0", color: "#94a3b8", fontSize: "0.85rem" }}>
                        Deleted items are held here. You can restore them to active inventory at any time.
                    </p>
                </div>

                <Link to="/inventory" style={{ textDecoration: "none" }}>
                    <button style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "#cbd5e1", 
                        padding: "0.55rem 1.1rem",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "10px",
                        fontSize: "0.85rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                    }}>
                        <ArrowLeft size={16} />
                        <span>Back to Inventory</span>
                    </button>
                </Link>
            </div>

            {/* Items Grid or Empty State */}
            {deletedItems.length === 0 ? (
                <div style={{ 
                    textAlign: "center", 
                    padding: "4.5rem 2rem", 
                    background: "rgba(255, 255, 255, 0.02)", 
                    borderRadius: "16px",
                    border: "1px dashed rgba(255, 255, 255, 0.1)"
                }}>
                    <div style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        background: "rgba(239, 68, 68, 0.1)",
                        color: "#f87171",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1.5rem"
                    }}>
                        <Trash2 size={28} />
                    </div>
                    <h3 style={{ color: "#f8fafc", margin: "0 0 0.5rem", fontSize: "1.3rem" }}>
                        Recycle Bin is Empty
                    </h3>
                    <p style={{ color: "#94a3b8", maxWidth: "400px", margin: "0 auto 1.5rem", fontSize: "0.9rem" }}>
                        No items have been deleted. When you delete products from your inventory, they will appear here.
                    </p>
                    <Link to="/inventory" style={{ textDecoration: "none" }}>
                        <button style={{
                            background: "linear-gradient(135deg, #4f46e5 0%, #a855f7 100%)",
                            color: "white",
                            border: "none",
                            padding: "0.6rem 1.4rem",
                            borderRadius: "10px",
                            fontWeight: "600",
                            cursor: "pointer",
                            fontSize: "0.85rem"
                        }}>
                            View Inventory
                        </button>
                    </Link>
                </div>
            ) : (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", 
                    gap: "1.25rem"
                }}>
                    {deletedItems.map((item, index) => (
                        <div key={item.id || index} style={{
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            borderRadius: "14px",
                            padding: "1.35rem",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)"
                        }}>
                            {/* Card Top */}
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem" }}>
                                    <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "700", color: "#f8fafc" }}>
                                        {item.itemName || item.ItemName || "Unnamed Product"}
                                    </h3>
                                    <span style={{
                                        fontSize: "0.7rem",
                                        fontWeight: "700",
                                        textTransform: "uppercase",
                                        padding: "3px 8px",
                                        borderRadius: "999px",
                                        background: "rgba(239, 68, 68, 0.15)",
                                        color: "#f87171",
                                        border: "1px solid rgba(239, 68, 68, 0.3)"
                                    }}>
                                        Deleted
                                    </span>
                                </div>

                                <p style={{ 
                                    margin: "0 0 1rem 0", 
                                    color: "#94a3b8", 
                                    fontSize: "0.88rem",
                                    lineHeight: "1.5"
                                }}>
                                    {item.description || item.Description || "No description provided."}
                                </p>

                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.4rem",
                                    fontSize: "0.78rem",
                                    color: "#64748b",
                                    marginBottom: "1rem"
                                }}>
                                    <Calendar size={13} />
                                    <span>Deleted: {item.deletedAt ? new Date(item.deletedAt).toLocaleString() : "Recently"}</span>
                                </div>
                            </div>

                            {/* Card Bottom */}
                            <div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    background: "rgba(0, 0, 0, 0.3)",
                                    border: "1px solid rgba(255, 255, 255, 0.05)",
                                    padding: "0.65rem 0.9rem",
                                    borderRadius: "10px",
                                    marginBottom: "1rem"
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#cbd5e1", fontSize: "0.85rem" }}>
                                        <Layers size={15} style={{ color: "#94a3b8" }} />
                                        <span>Qty: <strong style={{ color: "#f8fafc" }}>{item.quantity || item.Quantity || 0}</strong></span>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", color: "#10b981", fontSize: "0.95rem", fontWeight: "700" }}>
                                        <span>₹{Number(item.price || item.Price || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                </div>

                                <Form method="post" action={`/inventory/restore/${item.id}`}>
                                    <button 
                                        type="submit" 
                                        style={{
                                            width: "100%",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "0.5rem",
                                            background: "rgba(16, 185, 129, 0.15)",
                                            color: "#34d399",
                                            border: "1px solid rgba(16, 185, 129, 0.3)",
                                            padding: "0.6rem",
                                            borderRadius: "8px",
                                            fontSize: "0.85rem",
                                            fontWeight: "700",
                                            cursor: "pointer",
                                            transition: "all 0.2s ease"
                                        }}
                                    >
                                        <RotateCcw size={16} />
                                        <span>Restore to Inventory</span>
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