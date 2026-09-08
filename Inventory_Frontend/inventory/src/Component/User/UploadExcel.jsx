import { Form, Link } from "react-router-dom";
import { useState } from "react";
import { UploadCloud, FileDown, ArrowLeft, FileSpreadsheet, CheckCircle2, AlertCircle } from "lucide-react";
import { DownloadExcel } from "../../DownloadExcel";

function UploadExcel() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await DownloadExcel();
    } catch (err) {
      console.error(err);
      alert("Failed to download template. Ensure you are signed in as Admin.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div style={{ maxWidth: "560px", margin: "1rem auto 3rem" }}>
      {/* Back Link */}
      <Link 
        to="/user" 
        style={{ 
          display: "inline-flex", 
          alignItems: "center", 
          gap: "0.4rem", 
          color: "#94a3b8", 
          textDecoration: "none", 
          fontSize: "0.85rem",
          fontWeight: "500",
          marginBottom: "1.25rem"
        }}
      >
        <ArrowLeft size={16} />
        <span>Back to Users</span>
      </Link>

      {/* Styled Card */}
      <div style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "16px",
        padding: "2rem",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(12px)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <div style={{
            width: "42px",
            height: "42px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)",
            color: "#34d399",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <UploadCloud size={24} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: "700", color: "#f8fafc" }}>
              Import Users from Excel
            </h2>
            <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#94a3b8" }}>
              Bulk upload multiple user accounts using an .xlsx spreadsheet.
            </p>
          </div>
        </div>

        {/* Template Helper Box */}
        <div style={{
          background: "rgba(79, 70, 229, 0.08)",
          border: "1px solid rgba(79, 70, 229, 0.25)",
          borderRadius: "12px",
          padding: "1rem 1.25rem",
          marginBottom: "1.75rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem"
        }}>
          <div>
            <div style={{ fontSize: "0.85rem", fontWeight: "600", color: "#e0e7ff", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <FileSpreadsheet size={16} style={{ color: "#818cf8" }} />
              Need the template format?
            </div>
            <div style={{ fontSize: "0.78rem", color: "#94a3b8", marginTop: "2px" }}>
              Expected columns: Username, Email, Password, Role
            </div>
          </div>

          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "rgba(255, 255, 255, 0.1)",
              color: "#f8fafc",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              padding: "0.45rem 0.9rem",
              borderRadius: "8px",
              fontSize: "0.8rem",
              fontWeight: "600",
              cursor: isDownloading ? "not-allowed" : "pointer",
              whiteSpace: "nowrap"
            }}
          >
            <FileDown size={14} />
            <span>{isDownloading ? "Downloading..." : "Get Template"}</span>
          </button>
        </div>

        <Form method="post" encType="multipart/form-data">
          {/* File input area */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label 
              htmlFor="excel-upload"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2.5rem 1.5rem",
                background: selectedFile ? "rgba(16, 185, 129, 0.05)" : "rgba(0, 0, 0, 0.25)",
                border: `2px dashed ${selectedFile ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255, 255, 255, 0.15)'}`,
                borderRadius: "14px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                textAlign: "center"
              }}
            >
              <input
                id="excel-upload"
                type="file"
                name="file"
                accept=".xlsx"
                required
                onChange={(e) => setSelectedFile(e.target.files[0])}
                style={{ display: "none" }}
              />

              <div style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: selectedFile ? "rgba(16, 185, 129, 0.15)" : "rgba(255, 255, 255, 0.05)",
                color: selectedFile ? "#34d399" : "#a855f7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "0.75rem"
              }}>
                {selectedFile ? <CheckCircle2 size={26} /> : <FileSpreadsheet size={26} />}
              </div>

              {selectedFile ? (
                <>
                  <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "#f8fafc" }}>
                    {selectedFile.name}
                  </span>
                  <span style={{ fontSize: "0.78rem", color: "#34d399", marginTop: "4px" }}>
                    {(selectedFile.size / 1024).toFixed(1)} KB — Ready to upload
                  </span>
                </>
              ) : (
                <>
                  <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "#f8fafc" }}>
                    Click to select .xlsx spreadsheet
                  </span>
                  <span style={{ fontSize: "0.78rem", color: "#94a3b8", marginTop: "4px" }}>
                    Supports Microsoft Excel (.xlsx) files
                  </span>
                </>
              )}
            </label>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Link to="/user" style={{ flex: 1, textDecoration: "none" }}>
              <button
                type="button"
                style={{
                  width: "100%",
                  background: "rgba(255, 255, 255, 0.05)",
                  color: "#cbd5e1",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "10px",
                  padding: "0.75rem",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
            </Link>

            <button
              type="submit"
              disabled={!selectedFile}
              style={{
                flex: 2,
                background: selectedFile ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" : "rgba(255, 255, 255, 0.08)",
                color: selectedFile ? "white" : "#64748b",
                border: "none",
                borderRadius: "10px",
                padding: "0.75rem",
                fontSize: "0.95rem",
                fontWeight: "700",
                cursor: selectedFile ? "pointer" : "not-allowed",
                boxShadow: selectedFile ? "0 4px 15px rgba(16, 185, 129, 0.35)" : "none",
                transition: "all 0.2s"
              }}
            >
              Upload & Import Users
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default UploadExcel;

