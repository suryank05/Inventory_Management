import { deleteItem } from "../../Axions/inventoryAxions";

import { redirect } from "react-router-dom";

export default async function deleteItemAction({params}) {
    try {
        const id = Number(params.id);
        
        // Validate the ID
        if (isNaN(id) || id <= 0) {
            console.error("Invalid item ID:", params.id);
            return redirect("/inventory?error=invalid_id");
        }
        
        await deleteItem(id);
        console.log("Successfully deleted item:", id);
        
        // Optional: Add a success message
        return redirect("/inventory");
        
    } catch (error) {
        console.error("Delete action failed:", error);
        
        // Handle different error types
        if (error.response) {
            // Server responded with error status
            if (error.response.status === 404) {
                return redirect("/inventory?error=not_found");
            } else if (error.response.status === 401) {
                return redirect("/login?error=unauthorized");
            }
        }
        
        // Generic error
        return redirect("/inventory?error=delete_failed");
    }
}