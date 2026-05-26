import { redirect } from "react-router-dom";
import { addItem } from "../../Axions/inventoryAxions";

export default async function  AddItemAction({request}) {
    const form=await request.formData();
        const items={
            itemName:form.get("itemName"),
            Description:form.get("description"),
            Quantity: Number(form.get("quantity")),
            Price:Number(form.get("price"))
        };
        
        await addItem(items);

        return redirect("/inventory");

}