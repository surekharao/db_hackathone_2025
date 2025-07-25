import React, { useEffect, useRef } from 'react';
import './LoanRoulette.css';

interface LoanRouletteWheelProps {
  sections: Array<{
    number: number;
    color: string;
  }>;
  spinning: boolean;
  onSpinComplete: () => void;
}

export const LoanRouletteWheel: React.FC<LoanRouletteWheelProps> = ({
  sections,
  spinning,
  onSpinComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Colors based on rainbow spectrum
  const sectionColors = [
    '#FF0000', // Red
    '#FF7F00', // Orange
    '#FFFF00', // Yellow
    '#00FF00', // Green
    '#0000FF', // Blue
    '#4B0082', // Indigo
    '#9400D3', // Violet
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw wheel sections
    const sectionAngle = (2 * Math.PI) / 7;
    sections.forEach((section, index) => {
      const startAngle = index * sectionAngle;
      const endAngle = startAngle + sectionAngle;

      // Draw section
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = sectionColors[index];
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Add number
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sectionAngle / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold ${radius * 0.2}px Arial';
      ctx.fillText(section.number.toString(), radius * 0.7, 0);
      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.15, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw pointer
    ctx.beginPath();
    ctx.moveTo(centerX + radius + 10, centerY);
    ctx.lineTo(centerX + radius - 10, centerY - 15);
    ctx.lineTo(centerX + radius - 10, centerY + 15);
    ctx.closePath();
    ctx.fillStyle = '#000000';
    ctx.fill();

  }, [sections, spinning]);

  return (
    <div className="roulette-wheel-container">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className={`roulette-wheel ${spinning ? 'spinning' : ''}`}
      />
    </div>
  );
};
