// JsonImportExport.js
import React, { useRef } from "react";
import { Upload, Download } from "lucide-react";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";

const JsonImportExport = ({ onImport, dataToExport, filename = "data.json", className = "" }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        onImport(parsed);
      } catch (err) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataToExport, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", dataStr);
    link.setAttribute("download", filename);
    link.click();
  };

  return (
    <div className={`d-inline-flex gap-1 ${className}`}>
      <OverlayTrigger overlay={<Tooltip>Import</Tooltip>}>
        <Button size="sm" variant="outline-secondary" onClick={() => fileInputRef.current.click()}>
          <Upload size={16} />
        </Button>
      </OverlayTrigger>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json,application/json"
        style={{ display: "none" }}
      />

      <OverlayTrigger overlay={<Tooltip>Export</Tooltip>}>
        <Button size="sm" variant="outline-secondary" onClick={handleExport}>
          <Download size={16} />
        </Button>
      </OverlayTrigger>
    </div>
  );
};

export default JsonImportExport;
