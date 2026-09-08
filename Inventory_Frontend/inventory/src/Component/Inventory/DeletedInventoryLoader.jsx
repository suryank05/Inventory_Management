import { redirect } from "react-router-dom";
import { getDeletedItems } from "../../Axions/inventoryAxions";

export default async function DeletedInventoryLoader() {
    const token = localStorage.getItem("token");
    if (!token) {
        return redirect("/auth");
    }
    try {
        const resp = await getDeletedItems();
        return Array.isArray(resp.data) ? resp.data : [];
    } catch (e) {
        if (e.response?.status === 401 || e.response?.status === 403) {
            localStorage.removeItem("token");
            return redirect("/auth");
        }
        return [];
    }
}