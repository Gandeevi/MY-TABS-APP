import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Table } from "react-bootstrap";
import pegList from "./PegList";

const ImageLabeler = ({ initialImage = null, initialPins = [], onDataChange = () => {} }) => {
  const [image, setImage] = useState(initialImage);
  const [pins, setPins] = useState(initialPins);
  const [selectedPinIndex, setSelectedPinIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    // description: "",
    // image: "",
    // associations: "",
    mnemonic: "",
    mnemonicSentence: ""
    // tags: "",
    // creationDate: new Date().toISOString().split("T")[0],
    // lastRevised: new Date().toISOString().split("T")[0],
    // personalNotes: ""
  });

  useEffect(() => {
    setImage(initialImage);
    setPins(initialPins);
  }, [initialImage, initialPins]);

  useEffect(() => {
    onDataChange(image, pins);
  }, [image, pins]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDoubleClick = (e) => {
    const containerRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;

    const newPin = {
      x,
      y,
      number: pins.length + 1,
      data: {
        name: "",
        // description: "",
        // image: "",
        // associations: "",
        mnemonic: "",
        mnemonicSentence: "",
        // tags: "",
        // creationDate: new Date().toISOString().split("T")[0],
        // lastRevised: new Date().toISOString().split("T")[0],
        // personalNotes: ""
      }
    };

    const updatedPins = [...pins, newPin];
    setPins(updatedPins);
    setSelectedPinIndex(updatedPins.length - 1);
    setFormData(newPin.data);
    setShowModal(true);
  };

  const handlePinClick = (index) => {
    setSelectedPinIndex(index);
    setFormData(pins[index].data);
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSave = () => {
    const updatedPins = [...pins];
    updatedPins[selectedPinIndex].data = formData;
    setPins(updatedPins);
    setShowModal(false);
  };

  const handleDelete = (index) => {
    const updatedPins = pins.filter((_, i) => i !== index);
    setPins(updatedPins.map((pin, i) => ({ ...pin, number: i + 1 })));
  };

  return (
    <div className="container mt-4">
    
    

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Add a Loci Image</Form.Label>
        <Form.Control type="file" onChange={handleImageUpload} />
      </Form.Group>

      {image && (
        <div
          className="position-relative border"
          style={{ display: "inline-block" }}
          onDoubleClick={handleImageDoubleClick}
        >
          <img src={image} alt="upload" style={{ maxWidth: "100%" }} />

          {pins.map((pin, idx) => (
            <div
              key={idx}
              onClick={() => handlePinClick(idx)}
              style={{
                position: "absolute",
                top: pin.y,
                left: pin.x,
                transform: "translate(-50%, -100%)",
                cursor: "pointer",
                color: "red",
                fontSize: "16px",
                textAlign: "center"
              }}
            >
              <div>📍</div>
              <div style={{ fontWeight: "bold", fontSize: "12px", color: "black" }}>{pin.number}</div>
            </div>
          ))}
        </div>
      )}

      {pins.length > 0 && (
        <div className="mt-4">
          <h5>Captured Pin Details</h5>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                    <th>Peg Word</th>
                    <th>mnemonic</th>
                    <th>mnemonicSentence</th>
 
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pins.map((pin, index) => (
                <tr key={index}>
                  <td>{pin.number}</td>
                  <td>{pin.data?.name || ""}</td>
                  <td>{pegList[pin.number] || ""}</td>

                  <td>{pin.data?.mnemonic || ""}</td>
                  <td>{pin.data?.mnemonicSentence || ""}</td>
 {/* 
                  <td>{pin.data?.description || ""}</td>
                  <td>{pin.data?.tags || ""}</td>
                  <td>{pin.data?.creationDate || ""}</td>
                  <td>{pin.data?.lastRevised || ""}</td> */}
                  <td>
                    <Button variant="info" size="sm" className="me-2" onClick={() => handlePinClick(index)}>Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Pin {pins[selectedPinIndex]?.number}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {Object.keys(formData).map((field) => (
              <Form.Group className="mb-2" key={field}>
                <Form.Label>{field}</Form.Label>
                <Form.Control
                  name={field}
                  value={formData[field]}
                  onChange={handleFormChange}
                  as={field === "personalNotes" ? "textarea" : "input"}
                  rows={field === "personalNotes" ? 3 : undefined}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleFormSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ImageLabeler; 

// atest