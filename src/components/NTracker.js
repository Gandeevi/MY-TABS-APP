// Negative Loop Clarifier / Tracker React App with Toggle View Buttons
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Collapse } from 'react-bootstrap';

const defaultTemplate = {
  name: '',
  behavior: '',
  innerVoice: '',
  cost: '',
  origin: '',
  desire: '',
  mantra: ''
};

function App() {
  const [loops, setLoops] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentLoop, setCurrentLoop] = useState(defaultTemplate);
  const [editIndex, setEditIndex] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  const openModal = (loop = defaultTemplate, index = null) => {
    setCurrentLoop(loop);
    setEditIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setCurrentLoop(defaultTemplate);
    setEditIndex(null);
    setShowModal(false);
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updated = [...loops];
      updated[editIndex] = currentLoop;
      setLoops(updated);
    } else {
      setLoops([...loops, currentLoop]);
    }
    closeModal();
  };

  const handleDelete = (index) => {
    const updated = loops.filter((_, i) => i !== index);
    setLoops(updated);
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(loops, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "negative_loops.json");
    dlAnchor.click();
  };

  const handleImport = (event) => {
    const fileReader = new FileReader();
    fileReader.onload = e => {
      try {
        const importedLoops = JSON.parse(e.target.result);
        setLoops(importedLoops);
      } catch (err) {
        alert("Invalid JSON file.");
      }
    };
    fileReader.readAsText(event.target.files[0]);
  };

  const toggleCollapse = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🧠 Negative Loop Clarifier / Tracker</h2>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="primary" onClick={() => openModal()}>Add New Loop</Button>
        <div>
          <input type="file" accept=".json" onChange={handleImport} />
          <Button variant="outline-secondary" className="ms-2" onClick={handleExport}>Export JSON</Button>
        </div>
      </div>

      {loops.length === 0 ? (
        <p className="text-muted text-center">No loops added yet.</p>
      ) : (
        <div className="list-group">
          {loops.map((loop, index) => (
            <div key={index} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{loop.name}</h5>
                <div>
                  <Button variant="info" size="sm" className="me-2" onClick={() => toggleCollapse(index)}>
                    {openIndex === index ? 'Hide' : 'Show'} Details
                  </Button>
                  <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => openModal(loop, index)}>Edit</Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(index)}>Delete</Button>
                </div>
              </div>
              <Collapse in={openIndex === index}>
                <div className="mt-3">
                  <p><strong>Behavior:</strong> {loop.behavior}</p>
                  <p><strong>Inner Voice:</strong> {loop.innerVoice}</p>
                  <p><strong>Cost:</strong> {loop.cost}</p>
                  <p><strong>Origin:</strong> {loop.origin}</p>
                  <p><strong>Desire:</strong> {loop.desire}</p>
                  <p><strong>Mantra:</strong> <em>{loop.mantra}</em></p>
                </div>
              </Collapse>
            </div>
          ))}
        </div>
      )}

      <Modal show={showModal} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Edit Loop' : 'Add New Loop'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Loop Name</Form.Label>
              <Form.Control value={currentLoop.name} onChange={e => setCurrentLoop({ ...currentLoop, name: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>What I Do (Behavior)</Form.Label>
              <Form.Control as="textarea" rows={2} value={currentLoop.behavior} onChange={e => setCurrentLoop({ ...currentLoop, behavior: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>The Voice in My Head</Form.Label>
              <Form.Control as="textarea" rows={2} value={currentLoop.innerVoice} onChange={e => setCurrentLoop({ ...currentLoop, innerVoice: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>What It’s Costing Me</Form.Label>
              <Form.Control as="textarea" rows={2} value={currentLoop.cost} onChange={e => setCurrentLoop({ ...currentLoop, cost: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Where It Comes From</Form.Label>
              <Form.Control as="textarea" rows={2} value={currentLoop.origin} onChange={e => setCurrentLoop({ ...currentLoop, origin: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>What I Want Instead</Form.Label>
              <Form.Control as="textarea" rows={2} value={currentLoop.desire} onChange={e => setCurrentLoop({ ...currentLoop, desire: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Mantra or Practice</Form.Label>
              <Form.Control as="textarea" rows={2} value={currentLoop.mantra} onChange={e => setCurrentLoop({ ...currentLoop, mantra: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Cancel</Button>
          <Button variant="success" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
