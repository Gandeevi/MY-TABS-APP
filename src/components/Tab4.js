import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const BUCKETS = [
  { id: 1, title: 'Visionary Thoughts', description: 'Deep knowledge, wisdom, life mission, spiritual direction' },
  { id: 2, title: 'Strategic Actions', description: 'Big-picture planning aligned with long-term goals' },
  { id: 3, title: 'High-Impact Execution', description: 'Actions done today that produce significant outcomes' },
  { id: 4, title: 'Habit Building & Routines', description: 'Compound-interest of daily life' },
  { id: 5, title: 'Learning & Absorption', description: 'Reading, listening, watching with purpose' },
  { id: 6, title: 'Reflective & Emotional Processing', description: 'Understanding self, managing emotions' },
  { id: 7, title: 'Communication & Relationship Thoughts', description: 'Connecting, mentoring, resolving conflicts' },
  { id: 8, title: 'Logistical Thoughts', description: 'Scheduling, buying groceries, replying to routine emails' },
  { id: 9, title: 'Distracting Curiosity', description: 'Trivia, gossip, over-scrolling, rabbit holes' },
  { id: 10, title: 'Negative Loops & Time-Wasters', description: 'Worry, self-doubt, anger, envy, regret' }
];

const App = () => {
  const [thoughts, setThoughts] = useState({});
  const [selectedBucket, setSelectedBucket] = useState(null);
  const [newThought, setNewThought] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [bucketSearchTerm, setBucketSearchTerm] = useState('');
  const [reportSearchTerm, setReportSearchTerm] = useState('');
  const [clarifyModal, setClarifyModal] = useState({ show: false, thought: '', bucket: '', date: '' });

  const handleAddThought = (id) => {
    const newEntry = { text: newThought, date: selectedDate };
    setThoughts(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), newEntry]
    }));
    setNewThought('');
  };

  const handleDeleteThought = (bucketId, index) => {
    setThoughts(prev => {
      const updated = [...prev[bucketId]];
      updated.splice(index, 1);
      return { ...prev, [bucketId]: updated };
    });
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(thoughts));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "thought_buckets.json");
    dlAnchor.click();
  };

  const handleImport = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = event => {
      try {
        const imported = JSON.parse(event.target.result);
        setThoughts(imported);
      } catch (error) {
        alert('Invalid JSON file.');
      }
    };
    fileReader.readAsText(e.target.files[0]);
  };

  const generateClarifiedThought = (text) => {
    return `Original: "${text}"\n\nClarified: This thought reflects a deeper emotional response, possibly involving unmet expectations or one-sided relationships. It's a call to set boundaries while honoring your values of empathy and fairness.`;
  };

  const filteredBuckets = BUCKETS.filter(b =>
    b.title.toLowerCase().includes(bucketSearchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Mental Thought Buckets</h2>

      <div className="mb-3 d-flex align-items-center">
        <label className="me-2"><strong>Select Date:</strong></label>
        <input
          type="date"
          className="form-control w-auto"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div className="mb-3 d-flex justify-content-between">
        <input type="file" accept=".json" onChange={handleImport} />
        <button className="btn btn-primary" onClick={handleExport}>Export Thoughts</button>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search buckets..."
        value={bucketSearchTerm}
        onChange={e => setBucketSearchTerm(e.target.value)}
      />

      <div className="mb-4 d-flex flex-wrap gap-2">
        {filteredBuckets.map(bucket => (
          <button
            key={bucket.id}
            className="btn btn-outline-secondary"
            onClick={() => setSelectedBucket(bucket)}
          >
            {bucket.title}
          </button>
        ))}
      </div>

      {selectedBucket && (
        <Modal show={true} onHide={() => setSelectedBucket(null)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedBucket.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-muted">{selectedBucket.description}</p>
            <ul className="list-group mb-3">
              {(thoughts[selectedBucket.id] || []).map((entry, idx) => (
                <li key={idx} className="list-group-item d-flex justify-content-between align-items-start flex-column">
                  <div><strong>{entry.date}</strong>: {entry.text}</div>
                  <button
                    className="btn btn-sm btn-danger align-self-end mt-2"
                    onClick={() => handleDeleteThought(selectedBucket.id, idx)}
                  >
                    Delete
                  </button>
                </li>
              ))}
              {(thoughts[selectedBucket.id] || []).length === 0 && (
                <li className="list-group-item text-muted">No thoughts yet.</li>
              )}
            </ul>
            <textarea
              className="form-control mb-2"
              rows="2"
              placeholder={`Add a thought to ${selectedBucket.title}`}
              value={newThought}
              onChange={e => setNewThought(e.target.value)}
            ></textarea>
            <Button variant="success" size="sm" onClick={() => handleAddThought(selectedBucket.id)} disabled={!newThought.trim()}>
              Add Thought
            </Button>
          </Modal.Body>
        </Modal>
      )}

      <hr className="my-5" />
      <h3 className="mb-3">📊 Report View</h3>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search report by thought, date, or bucket..."
        value={reportSearchTerm}
        onChange={e => setReportSearchTerm(e.target.value)}
      />

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Bucket</th>
            <th>Thought</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(thoughts).flatMap(([bucketId, entries]) =>
            entries
              .filter(entry => {
                const bucketTitle = BUCKETS.find(b => b.id === parseInt(bucketId))?.title || '';
                return (
                  entry.text.toLowerCase().includes(reportSearchTerm.toLowerCase()) ||
                  entry.date.includes(reportSearchTerm) ||
                  bucketTitle.toLowerCase().includes(reportSearchTerm.toLowerCase())
                );
              })
              .map((entry, idx) => (
                <tr key={`${bucketId}-${idx}`}>
                  <td>{entry.date}</td>
                  <td>{BUCKETS.find(b => b.id === parseInt(bucketId))?.title}</td>
                  <td>{entry.text}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-1"
                      onClick={() => setClarifyModal({
                        show: true,
                        thought: entry.text,
                        bucket: BUCKETS.find(b => b.id === parseInt(bucketId))?.title,
                        date: entry.date
                      })}
                    >
                      Clarify
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteThought(bucketId, idx)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>

      {/* Clarify Thought Modal */}
      {clarifyModal.show && (
        <Modal show onHide={() => setClarifyModal({ show: false, thought: '', bucket: '', date: '' })}>
          <Modal.Header closeButton>
            <Modal.Title>Thought Clarifier</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Date:</strong> {clarifyModal.date}</p>
            <p><strong>Bucket:</strong> {clarifyModal.bucket}</p>
            <hr />
            <p><strong>Clarified Thought:</strong></p>
            <pre className="bg-light p-2 rounded">{generateClarifiedThought(clarifyModal.thought)}</pre>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setClarifyModal({ show: false, thought: '', bucket: '', date: '' })}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default App;
