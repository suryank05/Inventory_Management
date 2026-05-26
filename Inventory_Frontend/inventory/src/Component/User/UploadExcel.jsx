import { Form } from "react-router-dom";
import { DownloadExcel } from "../../DownloadExcel";

function UploadExcel() {
  return (
    <>
      <h2>Upload Users Excel</h2>
      <button onClick={DownloadExcel}>
        Download Template
      </button>

      <Form method="post" encType="multipart/form-data">
        <input type="file" name="file" accept=".xlsx" required />

        <button type="submit">Upload</button>
      </Form>
    </>
  );
}

export default UploadExcel;

