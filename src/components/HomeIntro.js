// HomeIntro.js
import React from "react";
import { Card, Button } from "react-bootstrap";
import { Plus } from "lucide-react";

const HomeIntro = ({ onCreate }) => {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <h3 className="mb-3">🧠 Welcome to Your Memory Palace</h3>
        <p>
          A <strong>Memory Palace</strong> is a time-tested technique to organize and retain information by placing it inside visualized locations — like rooms, halls, or landmarks — and using vivid imagery to store memory hooks.
        </p>

        <h5 className="mt-4">🛠 How It Works:</h5>
        <ol>
          <li><strong>Create a Palace:</strong> Each palace represents a theme or memory system.</li>
          <li><strong>Add Rooms:</strong> Divide your palace into rooms to hold clusters of knowledge.</li>
          <li><strong>Upload Images:</strong> Each room can have an image (e.g., a scene, diagram, layout).</li>
          <li><strong>Drop Pins:</strong> Double-click on the image to add pins with detailed notes, mnemonics, tags, etc.</li>
          <li><strong>Review in Play Mode:</strong> Step through each room interactively to recall what you’ve encoded.</li>
        </ol>

        <div className="text-center mt-4">
          <Button onClick={onCreate} variant="primary" size="lg">
            <Plus className="me-2" size={18} />
            Start Creating Your First Palace
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default HomeIntro;
