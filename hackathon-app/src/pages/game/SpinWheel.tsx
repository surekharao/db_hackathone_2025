import React, { useState } from "react";
import "./SpinWheel.css";

const segments = [
  "Prize 1",
  "Prize 2",
  "Prize 3",
  "Prize 4",
  "Prize 5",
  "Prize 6",
];

const wheelSize = 400;
const center = wheelSize / 2;
const radius = center - 10;

function getCoordinatesForAngle(angle: number, radius: number) {
  const rad = (angle - 90) * (Math.PI / 180.0);
  return {
    x: center + radius * Math.cos(rad),
    y: center + radius * Math.sin(rad),
  };
}

function createSegmentPath(
  startAngle: number,
  endAngle: number,
  radius: number,
) {
  const start = getCoordinatesForAngle(startAngle, radius);
  const end = getCoordinatesForAngle(endAngle, radius);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    `M ${center} ${center}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

const SpinWheel: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);

  const segmentAngle = 360 / segments.length;

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const randomTurns = 5 + Math.random() * 5;
    const totalRotation = rotation + randomTurns * 360;

    const normalized = totalRotation % 360;
    const winningSegment =
      (segments.length - Math.floor(normalized / segmentAngle)) %
      segments.length;

    setWinnerIndex(null);
    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWinnerIndex(winningSegment);
      alert(`🎉 You won: ${segments[winningSegment]}`);
    }, 4000);
  };

  return (
    <div className="wheel-container">
      <div className="svg-wrapper">
        <svg
          className={`wheel-svg ${isSpinning ? "spinning" : ""}`}
          width={wheelSize}
          height={wheelSize}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {segments.map((label, i) => {
            const startAngle = i * segmentAngle;
            const endAngle = (i + 1) * segmentAngle;
            const path = createSegmentPath(startAngle, endAngle, radius);
            const midAngle = startAngle + segmentAngle / 2;
            const textPos = getCoordinatesForAngle(midAngle, radius * 0.75);

            return (
              <g key={i}>
                <path
                  d={path}
                  fill={i % 2 === 0 ? "orange" : "tomato"}
                  stroke="#fff"
                  strokeWidth={3}
                  className={winnerIndex === i ? "highlight" : ""}
                />
                <text
                  x={textPos.x}
                  y={textPos.y}
                  fill="#222"
                  fontSize="18"
                  fontWeight="bold"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  transform={`rotate(${midAngle},${textPos.x},${textPos.y})`}
                  style={{ pointerEvents: "none" }}
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="pointer">▼</div>
      </div>
      <button onClick={spin} disabled={isSpinning}>
        {isSpinning ? "Spinning..." : "SPIN"}
      </button>
    </div>
  );
};

export default SpinWheel;
