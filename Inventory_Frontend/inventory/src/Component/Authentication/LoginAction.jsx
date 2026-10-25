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

    localStorage.setItem("token", res.data.data.token);
    if (res.data.refreshToken) {
      localStorage.setItem("refreshToken", res.data.refreshToken);
    }

    return redirect("/inventory");

    // ✅ Redirect after login
    return redirect("/inventory");


  } catch (err) {
    return { error: "Invalid credentials" };
  }
}
