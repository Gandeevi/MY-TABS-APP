// Daily Rebirth Journal App
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Table } from 'react-bootstrap';

const defaultEntry = {
  date: '',
  momentOfClarity: '',
  loopReleased: '',
  newFeeling: '',
  consciousChoiceToday: '',
  oneLineMantra: '',
  visualization: '',
  gratitude: ''
};

function DailyRebirthApp() {
  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(defaultEntry);
  const [editIndex, setEditIndex] = useState(null);

  const openModal = (entry = defaultEntry, index = null) => {
    setCurrentEntry(entry);
    setEditIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setCurrentEntry(defaultEntry);
    setEditIndex(null);
    setShowModal(false);
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updated = [...entries];
      updated[editIndex] = currentEntry;
      setEntries(updated);
    } else {
      setEntries([...entries, currentEntry]);
    }
    closeModal();
  };

  const handleDelete = (index) => {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entries, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "daily_rebirth_entries.json");
    dlAnchor.click();
  };

  const handleImport = (event) => {
    const fileReader = new FileReader();
    fileReader.onload = e => {
      try {
        const importedEntries = JSON.parse(e.target.result);
        setEntries(importedEntries);
      } catch (err) {
        alert("Invalid JSON file.");
      }
    };
    fileReader.readAsText(event.target.files[0]);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🌱 Daily Rebirth Journal</h2>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="primary" onClick={() => openModal({ ...defaultEntry, date: new Date().toISOString().split('T')[0] })}>
          Add New Entry
        </Button>
        <div>
          <input type="file" accept=".json" onChange={handleImport} />
          <Button variant="outline-secondary" className="ms-2" onClick={handleExport}>Export JSON</Button>
        </div>
      </div>

      {entries.length === 0 ? (
        <p className="text-muted text-center">No entries yet. Begin with Day 1 — The Day the Fog Broke.</p>
      ) : (
        <>
          <div className="list-group mb-5">
            {entries.map((entry, index) => (
              <div key={index} className="list-group-item">
                <h5 className="mb-1">🗓️ {entry.date}</h5>
                <p><strong>✨ Moment of Clarity:</strong> {entry.momentOfClarity}</p>
                <p><strong>🪓 Loop Released:</strong> {entry.loopReleased}</p>
                <p><strong>🌤️ New Feeling:</strong> {entry.newFeeling}</p>
                <p><strong>🧭 Conscious Choice:</strong> {entry.consciousChoiceToday}</p>
                <p><strong>🧘 Mantra:</strong> <em>{entry.oneLineMantra}</em></p>
                <p><strong>🌱 Visualization:</strong> {entry.visualization}</p>
                <p><strong>🙏 Gratitude:</strong> {entry.gratitude}</p>
                <div className="text-end">
                  <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => openModal(entry, index)}>Edit</Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(index)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>

          <h4 className="mb-3">📊 Report Summary</h4>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Date</th>
                <th>Loop Released</th>
                <th>Feeling</th>
                <th>Mantra</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, idx) => (
                <tr key={idx}>
                  <td>{entry.date}</td>
                  <td>{entry.loopReleased}</td>
                  <td>{entry.newFeeling}</td>
                  <td>{entry.oneLineMantra}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      <Modal show={showModal} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Edit Entry' : 'New Daily Entry'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={currentEntry.date} onChange={e => setCurrentEntry({ ...currentEntry, date: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Moment of Clarity</Form.Label>
              <Form.Control as="textarea" rows={2} value={currentEntry.momentOfClarity} onChange={e => setCurrentEntry({ ...currentEntry, momentOfClarity: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Loop Released</Form.Label>
              <Form.Control as="textarea" rows={2} value={currentEntry.loopReleased} onChange={e => setCurrentEntry({ ...currentEntry, loopReleased: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>New Feeling</Form.Label>
              <Form.Control as="textarea" rows={2} value={currentEntry.newFeeling} onChange={e => setCurrentEntry({ ...currentEntry, newFeeling: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Conscious Choice Today</Form.Label>
              <Form.Control as="textarea" rows={2} value={currentEntry.consciousChoiceToday} onChange={e => setCurrentEntry({ ...currentEntry, consciousChoiceToday: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>One-Line Mantra</Form.Label>
              <Form.Control value={currentEntry.oneLineMantra} onChange={e => setCurrentEntry({ ...currentEntry, oneLineMantra: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Visualization</Form.Label>
              <Form.Control as="textarea" rows={2} value={currentEntry.visualization} onChange={e => setCurrentEntry({ ...currentEntry, visualization: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Gratitude</Form.Label>
              <Form.Control as="textarea" rows={2} value={currentEntry.gratitude} onChange={e => setCurrentEntry({ ...currentEntry, gratitude: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Cancel</Button>
          <Button variant="success" onClick={handleSave}>Save Entry</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DailyRebirthApp;
