import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [filterText, setFilterText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [districts, setDistricts] = useState([]);

  const handleFilter = () => {
    const lines = inputText.split("\n");

    // Filter and remove duplicates using Set
    const filteredLinesSet = new Set(
      lines.filter((line) => line.includes(filterText)).map(line => line.trim())
    );

    const filteredLines = Array.from(filteredLinesSet);

    const extractedDistrictsSet = new Set();

    filteredLines.forEach((line) => {
      const match = line.match(/District\s*:\s*([A-Za-z\s]+)/i);
      if (match && match[1]) {
        extractedDistrictsSet.add(match[1].trim());
      }
    });

    setOutputText(filteredLines.join("\n"));
    setDistricts(Array.from(extractedDistrictsSet));
  };

  return (
    <Container className="mt-4">
      <h4 className="mb-4 text-center">Line & District Extractor (Distinct)</h4>
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Extract Lines Containing:</Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Enter filter text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Input Text</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text line-by-line..."
          />
        </Form.Group>

        <Button variant="primary" onClick={handleFilter}>
          Filter Lines
        </Button>

        <Form.Group className="mt-3">
          <Form.Label>Filtered Lines (Distinct)</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            value={outputText}
            readOnly
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Extracted Districts (Distinct)</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={districts.join("\n")}
            readOnly
          />
        </Form.Group>
      </Form>
    </Container>
  );
}

export default App;
