import { redirect } from "react-router-dom";
import { getall } from "../../Axions/inventoryAxions";

export default async function InventoryListLoader({ request }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return redirect("/auth");
    }

    try {
        const url = new URL(request.url);
        const pageParam = url.searchParams.get("page");
        const currentPage = pageParam ? Number(pageParam) : 0;

        const resp = await getall(currentPage);

        // Handle both direct Page responses and wrapped responses
        const responseData = resp.data;
        const pageData = responseData?.data ?? responseData;

        console.log("Inventory API response:", responseData);
        console.log("Inventory page data:", pageData);

        return pageData?.content
            ? pageData
            : {
                content: [],
                totalPages: 0,
                totalElements: 0,
                number: 0,
                first: true,
                last: true
            };

    } catch (e) {
        console.error(
            "Failed to load inventory:",
            e.response?.data || e.message
        );

        if (e.response?.status === 401 || e.response?.status === 403) {
            localStorage.removeItem("token");
            return redirect("/auth");
        }

        return {
            content: [],
            totalPages: 0,
            totalElements: 0,
            number: 0,
            first: true,
            last: true
        };
    }
}