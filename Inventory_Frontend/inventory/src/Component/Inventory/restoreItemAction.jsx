import { restoreItem } from "../../Axions/inventoryAxions";
import { redirect } from "react-router-dom";

export default async function restoreItemAction({ params }) {
    try {
        await restoreItem(Number(params.id));
        return redirect("/inventory/deleted");
    } catch (e) {
        console.error("Restore failed:", e.response?.status, e.response?.data);
        return redirect("/inventory/deleted?error=restore_failed");
    }
}