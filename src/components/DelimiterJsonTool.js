import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const DelimiterJsonTool = () => {
  const [inputText, setInputText] = useState("");
  const [delimiter, setDelimiter] = useState("~");
  const [outputJson, setOutputJson] = useState("");

  const handleConvert = () => {
    if (!delimiter) {
      alert("Please provide a delimiter.");
      return;
    }

    // Split based on delimiter across lines
    const segments = inputText.split(delimiter).map(s => s.trim()).filter(Boolean);
    const result = segments.map(val => ({ label: null, value: val }));
    setOutputJson(JSON.stringify(result, null, 2));
  };

  return (
    <Container className="py-4">
      <h4>Delimiter to JSON Converter</h4>
      <Row className="mb-3">
        <Col>
          <Form.Label>Input Text</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Label>Output JSON</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            value={outputJson}
            readOnly
          />
        </Col>
      </Row>
      <Row className="align-items-end">
        <Col md={2}>
          <Form.Label>Delimiter</Form.Label>
          <Form.Control
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Button className="mt-3" onClick={handleConvert}>Convert</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DelimiterJsonTool;
