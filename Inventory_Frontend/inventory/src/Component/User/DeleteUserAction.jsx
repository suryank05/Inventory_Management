import { deleteUser } from "../../Axions/UserAxios";

export default async function DeleteUserAction({params}) {
    await deleteUser(params);
    return redirect("/user");
 } 

