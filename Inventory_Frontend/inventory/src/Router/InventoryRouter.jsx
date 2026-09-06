// import InventoryListLoader from "../Loaders/Inventory/InventoryListLoader";
// import InventoryPage from "../Component/Inventory/InventoryPage";
// import AddItem from "../Component/Inventory/AddItem";
// import AddItemAction from "../Component/Inventory/AddItemAction";
// import deleteItemAction from "../Component/Inventory/deleteItemAction"


// export const InventoryRouter={
//     path:"inventory",
//     children:[
//         {
//             index:true,
//             loader:InventoryListLoader,
//             element:<InventoryPage />
//         },
//         {
//             path:"add",
//             action:AddItemAction,
//             element:<AddItem></AddItem>
//         },
//         // {
//         //     path:"update",
//         //     action:updateItem,
//         //     loader:updatedInventory,
//         //     element:<UpdateItem></UpdateItem>
//         // },
//         {
//             path:"delete/:id",
//             action:deleteItemAction
//         }
//     ]
// }

import InventoryListLoader from "../Loaders/Inventory/InventoryListLoader";
import InventoryPage from "../Component/Inventory/InventoryPage";
import AddItem from "../Component/Inventory/AddItem";
import AddItemAction from "../Component/Inventory/AddItemAction";
import deleteItemAction from "../Component/Inventory/deleteItemAction";
import DeletedInventoryPage from "../Component/Inventory/DeletedInventoryPage";
import restoreItemAction from "../Component/Inventory/restoreItemAction";
import DeletedInventoryLoader from "../Component/Inventory/DeletedInventoryLoader";

export const InventoryRouter = {
    path: "inventory",
    children: [
        {
            index: true,
            loader: InventoryListLoader,
            element: <InventoryPage />
        },
        {
            path: "add",
            action: AddItemAction,
            element: <AddItem />
        },
        {
            path: "delete/:id",
            action: deleteItemAction
        },
        // Deleted items page — recycle bin
        {
            path: "deleted",
            loader: DeletedInventoryLoader,
            element: <DeletedInventoryPage />
        },
        // Restore action — no UI, just action + redirect
        {
            path: "restore/:id",
            action: restoreItemAction
        }
    ]
}
