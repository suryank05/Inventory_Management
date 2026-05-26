import { getDeletedItems } from "../../Axions/inventoryAxions";

export default async function DeletedInventoryLoader() {
    try {
        const resp = await getDeletedItems();
        return resp.data;
    } catch (e) {
        throw new Response("Failed to load deleted items", { status: 500 });
    }
}