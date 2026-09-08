import { redirect } from "react-router-dom";
import { getUser } from "../../Axions/UserAxios";

export default async function userListLoader() {
    const token = localStorage.getItem("token");
    if (!token) {
        return redirect("/auth");
    }
    try {
       const users = await getUser();
       return Array.isArray(users.data) ? users.data : [];
    }
    catch (exception) {
        if (exception.response?.status === 403) {
            return redirect("/inventory?error=admin_only");
        }
        if (exception.response?.status === 401) {
            localStorage.removeItem("token");
            return redirect("/auth");
        }
        return [];
    }
}       