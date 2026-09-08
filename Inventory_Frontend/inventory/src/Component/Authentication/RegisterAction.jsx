import { redirect } from "react-router-dom";
import { register } from "../../Axions/AuthenticationAxions";

export default async function RegisterAction({ request }) {
  const formData = await request.formData();

  const payload = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password")
  };

  try {
    await register(payload);

    return redirect("/auth/");

  } catch (err) {
    console.error(err);
    return { error: "Registration failed. Try again." };
  }
}
