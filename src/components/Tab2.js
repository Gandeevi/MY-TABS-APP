import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Nav,
  Tab,
  Row,
  Col,
  Card,
  Table,
} from "react-bootstrap";

const Grid = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("gridData");
    if (saved) return JSON.parse(saved);
    const initial = {};
    for (let day = 1; day <= 365; day++) {
      initial[day] = {};
      for (let hour = 0; hour < 24; hour++) {
        initial[day][hour] = "";
      }
    }
    return initial;
  });

  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState({ day: null, hour: null });
  const [text, setText] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(null);

  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const [currentDay, setCurrentDay] = useState(dayOfYear);

  const blockMap = {
    morning: [5, 6, 7, 8, 9, 10, 11],
    afternoon: [12, 13, 14, 15, 16],
    evening: [17, 18, 19, 20],
    night: [21, 22, 23, 0, 1, 2, 3, 4],
  };

  const handleButtonClick = (day, hour) => {
    setSelected({ day, hour });
    setText(data[day][hour]);
    setShow(true);
  };

  const handleSave = () => {
    const newData = { ...data };
    newData[selected.day][selected.hour] = text;
    setData(newData);
    setShow(false);
  };

  useEffect(() => {
    localStorage.setItem("gridData", JSON.stringify(data));
  }, [data]);

  const renderHourButtons = (day) => (
    <>
      {Object.entries(blockMap).map(([block, hours]) => (
        <Card className="mb-2" key={block}>
          <Card.Header className="text-capitalize bg-light fw-bold">{block}</Card.Header>
          <Card.Body className="d-flex flex-wrap gap-2">
            {hours.map((hour) => (
              <Button
                key={hour}
                variant={data[day][hour] ? "success" : "outline-secondary"}
                size="sm"
                onClick={() => handleButtonClick(day, hour)}
              >
                {hour}:00 {data[day][hour] ? "✔" : "+"}
              </Button>
            ))}
          </Card.Body>
        </Card>
      ))}
    </>
  );

  const renderVerboseView = () => {
    const entries = [];
    for (let day = 1; day <= 365; day++) {
      const date = new Date(today.getFullYear(), 0);
      date.setDate(day);
      const dayData = data[day];
      if (!dayData) continue;
      const row = {
        date: date.toDateString(),
        morning: blockMap.morning.map((h) => dayData[h]).filter(Boolean).join(", "),
        afternoon: blockMap.afternoon.map((h) => dayData[h]).filter(Boolean).join(", "),
        evening: blockMap.evening.map((h) => dayData[h]).filter(Boolean).join(", "),
        night: blockMap.night.map((h) => dayData[h]).filter(Boolean).join(", "),
      };
      if (row.morning || row.afternoon || row.evening || row.night) {
        entries.push(row);
      }
    }
    return (
      <div className="p-3">
        <h5>Verbose Data View</h5>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Morning</th>
              <th>Afternoon</th>
              <th>Evening</th>
              <th>Night</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => (
              <tr key={i}>
                <td>{entry.date}</td>
                <td>{entry.morning}</td>
                <td>{entry.afternoon}</td>
                <td>{entry.evening}</td>
                <td>{entry.night}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };

  const renderDayView = () => (
    <div className="p-3">
      <h5>Day {currentDay}</h5>
      {renderHourButtons(currentDay)}
    </div>
  );

  const renderMonthInline = (monthIndex) => {
    const daysInMonth = new Date(today.getFullYear(), monthIndex + 1, 0).getDate();
    let startDay = 1;
    for (let m = 0; m < monthIndex; m++) {
      startDay += new Date(today.getFullYear(), m + 1, 0).getDate();
    }
    return (
      <div className="p-3">
        <h5>{new Date(0, monthIndex).toLocaleString("default", { month: "long" })}</h5>
        {Array.from({ length: daysInMonth }, (_, i) => startDay + i).map((day) => (
          <div key={day} className="mb-4">
            <h6>Day {day}</h6>
            {renderHourButtons(day)}
          </div>
        ))}
      </div>
    );
  };

  const renderMonthView = () => {
    const currentMonth = today.getMonth();
    const daysInMonth = new Date(today.getFullYear(), currentMonth + 1, 0).getDate();
    const startDay = dayOfYear - today.getDate() + 1;
    return (
      <div className="p-3">
        <h5>Month: {today.toLocaleString("default", { month: "long" })}</h5>
        <Row>
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
            <Col xs={6} md={4} lg={3} key={d} className="mb-3">
              <Card>
                <Card.Header className="fw-bold">Day {d}</Card.Header>
                <Card.Body className="d-flex flex-wrap gap-1">
                  {Object.values(blockMap).flat().slice(0, 4).map((hour) => (
                    <Button
                      key={hour}
                      size="sm"
                      variant={data[startDay + d - 1][hour] ? "success" : "outline-secondary"}
                      onClick={() => handleButtonClick(startDay + d - 1, hour)}
                    >
                      {hour}
                    </Button>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  const renderYearView = () => {
    if (selectedMonth !== null) {
      return renderMonthInline(selectedMonth);
    }
    return (
      <div className="p-3">
        <h5>Year Overview</h5>
        <Row>
          {Array.from({ length: 12 }, (_, m) => (
            <Col xs={6} md={4} lg={3} key={m} className="mb-3">
              <Card>
                <Card.Header className="fw-bold">{new Date(0, m).toLocaleString("default", { month: "long" })}</Card.Header>
                <Card.Body>
                  <Button
                    size="sm"
                    onClick={() => setSelectedMonth(m)}
                    variant="outline-primary"
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <Tab.Container defaultActiveKey="day">
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="day">Day View</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="month">Month View</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="year">Year View</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="verbose">Verbose View</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="day">{renderDayView()}</Tab.Pane>
          <Tab.Pane eventKey="month">{renderMonthView()}</Tab.Pane>
          <Tab.Pane eventKey="year">{renderYearView()}</Tab.Pane>
          <Tab.Pane eventKey="verbose">{renderVerboseView()}</Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Day {selected.day}, Hour {selected.hour}:00
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Grid;