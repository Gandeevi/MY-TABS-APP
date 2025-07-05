import React, { useState, useRef } from "react";
import { Button, Card, Form, Modal, Badge, Accordion, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Plus, Pencil, Trash, Play, Upload, Download, ChevronLeft, ChevronRight } from "lucide-react";
import ImageLabeler from "./MemoryPalace";

const MemoryPalaceApp = () => {
  const [palaces, setPalaces] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentName, setCurrentName] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [editingRoomIndex, setEditingRoomIndex] = useState(null);
  const [currentPalaceIndex, setCurrentPalaceIndex] = useState(null);
  const [showPlayModal, setShowPlayModal] = useState(false);
  const [playRoomIndex, setPlayRoomIndex] = useState(0);
  const fileInputRef = useRef(null);

  const openModal = (index = null) => {
    setEditingIndex(index);
    setCurrentName(index !== null ? palaces[index].name : "");
    setShowModal(true);
  };

  const savePalace = () => {
    if (editingIndex !== null) {
      const updated = [...palaces];
      updated[editingIndex].name = currentName;
      setPalaces(updated);
    } else {
      setPalaces([...palaces, { name: currentName, rooms: [] }]);
    }
    setShowModal(false);
    setCurrentName("");
    setEditingIndex(null);
  };

  const deletePalace = (index) => {
    const updated = palaces.filter((_, i) => i !== index);
    setPalaces(updated);
  };

  const openRoomModal = (palaceIndex, roomIndex = null) => {
    setCurrentPalaceIndex(palaceIndex);
    setEditingRoomIndex(roomIndex);
    const room = roomIndex !== null ? palaces[palaceIndex].rooms[roomIndex] : null;
    setRoomName(room?.name || "");
    setShowRoomModal(true);
  };

  const saveRoom = () => {
    const updated = [...palaces];
    if (editingRoomIndex !== null) {
      updated[currentPalaceIndex].rooms[editingRoomIndex].name = roomName;
    } else {
      updated[currentPalaceIndex].rooms.push({ id: Date.now(), name: roomName });
    }
    setPalaces(updated);
    setShowRoomModal(false);
    setRoomName("");
    setEditingRoomIndex(null);
    setCurrentPalaceIndex(null);
  };

  const deleteRoom = (palaceIndex, roomIndex) => {
    const updated = [...palaces];
    updated[palaceIndex].rooms = updated[palaceIndex].rooms.filter((_, i) => i !== roomIndex);
    setPalaces(updated);
  };

  const startPlayMode = (palaceIndex) => {
    setCurrentPalaceIndex(palaceIndex);
    setPlayRoomIndex(0);
    setShowPlayModal(true);
  };

  const nextRoom = () => setPlayRoomIndex((prev) => prev + 1);
  const prevRoom = () => setPlayRoomIndex((prev) => prev - 1);

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(palaces));
    const dl = document.createElement("a");
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", "memory-palaces.json");
    dl.click();
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        setPalaces(imported);
      } catch (err) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Memory Palaces</h3>
        <div>
          <OverlayTrigger overlay={<Tooltip>Create</Tooltip>}><Button onClick={() => openModal()} size="sm" className="me-1"><Plus size={16} /></Button></OverlayTrigger>
          <OverlayTrigger overlay={<Tooltip>Import</Tooltip>}><Button size="sm" className="me-1" onClick={() => fileInputRef.current.click()}><Upload size={16} /></Button></OverlayTrigger>
          <OverlayTrigger overlay={<Tooltip>Export</Tooltip>}><Button size="sm" onClick={exportData}><Download size={16} /></Button></OverlayTrigger>
          <input type="file" ref={fileInputRef} onChange={importData} style={{ display: "none" }} />
        </div>
      </div>

      <Accordion defaultActiveKey="0">
        {palaces.map((palace, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>
              <div className="w-100 d-flex justify-content-between align-items-center">
                <span>{palace.name}</span>
                <span>
                  <Badge bg="success" className="me-1">Start</Badge>
                  {palace.rooms.map((room, rIndex) => (
                    <span key={room.id}>
                      <Badge bg="info" className="me-1">{room.name || `Room ${rIndex + 1}`}</Badge>
                      {rIndex < palace.rooms.length - 1 && <span className="me-1">→</span>}
                    </span>
                  ))}
                  <Badge bg="dark" className="ms-1">End</Badge>
                </span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="d-flex justify-content-end mb-2">
                <OverlayTrigger overlay={<Tooltip>Add Room</Tooltip>}><Button variant="outline-primary" size="sm" className="me-1" onClick={() => openRoomModal(index)}><Plus size={16} /></Button></OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip>Play Mode</Tooltip>}><Button variant="outline-success" size="sm" className="me-1" onClick={() => startPlayMode(index)}><Play size={16} /></Button></OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip>Edit Palace</Tooltip>}><Button variant="outline-info" size="sm" className="me-1" onClick={() => openModal(index)}><Pencil size={16} /></Button></OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip>Delete Palace</Tooltip>}><Button variant="outline-danger" size="sm" onClick={() => deletePalace(index)}><Trash size={16} /></Button></OverlayTrigger>
              </div>
              <Accordion>
                {palace.rooms.map((room, rIndex) => (
                  <Accordion.Item eventKey={rIndex.toString()} key={room.id}>
                    <Accordion.Header>{room.name || `Room ${rIndex + 1}`}</Accordion.Header>
                    <Accordion.Body>
                      <div className="d-flex justify-content-end mb-2">
                        <OverlayTrigger overlay={<Tooltip>Edit Room</Tooltip>}><Button variant="outline-info" size="sm" className="me-1" onClick={() => openRoomModal(index, rIndex)}><Pencil size={16} /></Button></OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Delete Room</Tooltip>}><Button variant="outline-danger" size="sm" onClick={() => deleteRoom(index, rIndex)}><Trash size={16} /></Button></OverlayTrigger>
                      </div>
                      <ImageLabeler />
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingIndex !== null ? "Edit" : "Create"} Memory Palace</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Memory Palace Name</Form.Label>
            <Form.Control
              type="text"
              value={currentName}
              onChange={(e) => setCurrentName(e.target.value)}
              autoFocus
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={savePalace}>Save</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRoomModal} onHide={() => setShowRoomModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingRoomIndex !== null ? "Edit" : "Add"} Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Room Name</Form.Label>
            <Form.Control
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              autoFocus
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRoomModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={saveRoom}>Save</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPlayModal} onHide={() => setShowPlayModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{palaces[currentPalaceIndex]?.name} - {palaces[currentPalaceIndex]?.rooms[playRoomIndex]?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImageLabeler />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={prevRoom} disabled={playRoomIndex === 0}><ChevronLeft size={16} /> Previous</Button>
          <Button variant="primary" onClick={nextRoom} disabled={playRoomIndex === palaces[currentPalaceIndex]?.rooms.length - 1}>Next <ChevronRight size={16} /></Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MemoryPalaceApp;
