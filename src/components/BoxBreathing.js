import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

const phases = [
  { name: 'Inhale', label: 'Breath In 🫁' },
  { name: 'Hold1', label: 'Hold ✋' },
  { name: 'Exhale', label: 'Breath Out 🌬️' },
  { name: 'Hold2', label: 'Hold ✋' }
];

function BoxBreathing() {

  const [time, setTime] = useState(4);
  const [cycles, setCycles] = useState(5);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(time);
  const [running, setRunning] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(0);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setSecondsLeft(prev => {

        if (prev === 1) {

          // move to next phase
          setCurrentPhase(p => {
            const next = (p + 1) % 4;

            if (next === 0) {
              setCompletedCycles(c => c + 1);
            }

            return next;
          });

          return time;
        }

        return prev - 1;
      });

    }, 1000);

    return () => clearInterval(timer);

  }, [running, time]);

  useEffect(() => {
    if (completedCycles === cycles && running) {
      setRunning(false);
      alert("Session Completed ✅");
    }
  }, [completedCycles, cycles, running]);

  const startSession = () => {
    setCompletedCycles(0);
    setCurrentPhase(0);
    setSecondsLeft(time);
    setRunning(true);
  };

  const resetSession = () => {
    setRunning(false);
    setSecondsLeft(time);
    setCompletedCycles(0);
    setCurrentPhase(0);
  };

  return (

    <Card className="p-4 text-center">

      <h3>🧘 Box Breathing Trainer</h3>

      <Form className="mt-3">

        <Form.Group>
          <Form.Label>Seconds Per Phase</Form.Label>
          <Form.Control
            type="number"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
          />
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>Number Of Cycles</Form.Label>
          <Form.Control
            type="number"
            value={cycles}
            onChange={(e) => setCycles(Number(e.target.value))}
          />
        </Form.Group>

      </Form>

      <h2 className="mt-4">
        {phases[currentPhase].label}
      </h2>

      <h1>{secondsLeft}</h1>

      <p>
        Cycle: {completedCycles} / {cycles}
      </p>

      <div className="mt-3">

        <Button
          variant="success"
          className="me-2"
          onClick={startSession}
          disabled={running}
        >
          Start
        </Button>

        <Button
          variant="warning"
          className="me-2"
          onClick={() => setRunning(!running)}
        >
          {running ? 'Pause' : 'Resume'}
        </Button>

        <Button
          variant="danger"
          onClick={resetSession}
        >
          Reset
        </Button>

      </div>

    </Card>
  );
}

export default BoxBreathing;
