import { useLoaderData, Form, Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useMemo } from "react";
import { 
  Package, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  AlertTriangle, 
  TrendingUp, 
  Layers, 
  X, 
  CheckCircle2, 
  IndianRupee,
  Loader2 
} from "lucide-react";
import { updateItem, deleteItem } from "../../Axions/inventoryAxions";

function InventoryPage() {
    const pageData = useLoaderData() || {}; 
    const navigate = useNavigate();
    const location = useLocation();

    // Raw items from Spring Boot Page or empty array
    const rawItems = pageData?.content || [];

    // State for Search and Filter
    const [searchQuery, setSearchQuery] = useState("");
    const [stockFilter, setStockFilter] = useState("all"); // 'all', 'in-stock', 'low-stock', 'out-of-stock'

    // State for Edit Modal
    const [editingItem, setEditingItem] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateFeedback, setUpdateFeedback] = useState("");

    // State for Deletion Modal & Loading
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteNotice, setDeleteNotice] = useState("");

    const handleConfirmDelete = async () => {
        if (!itemToDelete) return;
        setIsDeleting(true);
        try {
            await deleteItem(itemToDelete.id);
            setDeleteNotice(`"${itemToDelete.itemName}" was moved to Recycle Bin.`);
            setItemToDelete(null);
            navigate("/inventory", { replace: true });
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete product. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    // Filter items locally by search query and stock filter
    const filteredItems = useMemo(() => {
        return rawItems.filter(item => {
            const name = (item.itemName || "").toLowerCase();
            const desc = (item.description || "").toLowerCase();
            const query = searchQuery.toLowerCase().trim();
            const matchesSearch = !query || name.includes(query) || desc.includes(query);

            const qty = Number(item.quantity) || 0;
            let matchesStock = true;
            if (stockFilter === "in-stock") matchesStock = qty > 5;
            else if (stockFilter === "low-stock") matchesStock = qty > 0 && qty <= 5;
            else if (stockFilter === "out-of-stock") matchesStock = qty === 0;

            return matchesSearch && matchesStock;
        });
    }, [rawItems, searchQuery, stockFilter]);

    // Calculate live inventory stats
    const stats = useMemo(() => {
        const totalItems = pageData?.totalElements || rawItems.length;
        const totalUnits = rawItems.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0);
        const totalValue = rawItems.reduce((acc, item) => acc + ((Number(item.price) || 0) * (Number(item.quantity) || 0)), 0);
        const lowStockCount = rawItems.filter(item => (Number(item.quantity) || 0) <= 5).length;

        return { totalItems, totalUnits, totalValue, lowStockCount };
    }, [pageData, rawItems]);

    // Handle Edit Item Submit
    const handleSaveEdit = async (e) => {
        e.preventDefault();
        if (!editingItem) return;
        setIsUpdating(true);
        setUpdateFeedback("");

        try {
            await updateItem({
                id: editingItem.id,
                itemName: editingItem.itemName,
                description: editingItem.description,
                quantity: Number(editingItem.quantity),
                price: Number(editingItem.price)
            });
            setUpdateFeedback("Item updated successfully!");
            setTimeout(() => {
                setEditingItem(null);
                setUpdateFeedback("");
                // Refresh current page
                navigate(location.pathname + location.search);
            }, 600);
        } catch (error) {
            console.error("Failed to update item", error);
            setUpdateFeedback("Failed to update item. Please try again.");
        } finally {
            setIsUpdating(false);
        }
    };

    const handlePageChange = (newPageNumber) => {
        navigate(`${location.pathname}?page=${newPageNumber}`);
    };

    return (
        <div style={{ padding: "0 0.5rem" }}>
            {/* Top Stat Cards */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1.25rem",
                marginBottom: "2rem"
            }}>
                <div style={statCardStyle}>
                    <div style={{ ...statIconStyle, background: "rgba(99, 102, 241, 0.15)", color: "#818cf8" }}>
                        <Package size={22} />
                    </div>
                    <div>
                        <div style={statLabelStyle}>Total Products</div>
                        <div style={statValueStyle}>{stats.totalItems}</div>
                    </div>
                </div>

                <div style={statCardStyle}>
                    <div style={{ ...statIconStyle, background: "rgba(168, 85, 247, 0.15)", color: "#c084fc" }}>
                        <Layers size={22} />
                    </div>
                    <div>
                        <div style={statLabelStyle}>Total Units in Stock</div>
                        <div style={statValueStyle}>{stats.totalUnits}</div>
                    </div>
                </div>

                <div style={statCardStyle}>
                    <div style={{ ...statIconStyle, background: "rgba(16, 185, 129, 0.15)", color: "#34d399" }}>
                        <IndianRupee size={22} />
                    </div>
                    <div>
                        <div style={statLabelStyle}>Inventory Value</div>
                        <div style={statValueStyle}>₹{stats.totalValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
                    </div>
                </div>

                <div style={statCardStyle}>
                    <div style={{ ...statIconStyle, background: "rgba(249, 115, 22, 0.15)", color: "#fb923c" }}>
                        <AlertTriangle size={22} />
                    </div>
                    <div>
                        <div style={statLabelStyle}>Low Stock Alert</div>
                        <div style={{ ...statValueStyle, color: stats.lowStockCount > 0 ? "#fb923c" : "#f8fafc" }}>
                            {stats.lowStockCount}
                        </div>
                    </div>
                </div>
            </div>

            {/* Header Toolbar */}
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.75rem",
                padding: "1.25rem",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "14px",
                backdropFilter: "blur(12px)"
            }}>
                {/* Search Bar */}
                <div style={{ display: "flex", alignItems: "center", flex: "1 1 280px", maxWidth: "420px", position: "relative" }}>
                    <Search size={18} style={{ position: "absolute", left: "12px", color: "#94a3b8" }} />
                    <input 
                        type="text"
                        placeholder="Search items by name or details..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "0.65rem 1rem 0.65rem 2.4rem",
                            background: "rgba(0, 0, 0, 0.25)",
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                            borderRadius: "10px",
                            color: "#f8fafc",
                            fontSize: "0.9rem",
                            outline: "none"
                        }}
                    />
                </div>

                {/* Filter Pills */}
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                    {["all", "in-stock", "low-stock", "out-of-stock"].map((filterKey) => (
                        <button
                            key={filterKey}
                            onClick={() => setStockFilter(filterKey)}
                            style={{
                                background: stockFilter === filterKey ? "linear-gradient(135deg, #4f46e5 0%, #a855f7 100%)" : "rgba(255, 255, 255, 0.05)",
                                color: stockFilter === filterKey ? "#fff" : "#cbd5e1",
                                border: stockFilter === filterKey ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
                                padding: "0.45rem 0.9rem",
                                borderRadius: "8px",
                                fontSize: "0.8rem",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "all 0.2s ease"
                            }}
                        >
                            {filterKey === "all" ? "All" : filterKey === "in-stock" ? "In Stock" : filterKey === "low-stock" ? "Low Stock" : "Out of Stock"}
                        </button>
                    ))}
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <Link to="/inventory/deleted" style={{ textDecoration: "none" }}>
                        <button style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            background: "rgba(255, 255, 255, 0.05)", 
                            color: "#cbd5e1",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            padding: "0.6rem 1.1rem",
                            borderRadius: "10px",
                            fontWeight: "600",
                            fontSize: "0.85rem",
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                        }}>
                            <Trash2 size={16} />
                            <span>Recycle Bin</span>
                        </button>
                    </Link>

                    <Link to="/inventory/add" style={{ textDecoration: "none" }}>
                        <button style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            background: "linear-gradient(135deg, #4f46e5 0%, #a855f7 100%)", 
                            color: "white",
                            border: "none",
                            padding: "0.6rem 1.25rem",
                            borderRadius: "10px",
                            fontWeight: "700",
                            fontSize: "0.85rem",
                            cursor: "pointer",
                            boxShadow: "0 4px 15px rgba(168, 85, 247, 0.35)",
                            transition: "all 0.2s ease"
                        }}>
                            <Plus size={18} />
                            <span>Add Item</span>
                        </button>
                    </Link>
                </div>
            </div>

            {/* Items Grid */}
            {filteredItems.length === 0 ? (
                <div style={{ 
                    textAlign: "center", 
                    padding: "4rem 2rem", 
                    background: "rgba(255, 255, 255, 0.02)", 
                    borderRadius: "16px",
                    border: "1px dashed rgba(255, 255, 255, 0.1)"
                }}>
                    <div style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        background: "rgba(168, 85, 247, 0.1)",
                        color: "#a855f7",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1.5rem"
                    }}>
                        <Package size={28} />
                    </div>
                    <h3 style={{ color: "#f1f5f9", margin: "0 0 0.5rem", fontSize: "1.3rem" }}>
                        {searchQuery ? "No matching products found" : "No Inventory Items Yet"}
                    </h3>
                    <p style={{ color: "#94a3b8", maxWidth: "420px", margin: "0 auto 1.5rem", fontSize: "0.9rem" }}>
                        {searchQuery 
                            ? `Try clearing your search "${searchQuery}" or switching the filter.`
                            : "Your catalog is empty. Click below to add your first product to inventory."}
                    </p>
                    {searchQuery ? (
                        <button 
                            onClick={() => { setSearchQuery(""); setStockFilter("all"); }}
                            style={{
                                background: "rgba(255, 255, 255, 0.08)",
                                color: "#f8fafc",
                                border: "1px solid rgba(255, 255, 255, 0.15)",
                                padding: "0.5rem 1.25rem",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "600"
                            }}
                        >
                            Reset Filters
                        </button>
                    ) : (
                        <Link to="/inventory/add" style={{ textDecoration: "none" }}>
                            <button style={{
                                background: "linear-gradient(135deg, #4f46e5 0%, #a855f7 100%)",
                                color: "white",
                                border: "none",
                                padding: "0.6rem 1.4rem",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "600"
                            }}>
                                + Add First Item
                            </button>
                        </Link>
                    )}
                </div>
            ) : (
                <>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", 
                        gap: "1.25rem",
                        marginBottom: "2rem" 
                    }}>
                        {filteredItems.map((element, index) => {
                            const qty = Number(element.quantity) || 0;
                            const isOutOfStock = qty === 0;
                            const isLowStock = qty > 0 && qty <= 5;

                            return (
                                <div key={element.id || index} style={{
                                    background: "rgba(255, 255, 255, 0.03)",
                                    border: "1px solid rgba(255, 255, 255, 0.08)",
                                    borderRadius: "14px",
                                    padding: "1.35rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                                    transition: "transform 0.2s, border-color 0.2s",
                                    position: "relative"
                                }}>
                                    {/* Top Card Info */}
                                    <div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.6rem" }}>
                                            <h3 style={{ 
                                                margin: 0, 
                                                fontSize: "1.2rem", 
                                                fontWeight: "700", 
                                                color: "#f8fafc",
                                                wordBreak: "break-word"
                                            }}>
                                                {element.itemName || "Unnamed Product"}
                                            </h3>

                                            {/* Stock Status Pill */}
                                            <span style={{
                                                fontSize: "0.7rem",
                                                fontWeight: "700",
                                                textTransform: "uppercase",
                                                padding: "3px 8px",
                                                borderRadius: "999px",
                                                whiteSpace: "nowrap",
                                                background: isOutOfStock 
                                                    ? "rgba(239, 68, 68, 0.15)" 
                                                    : isLowStock 
                                                        ? "rgba(249, 115, 22, 0.15)" 
                                                        : "rgba(16, 185, 129, 0.15)",
                                                color: isOutOfStock ? "#f87171" : isLowStock ? "#fb923c" : "#34d399",
                                                border: `1px solid ${isOutOfStock ? 'rgba(239,68,68,0.3)' : isLowStock ? 'rgba(249,115,22,0.3)' : 'rgba(16,185,129,0.3)'}`
                                            }}>
                                                {isOutOfStock ? "Out of Stock" : isLowStock ? "Low Stock" : "In Stock"}
                                            </span>
                                        </div>

                                        <p style={{ 
                                            margin: "0 0 1.25rem 0", 
                                            color: "#94a3b8", 
                                            fontSize: "0.88rem", 
                                            lineHeight: "1.5",
                                            minHeight: "2.6rem",
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden"
                                        }}>
                                            {element.description || "No description provided."}
                                        </p>
                                    </div>

                                    {/* Stats & Actions */}
                                    <div>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            background: "rgba(0, 0, 0, 0.3)",
                                            border: "1px solid rgba(255, 255, 255, 0.05)",
                                            padding: "0.75rem 1rem",
                                            borderRadius: "10px",
                                            marginBottom: "1rem"
                                        }}>
                                            <div>
                                                <span style={{ fontSize: "0.75rem", color: "#94a3b8", display: "block" }}>Quantity</span>
                                                <strong style={{ fontSize: "1.1rem", color: isOutOfStock ? "#f87171" : "#f8fafc" }}>
                                                    {qty} <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: "normal" }}>units</span>
                                                </strong>
                                            </div>
                                            <div style={{ textAlign: "right" }}>
                                                <span style={{ fontSize: "0.75rem", color: "#94a3b8", display: "block" }}>Unit Price</span>
                                                <strong style={{ fontSize: "1.1rem", color: "#10b981" }}>
                                                    ₹{Number(element.price || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                </strong>
                                            </div>
                                        </div>

                                        {/* Action Buttons: Edit & Delete */}
                                        <div style={{ display: "flex", gap: "0.6rem" }}>
                                            <button 
                                                onClick={() => setEditingItem({ ...element })}
                                                style={{
                                                    flex: 1,
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    gap: "0.4rem",
                                                    background: "rgba(99, 102, 241, 0.12)",
                                                    color: "#a5b4fc",
                                                    border: "1px solid rgba(99, 102, 241, 0.25)",
                                                    padding: "0.55rem",
                                                    borderRadius: "8px",
                                                    fontSize: "0.85rem",
                                                    fontWeight: "600",
                                                    cursor: "pointer",
                                                    transition: "all 0.2s ease"
                                                }}
                                            >
                                                <Edit3 size={15} />
                                                <span>Edit</span>
                                            </button>

                                            <Form 
                                                method="post" 
                                                action={`/inventory/delete/${element.id}`}
                                                style={{ flex: 1 }}
                                                onSubmit={(e) => {
                                                    if (!window.confirm(`Move "${element.itemName}" to recycle bin?`)) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                <button 
                                                    type="submit" 
                                                    style={{
                                                        width: "100%",
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        gap: "0.4rem",
                                                        background: "rgba(239, 68, 68, 0.1)",
                                                        color: "#f87171",
                                                        border: "1px solid rgba(239, 68, 68, 0.25)",
                                                        padding: "0.55rem",
                                                        borderRadius: "8px",
                                                        fontSize: "0.85rem",
                                                        fontWeight: "600",
                                                        cursor: "pointer",
                                                        transition: "all 0.2s ease"
                                                    }}
                                                >
                                                    <Trash2 size={15} />
                                                    <span>Delete</span>
                                                </button>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    {pageData.totalPages > 1 && (
                        <div style={{ 
                            display: "flex", 
                            justifyContent: "center", 
                            alignItems: "center", 
                            gap: "1rem",
                            marginTop: "2.5rem",
                            paddingTop: "1.5rem",
                            borderTop: "1px solid rgba(255, 255, 255, 0.08)"
                        }}>
                            <button 
                                onClick={() => handlePageChange(pageData.number - 1)}
                                disabled={pageData.first} 
                                style={{
                                    padding: "0.5rem 1.25rem",
                                    borderRadius: "8px",
                                    background: pageData.first ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.1)",
                                    color: pageData.first ? "#64748b" : "#f8fafc",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    cursor: pageData.first ? "not-allowed" : "pointer",
                                    fontWeight: "600",
                                    fontSize: "0.85rem"
                                }}
                            >
                                ← Previous
                            </button>

                            <span style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: "500" }}>
                                Page <strong style={{ color: "#f8fafc" }}>{(pageData.number || 0) + 1}</strong> of {pageData.totalPages || 1}
                            </span>

                            <button 
                                onClick={() => handlePageChange(pageData.number + 1)}
                                disabled={pageData.last} 
                                style={{
                                    padding: "0.5rem 1.25rem",
                                    borderRadius: "8px",
                                    background: pageData.last ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.1)",
                                    color: pageData.last ? "#64748b" : "#f8fafc",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    cursor: pageData.last ? "not-allowed" : "pointer",
                                    fontWeight: "600",
                                    fontSize: "0.85rem"
                                }}
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Edit Item Modal */}
            {editingItem && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0, 0, 0, 0.75)",
                    backdropFilter: "blur(6px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                    padding: "1rem"
                }}>
                    <div style={{
                        background: "#1a1435",
                        border: "1px solid rgba(168, 85, 247, 0.3)",
                        borderRadius: "16px",
                        width: "100%",
                        maxWidth: "480px",
                        padding: "1.75rem",
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
                        animation: "fade-in-up 0.25s ease-out"
                    }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                            <h3 style={{ margin: 0, fontSize: "1.3rem", color: "#f8fafc", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <Edit3 size={18} style={{ color: "#a855f7" }} />
                                Edit Inventory Item
                            </h3>
                            <button 
                                onClick={() => setEditingItem(null)}
                                style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", padding: "4px" }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {updateFeedback && (
                            <div style={{
                                padding: "0.6rem 1rem",
                                borderRadius: "8px",
                                marginBottom: "1rem",
                                fontSize: "0.85rem",
                                background: updateFeedback.includes("success") ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                                color: updateFeedback.includes("success") ? "#34d399" : "#f87171",
                                border: `1px solid ${updateFeedback.includes("success") ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`
                            }}>
                                {updateFeedback}
                            </div>
                        )}

                        <form onSubmit={handleSaveEdit}>
                            <div style={{ marginBottom: "1rem" }}>
                                <label style={formLabelStyle}>Product Name</label>
                                <input 
                                    type="text"
                                    value={editingItem.itemName || ""}
                                    onChange={(e) => setEditingItem({ ...editingItem, itemName: e.target.value })}
                                    required
                                    style={formInputStyle}
                                />
                            </div>

                            <div style={{ marginBottom: "1rem" }}>
                                <label style={formLabelStyle}>Description</label>
                                <textarea 
                                    rows="3"
                                    value={editingItem.description || ""}
                                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                                    style={{ ...formInputStyle, resize: "vertical" }}
                                />
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                                <div>
                                    <label style={formLabelStyle}>Quantity (Units)</label>
                                    <input 
                                        type="number"
                                        min="0"
                                        value={editingItem.quantity}
                                        onChange={(e) => setEditingItem({ ...editingItem, quantity: e.target.value })}
                                        required
                                        style={formInputStyle}
                                    />
                                </div>
                                <div>
                                    <label style={formLabelStyle}>Unit Price (₹)</label>
                                    <input 
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={editingItem.price}
                                        onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                                        required
                                        style={formInputStyle}
                                    />
                                </div>
                            </div>

                            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                                <button 
                                    type="button"
                                    onClick={() => setEditingItem(null)}
                                    style={{
                                        background: "rgba(255, 255, 255, 0.05)",
                                        color: "#cbd5e1",
                                        border: "1px solid rgba(255, 255, 255, 0.15)",
                                        padding: "0.6rem 1.2rem",
                                        borderRadius: "8px",
                                        fontWeight: "600",
                                        cursor: "pointer"
                                    }}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    disabled={isUpdating}
                                    style={{
                                        background: "linear-gradient(135deg, #4f46e5 0%, #a855f7 100%)",
                                        color: "white",
                                        border: "none",
                                        padding: "0.6rem 1.4rem",
                                        borderRadius: "8px",
                                        fontWeight: "700",
                                        cursor: isUpdating ? "not-allowed" : "pointer",
                                        boxShadow: "0 4px 15px rgba(168, 85, 247, 0.3)"
                                    }}
                                >
                                    {isUpdating ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

const statCardStyle = {
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "14px",
    padding: "1.25rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    backdropFilter: "blur(10px)"
};

const statIconStyle = {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

const statLabelStyle = {
    fontSize: "0.78rem",
    color: "#94a3b8",
    fontWeight: "500",
    marginBottom: "2px"
};

const statValueStyle = {
    fontSize: "1.35rem",
    fontWeight: "700",
    color: "#f8fafc"
};

const formLabelStyle = {
    display: "block",
    fontSize: "0.8rem",
    color: "#cbd5e1",
    fontWeight: "500",
    marginBottom: "4px"
};

const formInputStyle = {
    width: "100%",
    boxSizing: "border-box",
    background: "rgba(0, 0, 0, 0.25)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    color: "#f8fafc",
    padding: "0.65rem 0.85rem",
    borderRadius: "8px",
    outline: "none",
    fontSize: "0.9rem"
};

export default InventoryPage;