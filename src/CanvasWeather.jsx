import { useRef, useEffect } from "react";

export default function CanvasWeather({ weatherType }) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (weatherType === "Clear") {
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(100, 75, 40, 0, Math.PI * 2);
      ctx.fill();
    } else if (weatherType === "Clouds") {
      ctx.fillStyle = "gray";
      ctx.fillRect(50, 50, 100, 50);
    } else {
      ctx.fillStyle = "blue";
      ctx.fillRect(90, 40, 20, 60);
    }
  }, [weatherType]);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={150}
      className="bg-white mt-4 rounded"
    />
  );
}