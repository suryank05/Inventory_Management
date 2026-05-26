import { getall } from "../../Axions/inventoryAxions";

export default async function InventoryListLoader(){
    try{
        const resp= await getall();
        return resp.data;
    }
    catch(e){
         throw new Response("Failed to load inventory", {
            status: 500,
        });
    }
}

