import { redirect } from "react-router-dom";
import { addUser } from "../../Axions/UserAxios";

async function AddUserAction({request}){
    const form=await request.formData();

     const Users={
        userName:form.get("username"),
        email:form.get("email"),
        password:form.get("password")
     }

     await addUser(Users);

     return redirect("/user")

}

export default AddUserAction;