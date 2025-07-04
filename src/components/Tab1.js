// src/App.js
import React, { useState, useRef } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import TreeNode from './TreeNode';

function App() {
  const [treeData, setTreeData] = useState({
    name: 'Root',
    children: [],
  });

  const fileInputRef = useRef();

  const refreshTree = () => {
    setTreeData({ ...treeData });
  };

  const exportJSON = () => {
    const dataStr = JSON.stringify(treeData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'tree.json';
    link.href = url;
    link.click();
  };

  const importJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const obj = JSON.parse(evt.target.result);
        setTreeData(obj);
      } catch {
        alert('Invalid JSON');
      }
    };
    reader.readAsText(file);
  };

  return (
    <Container className="my-4">
      <h3>Tree Builder</h3>
      <div className="my-2">
        <Button className="me-2" onClick={exportJSON}>Export JSON</Button>
        <Button className="me-2" onClick={() => fileInputRef.current.click()}>
          Import JSON
        </Button>
        <Form.Control
          type="file"
          accept=".json"
          ref={fileInputRef}
          className="d-none"
          onChange={importJSON}
        />
      </div>
      <div className="border rounded p-3 mt-3 bg-light">
        <TreeNode node={treeData} onChange={refreshTree} />
      </div>
    </Container>
  );
}

export default App;
