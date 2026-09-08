import { redirect } from "react-router-dom";
import { addItem } from "../../Axions/inventoryAxions";

export default async function  AddItemAction({request}) {
    const form=await request.formData();
        const items = {
            itemName: form.get("itemName"),
            description: form.get("description"),
            quantity: Number(form.get("quantity")),
            price: Number(form.get("price"))
        };
        
        await addItem(items);

        return redirect("/inventory");

}