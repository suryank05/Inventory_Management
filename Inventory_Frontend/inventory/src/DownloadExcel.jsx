// Axions/downloadExcel.js

import api from "./Axions/api";

export const DownloadExcel = async () => {
  const response = await api.get("/user/download-template", {
    responseType: "blob", // VERY IMPORTANT
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", "users_template.xlsx");

  document.body.appendChild(link);
  link.click();
  link.remove();
};

