import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const TOTAL_DAYS = 30;

export default function HabitPlanner() {
  const [goalCount, setGoalCount] = useState(10);
  const [goals, setGoals] = useState(Array(10).fill(""));
  const [gapStart, setGapStart] = useState(110);
  const [gapEnd, setGapEnd] = useState(200);
  const [isDragging, setIsDragging] = useState(false);

  const [tracking, setTracking] = useState(
    Array.from({ length: 10 }, () => Array(TOTAL_DAYS).fill(false))
  );

  // LOAD
  useEffect(() => {
    const saved = localStorage.getItem("habit-tracker");
    if (saved) {
      const data = JSON.parse(saved);
      setGoals(data.goals || []);
      setTracking(data.tracking || []);
      setGoalCount(data.goals?.length || 10);
    }
  }, []);

  // SAVE
  useEffect(() => {
    localStorage.setItem(
      "habit-tracker",
      JSON.stringify({ goals, tracking })
    );
  }, [goals, tracking]);

  const updateGoalCount = (count) => {
    setGoalCount(count);

    setGoals((prev) => {
      const arr = [...prev];
      while (arr.length < count) arr.push("");
      return arr.slice(0, count);
    });

    setTracking((prev) => {
      const arr = [...prev];
      while (arr.length < count)
        arr.push(Array(TOTAL_DAYS).fill(false));
      return arr.slice(0, count);
    });
  };

  const toggleCell = (g, d) => {
    setTracking((prev) => {
      const copy = prev.map((row) => [...row]);
      copy[g][d] = !copy[g][d];
      return copy;
    });
  };

  const exportPDF = async () => {
    const element = document.getElementById("planner");
    const canvas = await html2canvas(element);
    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF("portrait", "mm", "a4");
    pdf.addImage(img, "PNG", 10, 10, 190, 190);
    pdf.save("habit-tracker.pdf");
  };

  return (
    <div id="planner" style={{ display: "flex", padding: "20px", gap: "40px" }}>
      
      {/* LEFT PANEL */}
      <div style={{ width: "260px" }}>
        <h3>GOALS</h3>

        <label>No. of Goals</label>
        <input
          type="number"
          value={goalCount}
          min={1}
          max={20}
          onChange={(e) => updateGoalCount(Number(e.target.value))}
          style={{ width: "100%", marginBottom: "15px" }}
        />

        {goals.map((g, i) => (
          <div key={i}>
            <input
              value={g}
              placeholder={`Goal ${i + 1}`}
              onChange={(e) => {
                const updated = [...goals];
                updated[i] = e.target.value;
                setGoals(updated);
              }}
              style={{
                width: "100%",
                border: "none",
                borderBottom: "1px solid black",
                marginBottom: "6px",
                outline: "none"
              }}
            />

            {/* PROGRESS */}
            <div style={{ fontSize: "11px", marginBottom: "8px" }}>
              {Math.round(
                ((tracking[i]?.filter(Boolean).length || 0) / 30) * 100
              )}%
            </div>
          </div>
        ))}

        <hr />

        <h4>Slice</h4>

        <input
          type="number"
          value={gapStart}
          onChange={(e) => setGapStart(Number(e.target.value))}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="number"
          value={gapEnd}
          onChange={(e) => setGapEnd(Number(e.target.value))}
          style={{ width: "100%" }}
        />

        <br /><br />

        <button onClick={exportPDF}>Export PDF</button>
      </div>

      {/* SVG */}
      <svg
        width={700}
        height={700}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
      >
        <g transform="translate(350,350)">
          <RadialChart
            goals={goals.slice(0, goalCount)}
            tracking={tracking}
            toggleCell={toggleCell}
            gapStart={gapStart}
            gapEnd={gapEnd}
            isDragging={isDragging}
          />
        </g>
      </svg>
    </div>
  );
}

const RadialChart = ({
  goals,
  tracking,
  toggleCell,
  gapStart,
  gapEnd,
  isDragging
}) => {
  const goalCount = goals.length;
  const innerRadius = 80;
  const ringWidth = 20;

  const normalize = (a) => ((a % 360) + 360) % 360;
  gapStart = normalize(gapStart);
  gapEnd = normalize(gapEnd);

  const gapSize = (gapEnd - gapStart + 360) % 360;
  const totalAngle = 360 - gapSize;
  const anglePerDay = totalAngle / TOTAL_DAYS;

  const isInGap = (a) =>
    gapStart < gapEnd
      ? a >= gapStart && a <= gapEnd
      : a >= gapStart || a <= gapEnd;

  let currentAngle = 0;
  const arcs = [];

  for (let i = 0; i < TOTAL_DAYS; i++) {
    while (isInGap(currentAngle)) currentAngle += 1;

    const start = currentAngle;
    const end = start + anglePerDay;

    arcs.push({ start, end });
    currentAngle = end;
  }

  const arcGen = d3.arc();

  const polar = (r, angle) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: r * Math.cos(rad),
      y: r * Math.sin(rad)
    };
  };

  return (
    <>
      {/* CELLS */}
      {Array.from({ length: goalCount }).map((_, ring) =>
        arcs.map((a, day) => (
          <path
            key={`${ring}-${day}`}
            d={arcGen({
              innerRadius: innerRadius + ring * ringWidth,
              outerRadius: innerRadius + (ring + 1) * ringWidth,
              startAngle: (a.start * Math.PI) / 180,
              endAngle: (a.end * Math.PI) / 180
            })}
            fill={tracking[ring]?.[day] ? "#4CAF50" : "none"}
            stroke="black"
            strokeWidth={0.8}
            style={{ cursor: "pointer" }}
            onMouseDown={() => toggleCell(ring, day)}
            onMouseEnter={() => {
              if (isDragging) toggleCell(ring, day);
            }}
          />
        ))
      )}

      {/* DAYS */}
      {arcs.map((a, i) => {
        const mid = (a.start + a.end) / 2;
        const pos = polar(innerRadius + goalCount * ringWidth + 15, mid);

        return (
          <text key={i} x={pos.x} y={pos.y} fontSize="10" textAnchor="middle">
            {i + 1}
          </text>
        );
      })}

      {/* CURVED GOALS */}
      {goals.map((g, i) => {
        const r = innerRadius + i * ringWidth + ringWidth * 0.8;

        const start = polar(r, gapStart + 5);
        const end = polar(r, gapEnd - 5);

        const id = `goal-${i}`;

        return (
          <g key={i}>
            <path
              id={id}
              d={`M ${start.x} ${start.y}
                  A ${r} ${r} 0 0 1 ${end.x} ${end.y}`}
              fill="none"
            />

            <text fontSize="11">
              <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
                {i + 1}. {g}
              </textPath>
            </text>
          </g>
        );
      })}

      <circle r={innerRadius - 10} fill="none" stroke="black" />
    </>
  );
};
