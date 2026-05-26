import { redirect } from "react-router-dom";
import { login } from "../../Axions/AuthenticationAxions";


export default async function LoginAction({ request }) {
  const formData = await request.formData();

  const payload = {
    email: formData.get("email"),
    password: formData.get("password")
  };

  try {
    const res = await login(payload);

    // ✅ Store JWT token
    localStorage.setItem("token", res.data.token);

    // ✅ Redirect after login
    return redirect("/inventory");


  } catch (err) {
    return { error: "Invalid credentials" };
  }
}
