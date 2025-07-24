import React, { useEffect, useRef, useState } from "react";
import { RouletteTerm } from "./types";
import "./SpinWheel.css";

const colors = ["#6C5CE7", "#A3A1FF"];

interface SpinWheelProps {
  isSpinning: boolean;
  onSpinEnd: (finalIndex: number) => void;
  segments: RouletteTerm[];
  selectedTerm: RouletteTerm | null;
}

const SpinWheel = ({
  isSpinning,
  onSpinEnd,
  segments,
  selectedTerm,
}: SpinWheelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);
  const [rotation, setRotation] = useState(0);
  useEffect(() => {
    const resizeHandler = () => {
      setSize(containerRef.current?.clientWidth ?? 0);
    };
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const center = size / 2;
  const radius = center - 10;
  const segmentAngle = 360 / segments.length;

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

  useEffect(() => {
    if (isSpinning) {
      const randomTurns = 5 + Math.random() * 5;
      const totalRotation = rotation + randomTurns * 360;

      const normalized = totalRotation % 360;
      const winningSegment =
        (segments.length - Math.floor(normalized / segmentAngle)) %
        segments.length;

      setRotation(totalRotation);

      setTimeout(() => {
        onSpinEnd(winningSegment - 1);
      }, 4000);
    }
  }, [isSpinning]);

  return (
    <div ref={containerRef} className="roulette-container">
      <div className="svg-wrapper">
        <svg
          className={`wheel-svg ${isSpinning ? "spinning" : ""}`}
          width={size}
          height={size}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {segments.map((segment, i) => {
            const startAngle = i * segmentAngle;
            const endAngle = (i + 1) * segmentAngle;
            const path = createSegmentPath(startAngle, endAngle, radius);
            const midAngle = startAngle + segmentAngle / 2;
            const fontSize = size === 500 ? 14 : 8;
            const textPos = getCoordinatesForAngle(midAngle, radius * 0.65);

            const highlighted = selectedTerm?.id === segment.id;
            return (
              <g key={i}>
                <path
                  d={path}
                  fill={highlighted ? "#00B894" : colors[i % 2]}
                  stroke="#fff"
                  strokeWidth={3}
                  className={highlighted ? "highlight" : ""}
                />
                <text
                  x={textPos.x}
                  y={textPos.y}
                  fill="#222"
                  fontSize={fontSize}
                  fontWeight="bold"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  transform={`rotate(${midAngle + 90},${textPos.x},${textPos.y})`}
                  style={{ pointerEvents: "none" }}
                >
                  {segment.term}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="pointer">▼</div>
      </div>
    </div>
  );
};

export default SpinWheel;
