import React, { useState } from "react";

const TOTAL_DAYS = 30;
const TOTAL_GOALS = 10;

export default function HabitPlanner() {
  const [goals, setGoals] = useState(Array(TOTAL_GOALS).fill(""));

  const handleChange = (i, val) => {
    const updated = [...goals];
    updated[i] = val;
    setGoals(updated);
  };

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      
      {/* LEFT - INPUT */}
      <div style={{ width: "250px" }}>
        <h4>GOALS</h4>
        {goals.map((g, i) => (
          <input
            key={i}
            value={g}
            placeholder={`Goal ${i + 1}`}
            onChange={(e) => handleChange(i, e.target.value)}
            style={{ display: "block", marginBottom: "8px", width: "100%" }}
          />
        ))}
      </div>

      {/* RIGHT - SVG */}
      <svg width="700" height="700">
        <RadialChart goals={goals} />
      </svg>

    </div>
  );
}

const RadialChart = ({ goals }) => {
  const center = 350;
  const innerRadius = 80;
  const ringWidth = 20;

  // GAP CONFIG
  const GAP1 = 90;
  const GAP2 = 180;
  const GAP_SIZE = 50;

  const totalAngle = 360 - GAP_SIZE * 2;
  const anglePerDay = totalAngle / TOTAL_DAYS;

  const polar = (r, angle) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad),
    };
  };

  const inGap = (angle) => {
    return (
      Math.abs(angle - GAP1) < GAP_SIZE / 2 ||
      Math.abs(angle - GAP2) < GAP_SIZE / 2
    );
  };

  const arcPath = (r1, r2, start, end) => {
    const p1 = polar(r2, start);
    const p2 = polar(r2, end);
    const p3 = polar(r1, end);
    const p4 = polar(r1, start);

    return `
      M ${p1.x} ${p1.y}
      A ${r2} ${r2} 0 0 1 ${p2.x} ${p2.y}
      L ${p3.x} ${p3.y}
      A ${r1} ${r1} 0 0 0 ${p4.x} ${p4.y}
      Z
    `;
  };

  return (
    <>
      {/* CELLS */}
      {Array.from({ length: TOTAL_GOALS }).map((_, ring) => {
        const r1 = innerRadius + ring * ringWidth;
        const r2 = r1 + ringWidth;

        let angle = 0;
        let day = 0;
        const paths = [];

        while (day < TOTAL_DAYS && angle < 360) {
          if (inGap(angle)) {
            angle += 1;
            continue;
          }

          const start = angle;
          const end = angle + anglePerDay;

          paths.push(
            <path
              key={`${ring}-${day}`}
              d={arcPath(r1, r2, start, end)}
              stroke="black"
              fill="none"
              strokeWidth="0.6"
            />
          );

          angle += anglePerDay;
          day++;
        }

        return paths;
      })}

      {/* DAY NUMBERS */}
      {Array.from({ length: TOTAL_DAYS }).map((_, i) => {
        let angle = 0;
        let count = 0;

        while (count <= i) {
          if (!inGap(angle)) {
            if (count === i) break;
            count++;
          }
          angle += 1;
        }

        const pos = polar(innerRadius + TOTAL_GOALS * ringWidth + 15, angle);

        return (
          <text key={i} x={pos.x} y={pos.y} fontSize="10" textAnchor="middle">
            {i + 1}
          </text>
        );
      })}

      {/* GOALS - GAP 1 */}
      {goals.slice(0, 5).map((g, i) => {
        const r = innerRadius + i * ringWidth + 10;
        const start = polar(r, 70);
        const end = polar(r, 110);

        return (
          <g key={i}>
            <path
              d={`M ${start.x} ${start.y} A ${r} ${r} 0 0 0 ${end.x} ${end.y}`}
              stroke="black"
              fill="none"
            />
            <text x={start.x - 20} y={start.y} fontSize="10">
              {i + 1}. {g}
            </text>
          </g>
        );
      })}

      {/* GOALS - GAP 2 */}
      {goals.slice(5, 10).map((g, i) => {
        const r = innerRadius + i * ringWidth + 10;
        const start = polar(r, 160);
        const end = polar(r, 200);

        return (
          <g key={i}>
            <path
              d={`M ${start.x} ${start.y} A ${r} ${r} 0 0 0 ${end.x} ${end.y}`}
              stroke="black"
              fill="none"
            />
            <text x={start.x - 30} y={start.y} fontSize="10">
              {i + 6}. {g}
            </text>
          </g>
        );
      })}

      {/* CENTER */}
      <circle
        cx={center}
        cy={center}
        r={innerRadius - 10}
        stroke="black"
        fill="none"
      />
    </>
  );
};
