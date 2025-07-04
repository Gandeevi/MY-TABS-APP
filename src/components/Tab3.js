import React, { useState, useEffect } from 'react';
import { Accordion, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function parseEssay(content, filename, indexOffset = 0, userInputs = {}) {
  let parts = content.split(/(~[^~]+~)/g);
  let quizBlocks = [];
  let inputCount = 0;

  const parsed = parts.map((part) => {
    if (part.startsWith('~') && part.endsWith('~')) {
      const answer = part.slice(1, -1);
      const id = `input-${indexOffset}-${inputCount++}`;
      quizBlocks.push({ id, answer });
      const userValue = userInputs[id] || '';
      return `<input type="text" id="${id}" value="${userValue}" class="form-control d-inline w-auto mx-1" style="display:inline-block" onblur="window.checkInput('${id}', '${answer}')"/>`;
    }
    return part;
  });

  return { html: parsed.join(''), quizBlocks };
}

export default function EssayQuizApp() {
  const [essays, setEssays] = useState([]);
  const [parsedEssays, setParsedEssays] = useState([]);
  const [scoreCard, setScoreCard] = useState({});

  useEffect(() => {
    window.checkInput = (id, answer) => {
      const input = document.getElementById(id);
      if (input) {
        const userInput = input.value.trim().toLowerCase();
        const correctAnswer = answer.trim().toLowerCase();
        input.style.borderColor = userInput === correctAnswer ? 'green' : 'red';
      }
    };
  }, []);

  const handleFileLoad = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target.result;
      const id = `essay-${essays.length}`;
      const { html, quizBlocks } = parseEssay(content, file.name, essays.length);
      const newEssay = { id, name: file.name, content, html, quizBlocks, inputs: {} };
      setEssays([...essays, newEssay]);
      setParsedEssays([...parsedEssays, newEssay]);
    };
    if (file) reader.readAsText(file);
  };

  const handleSubmitQuiz = (essayId) => {
    const essayIndex = parsedEssays.findIndex((e) => e.id === essayId);
    const essay = parsedEssays[essayIndex];
    let correct = 0;
    let total = essay.quizBlocks.length;
    const updatedInputs = {};

    essay.quizBlocks.forEach(({ id, answer }) => {
      const input = document.getElementById(id);
      if (input) {
        const userValue = input.value;
        updatedInputs[id] = userValue;
        if (userValue.trim().toLowerCase() === answer.trim().toLowerCase()) {
          correct++;
          input.style.borderColor = 'green';
        } else {
          input.style.borderColor = 'red';
        }
      }
    });

    const updatedEssay = {
      ...essay,
      inputs: updatedInputs,
      ...parseEssay(essay.content, essay.name, essayIndex, updatedInputs)
    };

    const updatedParsed = [...parsedEssays];
    updatedParsed[essayIndex] = updatedEssay;
    setParsedEssays(updatedParsed);
    setEssays(updatedParsed);
    setScoreCard({ ...scoreCard, [essayId]: { correct, total } });
  };

  const exportToJson = () => {
    const data = essays.map(({ name, content, inputs }) => ({ name, content, inputs }));
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'essays.json';
    a.click();
  };

  const importFromJson = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (ev) => {
      const data = JSON.parse(ev.target.result);
      const newEssays = [];
      const newParsedEssays = [];
      data.forEach((essay, i) => {
        const id = `essay-${essays.length + i}`;
        const { html, quizBlocks } = parseEssay(essay.content, essay.name, essays.length + i, essay.inputs || {});
        newEssays.push({ id, name: essay.name, content: essay.content, html, quizBlocks, inputs: essay.inputs || {} });
        newParsedEssays.push({ id, name: essay.name, content: essay.content, html, quizBlocks, inputs: essay.inputs || {} });
      });
      setEssays([...essays, ...newEssays]);
      setParsedEssays([...parsedEssays, ...newParsedEssays]);
    };
    if (file) reader.readAsText(file);
  };

  return (
    <div className="container mt-4">
      <h2>📘 Essay Quiz Practice</h2>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload Essay (with ~word~ blanks):</Form.Label>
        <Form.Control type="file" accept=".txt" onChange={handleFileLoad} />
      </Form.Group>

      <Form.Group controlId="jsonImport" className="mb-3">
        <Form.Label>Import Essays from JSON:</Form.Label>
        <Form.Control type="file" accept=".json" onChange={importFromJson} />
      </Form.Group>

      <Button className="mb-3" onClick={exportToJson}>Export Essays as JSON</Button>

      <Accordion>
        {parsedEssays.map((essay, index) => (
          <Accordion.Item key={essay.id} eventKey={index.toString()}>
            <Accordion.Header>{essay.name || `Essay ${index + 1}`}</Accordion.Header>
            <Accordion.Body>
              <div
                dangerouslySetInnerHTML={{ __html: essay.html }}
                className="mb-3"
              ></div>
              <Button onClick={() => handleSubmitQuiz(essay.id)}>Submit Quiz</Button>
              {scoreCard[essay.id] && (
                <div className="mt-2">
                  ✅ Score: {scoreCard[essay.id].correct} / {scoreCard[essay.id].total}
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}
