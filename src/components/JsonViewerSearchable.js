import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";

const JsonViewerSearchable = () => {
  const [jsonData, setJsonData] = useState([]);
  const [search, setSearch] = useState("");
  const [fileName, setFileName] = useState("labeled_data.json");

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        setJsonData(imported);
      } catch {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName || "labeled_data.json";
    a.click();
  };

  const handleLabelChange = (index, newLabel) => {
    const updatedData = [...jsonData];
    updatedData[index].label = newLabel;
    setJsonData(updatedData);
  };

  const filteredData = jsonData.filter(
    (item) => item.value?.toLowerCase().includes(search.toLowerCase()) || item.label?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="py-4">
      <h4>JSON Import / Export with Search</h4>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control type="file" accept="application/json" onChange={handleImport} />
        </Col>
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Filename.json"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Button onClick={handleExport}>Export</Button>
        </Col>
        <Col md={3}>
          <Form.Control
            placeholder="Search by label or value..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Label</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>
                <Form.Control
                  type="text"
                  value={item.label || ""}
                  onChange={(e) => handleLabelChange(idx, e.target.value)}
                />
              </td>
              <td style={{ whiteSpace: "pre-wrap" }}>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default JsonViewerSearchable;
