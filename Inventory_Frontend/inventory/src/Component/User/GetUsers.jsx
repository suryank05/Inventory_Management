import { useLoaderData, Link } from "react-router-dom";
import { deleteUser } from "../../Axions/UserAxios";
import { useState } from "react";

function getInitials(name) {
    if (!name) return "?";
    return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

const avatarColors = [
    { bg: "#B5D4F4", text: "#0C447C" },
    { bg: "#C0DD97", text: "#27500A" },
    { bg: "#F5C4B3", text: "#712B13" },
    { bg: "#CECBF6", text: "#3C3489" },
    { bg: "#9FE1CB", text: "#085041" },
];

function GetUsers() {
    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers);

    const handleDelete = async (email) => {
        try {
            await deleteUser(email);
            setUsers(prev => prev.filter(user => user.email !== email));
        } catch (error) {
            console.error("Delete failed", error);
            alert("Delete failed");
        }
    };

    return (
        <div style={{ padding: "1.5rem 2rem" }}>

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h2 style={{ margin: 0, fontWeight: 500, fontSize: "18px" }}>Users</h2>
                <div style={{ display: "flex", gap: "8px" }}>
                    <Link to="/user/add">
                        <button style={{
                            background: "#185FA5", color: "#E6F1FB",
                            border: "none", padding: "7px 14px",
                            borderRadius: "8px", fontWeight: 500,
                            fontSize: "13px", cursor: "pointer"
                        }}>+ Add User</button>
                    </Link>
                    <Link to="/user/upload-excel">
                        <button style={{
                            background: "#3B6D11", color: "#EAF3DE",
                            border: "none", padding: "7px 14px",
                            borderRadius: "8px", fontWeight: 500,
                            fontSize: "13px", cursor: "pointer"
                        }}>Upload Excel</button>
                    </Link>
                </div>
            </div>

            {/* User list */}
            {users.length === 0 ? (
                <p style={{ color: "var(--color-text-secondary)" }}>No users found.</p>
            ) : (
                users.map((element, index) => {
                    const color = avatarColors[index % avatarColors.length];
                    const isAdmin = element.role?.includes("ADMIN");
                    return (
                        <div key={element.id} style={{
                            background: "var(--color-background-primary)",
                            border: "0.5px solid var(--color-border-tertiary)",
                            borderRadius: "12px",
                            padding: "1rem 1.25rem",
                            marginBottom: "10px",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px"
                        }}>
                            {/* Avatar */}
                            <div style={{
                                width: "40px", height: "40px", minWidth: "40px",
                                borderRadius: "50%",
                                background: color.bg, color: color.text,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "13px", fontWeight: 500
                            }}>
                                {getInitials(element.userName)}
                            </div>

                            {/* Info */}
                            <div style={{ flex: 1 }}>
                                <p style={{ margin: "0 0 2px", fontWeight: 500, fontSize: "15px" }}>
                                    {element.userName}
                                </p>
                                <p style={{ margin: "0 0 4px", fontSize: "13px", color: "var(--color-text-secondary)" }}>
                                    {element.email}
                                </p>
                                <span style={{
                                    fontSize: "11px", fontWeight: 500,
                                    padding: "2px 8px", borderRadius: "99px",
                                    background: isAdmin ? "#EEEDFE" : "#E1F5EE",
                                    color: isAdmin ? "#3C3489" : "#085041"
                                }}>
                                    {element.role}
                                </span>
                            </div>

                            {/* Delete */}
                            <button
                                onClick={() => handleDelete(element.email)}
                                style={{
                                    background: "transparent",
                                    color: "#A32D2D",
                                    border: "0.5px solid #F09595",
                                    padding: "5px 12px",
                                    borderRadius: "8px",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    cursor: "pointer"
                                }}>
                                Delete
                            </button>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default GetUsers;