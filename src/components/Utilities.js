import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TextCleaner() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [useCase, setUseCase] = useState("remove-empty-lines");
  const [modelWord, setModelWord] = useState("");

  const handleExecute = () => {
    let result = inputText;

    switch (useCase) {
      case "remove-empty-lines":
        result = result
          .split("\n")
          .filter(line => line.trim() !== "")
          .join("\n");
        break;

      case "remove-hhmmss":
        result = result.replace(/\b\d{2}:\d{2}:\d{2}\b/g, "");
        break;

      case "remove-lines-containing-word":
        if (modelWord.trim()) {
          const regex = new RegExp(modelWord.trim(), "i");
          result = result
            .split("\n")
            .filter(line => !regex.test(line))
            .join("\n");
        }
        break;

      case "rows-to-tabs":
        result = result.split("\n").join("\t");
        break;

      case "rows-to-csv":
        result = result
          .split("\n")
          .map(line => `"${line.replace(/"/g, '""')}"`)
          .join(",");
        break;

      case "tabs-to-rows":
        result = result.split("\t").join("\n");
        break;

      case "csv-to-rows":
        result = parseCSVToRows(result);
        break;

      case "prefix-lines":
        if (modelWord.trim()) {
          result = result
            .split("\n")
            .map(line => modelWord + line)
            .join("\n");
        }
        break;

      case "suffix-lines":
        if (modelWord.trim()) {
          result = result
            .split("\n")
            .map(line => line + modelWord)
            .join("\n");
        }
        break;

      default:
        break;
    }

    setOutputText(result);
  };

  const parseCSVToRows = (csvText) => {
    const pattern = /("([^"]|"")*"|[^,]+)(,|$)/g;
    const matches = [];
    let match;
    while ((match = pattern.exec(csvText)) !== null) {
      let value = match[1];
      if (value.startsWith('"')) {
        value = value.slice(1, -1).replace(/""/g, '"');
      }
      matches.push(value);
    }
    return matches.join("\n");
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Text Cleaner & Converter</h4>

      <div className="mb-3">
        <label className="form-label">Input Text</label>
        <textarea
          className="form-control"
          rows="6"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Select Use Case</label>
        <select
          className="form-select"
          value={useCase}
          onChange={(e) => setUseCase(e.target.value)}
        >
          <option value="remove-empty-lines">Remove Empty Lines</option>
          <option value="remove-hhmmss">Remove HH:MM:SS</option>
          <option value="remove-lines-containing-word">Remove Lines Containing a Word</option>
          <option value="rows-to-tabs">Convert Rows to Tabs</option>
          <option value="rows-to-csv">Convert Rows to CSV</option>
          <option value="tabs-to-rows">Convert Tabs to Rows</option>
          <option value="csv-to-rows">Convert CSV to Rows</option>
          <option value="prefix-lines">Prefix All Lines</option>
          <option value="suffix-lines">Suffix All Lines</option>
        </select>
      </div>

      {["remove-lines-containing-word", "prefix-lines", "suffix-lines"].includes(useCase) && (
        <div className="mb-3">
          <label className="form-label">
            {useCase === "remove-lines-containing-word"
              ? "Enter Word to Match"
              : useCase === "prefix-lines"
              ? "Enter Prefix"
              : "Enter Suffix"}
          </label>
          <input
            type="text"
            className="form-control"
            value={modelWord}
            onChange={(e) => setModelWord(e.target.value)}
          />
        </div>
      )}

      <button className="btn btn-primary mb-3" onClick={handleExecute}>
        Execute
      </button>

      <div>
        <label className="form-label">Output Text</label>
        <textarea
          className="form-control"
          rows="6"
          value={outputText}
          readOnly
        />
      </div>
    </div>
  );
}
