import { redirect } from "react-router-dom";
import { upload_excel } from "../../Axions/inventoryAxions";

export async function UploadExcelAction({ request }) {
  const formData = await request.formData();
  const file = formData.get("file");

  await upload_excel(file);

  return redirect("/user");
}