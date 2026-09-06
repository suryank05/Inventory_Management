import { redirect } from "react-router-dom";
import { deleteUser } from "../../Axions/UserAxios";

export default async function DeleteUserAction({ params }) {
  try {
    const email = params.id;
    if (email) {
      await deleteUser(email);
    }
  } catch (error) {
    console.error("Delete user failed:", error);
  }
  return redirect("/user");
} 

