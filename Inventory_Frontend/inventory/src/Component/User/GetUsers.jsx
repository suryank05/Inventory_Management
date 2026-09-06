import { useLoaderData, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { Users, UserPlus, Upload, FileDown, Trash2, ShieldCheck, UserCheck, AlertCircle } from "lucide-react";
import { deleteUser } from "../../Axions/UserAxios";
import { DownloadExcel } from "../../DownloadExcel";

function getInitials(name) {
    if (!name) return "U";
    return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

function GetUsers() {
    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(Array.isArray(loadedUsers) ? loadedUsers : []);
    const [isDownloading, setIsDownloading] = useState(false);
    const [deletingEmail, setDeletingEmail] = useState(null);

    // Calculate user stats
    const stats = useMemo(() => {
        const total = users.length;
        const admins = users.filter(u => u.role?.includes("ADMIN")).length;
        const employees = total - admins;
        return { total, admins, employees };
    }, [users]);

    const handleDelete = async (email) => {
        if (!window.confirm(`Are you sure you want to delete user "${email}"?`)) return;

        setDeletingEmail(email);
        try {
            await deleteUser(email);
            setUsers(prev => prev.filter(user => user.email !== email));
        } catch (error) {
            console.error("Delete failed", error);
            alert("Delete user failed. Please check permissions.");
        } finally {
            setDeletingEmail(null);
        }
    };

    const handleDownloadTemplate = async () => {
        try {
            setIsDownloading(true);
            await DownloadExcel();
        } catch (error) {
            console.error("Failed to download template", error);
            alert("Could not download template. Ensure you have Admin privileges.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div style={{ padding: "0 0.5rem" }}>
            {/* Top Stat Cards */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1.25rem",
                marginBottom: "2rem"
            }}>
                <div style={statCardStyle}>
                    <div style={{ ...statIconStyle, background: "rgba(99, 102, 241, 0.15)", color: "#818cf8" }}>
                        <Users size={22} />
                    </div>
                    <div>
                        <div style={statLabelStyle}>Total Users</div>
                        <div style={statValueStyle}>{stats.total}</div>
                    </div>
                </div>

                <div style={statCardStyle}>
                    <div style={{ ...statIconStyle, background: "rgba(168, 85, 247, 0.15)", color: "#c084fc" }}>
                        <ShieldCheck size={22} />
                    </div>
                    <div>
                        <div style={statLabelStyle}>Administrators</div>
                        <div style={statValueStyle}>{stats.admins}</div>
                    </div>
                </div>

                <div style={statCardStyle}>
                    <div style={{ ...statIconStyle, background: "rgba(16, 185, 129, 0.15)", color: "#34d399" }}>
                        <UserCheck size={22} />
                    </div>
                    <div>
                        <div style={statLabelStyle}>Employees</div>
                        <div style={statValueStyle}>{stats.employees}</div>
                    </div>
                </div>
            </div>

            {/* Header Toolbar */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "1.75rem",
                padding: "1.25rem",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "14px",
                backdropFilter: "blur(12px)"
            }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: "700", color: "#f8fafc" }}>
                        User Accounts
                    </h2>
                    <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#94a3b8" }}>
                        Manage administrator and employee access permissions.
                    </p>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
                    <button
                        onClick={handleDownloadTemplate}
                        disabled={isDownloading}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            background: "rgba(255, 255, 255, 0.05)",
                            color: "#cbd5e1",
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                            padding: "0.55rem 1rem",
                            borderRadius: "10px",
                            fontSize: "0.82rem",
                            fontWeight: "600",
                            cursor: isDownloading ? "not-allowed" : "pointer",
                            transition: "all 0.2s ease"
                        }}
                    >
                        <FileDown size={16} />
                        <span>{isDownloading ? "Downloading..." : "Template .xlsx"}</span>
                    </button>

                    <Link to="/user/upload-excel" style={{ textDecoration: "none" }}>
                        <button style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            background: "rgba(16, 185, 129, 0.15)",
                            color: "#34d399",
                            border: "1px solid rgba(16, 185, 129, 0.3)",
                            padding: "0.55rem 1rem",
                            borderRadius: "10px",
                            fontSize: "0.82rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                        }}>
                            <Upload size={16} />
                            <span>Import Excel</span>
                        </button>
                    </Link>

                    <Link to="/user/add" style={{ textDecoration: "none" }}>
                        <button style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            background: "linear-gradient(135deg, #4f46e5 0%, #a855f7 100%)",
                            color: "white",
                            border: "none",
                            padding: "0.55rem 1.15rem",
                            borderRadius: "10px",
                            fontSize: "0.82rem",
                            fontWeight: "700",
                            cursor: "pointer",
                            boxShadow: "0 4px 15px rgba(168, 85, 247, 0.35)",
                            transition: "all 0.2s ease"
                        }}>
                            <UserPlus size={16} />
                            <span>Add User</span>
                        </button>
                    </Link>
                </div>
            </div>

            {/* Users List */}
            {users.length === 0 ? (
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
                        background: "rgba(99, 102, 241, 0.1)",
                        color: "#818cf8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1.5rem"
                    }}>
                        <Users size={28} />
                    </div>
                    <h3 style={{ color: "#f8fafc", margin: "0 0 0.5rem", fontSize: "1.3rem" }}>
                        No Users Found
                    </h3>
                    <p style={{ color: "#94a3b8", maxWidth: "400px", margin: "0 auto 1.5rem", fontSize: "0.9rem" }}>
                        No user accounts exist in the system yet. Click "Add User" or import via Excel.
                    </p>
                    <Link to="/user/add" style={{ textDecoration: "none" }}>
                        <button style={{
                            background: "linear-gradient(135deg, #4f46e5 0%, #a855f7 100%)",
                            color: "white",
                            border: "none",
                            padding: "0.6rem 1.4rem",
                            borderRadius: "10px",
                            fontWeight: "600",
                            cursor: "pointer"
                        }}>
                            + Add First User
                        </button>
                    </Link>
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {users.map((element, index) => {
                        const isAdmin = element.role?.includes("ADMIN");
                        const isDeleting = deletingEmail === element.email;

                        return (
                            <div 
                                key={element.id || element.email || index} 
                                style={{
                                    background: "rgba(255, 255, 255, 0.03)",
                                    border: "1px solid rgba(255, 255, 255, 0.08)",
                                    borderRadius: "12px",
                                    padding: "1rem 1.25rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: "1rem",
                                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
                                    transition: "background 0.2s ease"
                                }}
                            >
                                {/* Avatar + Info */}
                                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1, minWidth: 0 }}>
                                    <div style={{
                                        width: "44px",
                                        height: "44px",
                                        minWidth: "44px",
                                        borderRadius: "12px",
                                        background: isAdmin 
                                            ? "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)" 
                                            : "linear-gradient(135deg, #0d9488 0%, #10b981 100%)",
                                        color: "white",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "0.95rem",
                                        fontWeight: "700",
                                        boxShadow: isAdmin ? "0 0 12px rgba(168, 85, 247, 0.3)" : "0 0 12px rgba(16, 185, 129, 0.3)"
                                    }}>
                                        {getInitials(element.userName)}
                                    </div>

                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2px" }}>
                                            <span style={{ fontWeight: "600", fontSize: "0.95rem", color: "#f8fafc" }}>
                                                {element.userName || "Unnamed User"}
                                            </span>
                                            <span style={{
                                                fontSize: "0.68rem",
                                                fontWeight: "700",
                                                padding: "2px 7px",
                                                borderRadius: "4px",
                                                textTransform: "uppercase",
                                                background: isAdmin ? "rgba(168, 85, 247, 0.2)" : "rgba(16, 185, 129, 0.2)",
                                                color: isAdmin ? "#c084fc" : "#34d399",
                                                border: `1px solid ${isAdmin ? 'rgba(168,85,247,0.35)' : 'rgba(16,185,129,0.35)'}`
                                            }}>
                                                {isAdmin ? "Admin" : "Employee"}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: "0.82rem", color: "#94a3b8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {element.email}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div>
                                    <button
                                        onClick={() => handleDelete(element.email)}
                                        disabled={isDeleting}
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "0.35rem",
                                            background: "rgba(239, 68, 68, 0.1)",
                                            color: "#f87171",
                                            border: "1px solid rgba(239, 68, 68, 0.25)",
                                            padding: "0.45rem 0.85rem",
                                            borderRadius: "8px",
                                            fontSize: "0.8rem",
                                            fontWeight: "600",
                                            cursor: isDeleting ? "not-allowed" : "pointer",
                                            transition: "all 0.2s ease"
                                        }}
                                    >
                                        <Trash2 size={14} />
                                        <span>{isDeleting ? "Deleting..." : "Delete"}</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
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

export default GetUsers;