import React, { useState, useRef, useCallback } from "react";
import { Button, Form, Table, Modal, InputGroup } from "react-bootstrap";

const DaxJavaCrud = () => {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({ group: "", dax: "", java: "", comments: "", image: "" });
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dropRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({ ...prev, image: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      const updated = [...entries];
      updated[editingIndex] = formData;
      setEntries(updated);
    } else {
      setEntries([...entries, formData]);
    }
    setShowModal(false);
    setFormData({ group: "", dax: "", java: "", comments: "", image: "" });
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    const entry = entries[index];
    setFormData(entry);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(entries, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dax_java_entries.json";
    a.click();
  };

  const importJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        setEntries(imported);
      } catch {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  const filteredEntries = entries.filter((entry) =>
    Object.values(entry).some((val) => val.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container py-4">
      <h4>DAX ↔ Java Translation Tracker</h4>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search entries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="primary" onClick={() => setShowModal(true)}>+ Add</Button>
        <Button className="ms-2" onClick={exportJSON} variant="success">Export</Button>
        <Form.Label htmlFor="import-json" className="btn btn-primary ms-2 mb-0">Import</Form.Label>
        <Form.Control id="import-json" type="file" accept="application/json" onChange={importJSON} style={{ display: "none" }} />
      </InputGroup>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Group</th>
            <th>DAX Expression</th>
            <th>Java Equivalent</th>
            <th>Image</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEntries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.group}</td>
              <td>{entry.dax}</td>
              <td>{entry.java}</td>
              <td>{entry.image && (<img src={entry.image} alt="Preview" width="80" />)}</td>
              <td>{entry.comments}</td>
              <td>
                <Button variant="secondary" size="sm" onClick={() => handleEdit(index)} className="me-2">Edit</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingIndex !== null ? "Edit Entry" : "New Entry"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Group</Form.Label>
              <Form.Control name="group" value={formData.group} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>DAX Expression</Form.Label>
              <Form.Control name="dax" as="textarea" rows={2} value={formData.dax} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Java Equivalent</Form.Label>
              <Form.Control name="java" as="textarea" rows={2} value={formData.java} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Image (Drop image or paste URL)</Form.Label>
              <div
                ref={dropRef}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{ border: "2px dashed #ccc", padding: "1rem", textAlign: "center", borderRadius: "6px" }}
              >
                Drop image here
              </div>
              <Form.Control
                className="mt-2"
                placeholder="Or paste image URL or base64"
                value={formData.image}
                onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Comments</Form.Label>
              <Form.Control name="comments" as="textarea" rows={2} value={formData.comments} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSave}>{editingIndex !== null ? "Update" : "Create"}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DaxJavaCrud;
