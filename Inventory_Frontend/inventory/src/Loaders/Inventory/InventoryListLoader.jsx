import { getall } from "../../Axions/inventoryAxions";

// 1. You MUST put { request } inside these brackets so React can read the URL!
export default async function InventoryListLoader({ request }) {
    try {
        // 2. Read what page we are currently on from the URL
        const url = new URL(request.url);
        const pageParam = url.searchParams.get("page");
        
        // 3. If there is no page in the URL, default to page 0
        const currentPage = pageParam ? Number(pageParam) : 0;

        // 4. Pass the current page to your Axios function!
        const resp = await getall(currentPage);
        
        return resp.data; 
    } catch (e) {
        throw new Response("Failed to load inventory", { status: 500 });
    }
}