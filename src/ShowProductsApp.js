import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Spinner,
  Alert
} from "react-bootstrap";

const API_KEY = "AIzaSyDJPyE8femj2zi2pqASFuK8-4XDyza0nME";

const folderMap = {
  "3x5": "1s0LSgN2Ll_LI3vqEH86pDZ4nYwmKYbe9",
  "4x6": "1-1MQ7vGxUETV7VuNq5i8rDI0k_5x_kCZ",
  "5x6": "1-2F_3bJ32UKLJJPmfNGz1paQR7z_lgov"
};

function ShowProductsFromDrive() {
  const [selectedSize, setSelectedSize] = useState("3x5");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const folderId = folderMap[selectedSize];
    const fetchImages = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType+contains+'image/'&key=${API_KEY}&fields=files(id,name,mimeType)`
        );
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error.message);
        }

        const imageLinks = data.files.map((file) => ({
          id: file.id,
          name: file.name,
          url: `https://drive.google.com/uc?export=view&id=${file.id}`
        }));

        setImages(imageLinks);
      } catch (err) {
        setError("Failed to load images. " + err.message);
        setImages([]);
      }
      setLoading(false);
    };

    fetchImages();
  }, [selectedSize]);

  return (
    <Container className="mt-4">
      <h4 className="mb-4 text-center">Drive Product Gallery</h4>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Select Size
        </Form.Label>
        <Col sm={4}>
          <Form.Select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="3x5">3 × 5</option>
            <option value="4x6">4 × 6</option>
            <option value="5x6">5 × 6</option>
          </Form.Select>
        </Col>
      </Form.Group>

      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" role="status" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {images.map((img) => (
          <Col key={img.id} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={img.url} />
              <Card.Body>
                <Card.Text className="small text-truncate">{img.name}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ShowProductsFromDrive;
